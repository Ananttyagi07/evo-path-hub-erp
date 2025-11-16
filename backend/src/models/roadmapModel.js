const { dbRun, dbGet, dbAll } = require('../config/database');

class RoadmapModel {
  static async getAll() {
    return await dbAll(`
      SELECT r.*, d.name as domain_name
      FROM roadmaps r
      JOIN domains d ON r.domain_id = d.id
      ORDER BY r.created_at DESC
    `);
  }

  static async getById(id) {
    return await dbGet(`
      SELECT r.*, d.name as domain_name
      FROM roadmaps r
      JOIN domains d ON r.domain_id = d.id
      WHERE r.id = ?
    `, [id]);
  }

  static async getByDomain(domainId) {
    return await dbAll(`
      SELECT r.*, d.name as domain_name
      FROM roadmaps r
      JOIN domains d ON r.domain_id = d.id
      WHERE r.domain_id = ?
      ORDER BY r.created_at DESC
    `, [domainId]);
  }

  static async create(roadmapData) {
    const result = await dbRun(`
      INSERT INTO roadmaps (
        domain_id, title, description, type, difficulty, timeline_weeks,
        created_by, is_ai_generated, roadmap_data, uploaded_by_name
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      roadmapData.domain_id,
      roadmapData.title,
      roadmapData.description,
      roadmapData.type,
      roadmapData.difficulty,
      roadmapData.timeline_weeks,
      roadmapData.created_by,
      roadmapData.is_ai_generated || 0,
      JSON.stringify(roadmapData.roadmap_data || {}),
      roadmapData.uploaded_by_name
    ]);

    return await this.getById(result.lastID);
  }

  static async update(id, roadmapData) {
    const fields = [];
    const values = [];

    Object.keys(roadmapData).forEach(key => {
      if (key !== 'id' && roadmapData[key] !== undefined) {
        if (key === 'roadmap_data') {
          fields.push(`${key} = ?`);
          values.push(JSON.stringify(roadmapData[key]));
        } else {
          fields.push(`${key} = ?`);
          values.push(roadmapData[key]);
        }
      }
    });

    fields.push('updated_at = CURRENT_TIMESTAMP');
    values.push(id);

    await dbRun(`UPDATE roadmaps SET ${fields.join(', ')} WHERE id = ?`, values);
    return await this.getById(id);
  }

  static async delete(id) {
    return await dbRun('DELETE FROM roadmaps WHERE id = ?', [id]);
  }

  static async getTeacherRoadmaps(domainId) {
    return await dbAll(`
      SELECT r.*, d.name as domain_name
      FROM roadmaps r
      JOIN domains d ON r.domain_id = d.id
      WHERE r.domain_id = ? AND r.is_ai_generated = 0
      ORDER BY r.created_at DESC
    `, [domainId]);
  }

  static async getAIRoadmaps(domainId, difficulty) {
    return await dbAll(`
      SELECT r.*, d.name as domain_name
      FROM roadmaps r
      JOIN domains d ON r.domain_id = d.id
      WHERE r.domain_id = ? AND r.is_ai_generated = 1 AND r.difficulty = ?
      ORDER BY r.created_at DESC
      LIMIT 1
    `, [domainId, difficulty]);
  }
}

module.exports = RoadmapModel;
