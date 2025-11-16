const { dbRun, dbGet, dbAll } = require('../config/database');

class DomainModel {
  static async getAll() {
    return await dbAll('SELECT * FROM domains ORDER BY name ASC');
  }

  static async getById(id) {
    return await dbGet('SELECT * FROM domains WHERE id = ?', [id]);
  }

  static async create(domainData) {
    const result = await dbRun(`
      INSERT INTO domains (name, description, icon, category, difficulty_level, created_by)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [
      domainData.name,
      domainData.description,
      domainData.icon,
      domainData.category,
      domainData.difficulty_level,
      domainData.created_by
    ]);

    return await this.getById(result.lastID);
  }

  static async update(id, domainData) {
    const fields = [];
    const values = [];

    Object.keys(domainData).forEach(key => {
      if (key !== 'id' && domainData[key] !== undefined) {
        fields.push(`${key} = ?`);
        values.push(domainData[key]);
      }
    });

    fields.push('updated_at = CURRENT_TIMESTAMP');
    values.push(id);

    await dbRun(`UPDATE domains SET ${fields.join(', ')} WHERE id = ?`, values);
    return await this.getById(id);
  }

  static async delete(id) {
    return await dbRun('DELETE FROM domains WHERE id = ?', [id]);
  }

  static async getByCategory(category) {
    return await dbAll('SELECT * FROM domains WHERE category = ? ORDER BY name ASC', [category]);
  }
}

module.exports = DomainModel;
