const { dbRun, dbGet, dbAll } = require('../config/database');

class ResourceModel {
  static async getAll() {
    return await dbAll(`
      SELECT r.*, d.name as domain_name
      FROM resources r
      JOIN domains d ON r.domain_id = d.id
      ORDER BY r.created_at DESC
    `);
  }

  static async getById(id) {
    return await dbGet(`
      SELECT r.*, d.name as domain_name
      FROM resources r
      JOIN domains d ON r.domain_id = d.id
      WHERE r.id = ?
    `, [id]);
  }

  static async getByDomain(domainId) {
    return await dbAll(`
      SELECT r.*, d.name as domain_name
      FROM resources r
      JOIN domains d ON r.domain_id = d.id
      WHERE r.domain_id = ?
      ORDER BY r.type, r.created_at DESC
    `, [domainId]);
  }

  static async getByType(domainId, type) {
    return await dbAll(`
      SELECT r.*, d.name as domain_name
      FROM resources r
      JOIN domains d ON r.domain_id = d.id
      WHERE r.domain_id = ? AND r.type = ?
      ORDER BY r.created_at DESC
    `, [domainId, type]);
  }

  static async create(resourceData) {
    const result = await dbRun(`
      INSERT INTO resources (
        domain_id, title, description, type, file_path, url,
        uploaded_by, uploaded_by_name
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      resourceData.domain_id,
      resourceData.title,
      resourceData.description,
      resourceData.type,
      resourceData.file_path,
      resourceData.url,
      resourceData.uploaded_by,
      resourceData.uploaded_by_name
    ]);

    return await this.getById(result.lastID);
  }

  static async update(id, resourceData) {
    const fields = [];
    const values = [];

    Object.keys(resourceData).forEach(key => {
      if (key !== 'id' && resourceData[key] !== undefined) {
        fields.push(`${key} = ?`);
        values.push(resourceData[key]);
      }
    });

    fields.push('updated_at = CURRENT_TIMESTAMP');
    values.push(id);

    await dbRun(`UPDATE resources SET ${fields.join(', ')} WHERE id = ?`, values);
    return await this.getById(id);
  }

  static async delete(id) {
    return await dbRun('DELETE FROM resources WHERE id = ?', [id]);
  }

  static async incrementViews(id) {
    await dbRun('UPDATE resources SET views = views + 1 WHERE id = ?', [id]);
    return await this.getById(id);
  }

  static async incrementDownloads(id) {
    await dbRun('UPDATE resources SET downloads = downloads + 1 WHERE id = ?', [id]);
    return await this.getById(id);
  }
}

module.exports = ResourceModel;
