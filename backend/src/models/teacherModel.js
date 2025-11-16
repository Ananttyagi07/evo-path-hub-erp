const { dbRun, dbGet, dbAll } = require('../config/database');

class TeacherModel {
  static async getAll() {
    return await dbAll('SELECT * FROM teachers ORDER BY full_name ASC');
  }

  static async getById(id) {
    return await dbGet('SELECT * FROM teachers WHERE id = ?', [id]);
  }

  static async getByEmail(email) {
    return await dbGet('SELECT * FROM teachers WHERE email = ?', [email]);
  }

  static async create(teacherData) {
    const result = await dbRun(`
      INSERT INTO teachers (
        teacher_id, email, password, full_name, phone, department,
        subject, qualification, date_of_joining, address, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      teacherData.teacher_id, teacherData.email, teacherData.password,
      teacherData.full_name, teacherData.phone, teacherData.department,
      teacherData.subject, teacherData.qualification, teacherData.date_of_joining,
      teacherData.address, teacherData.status || 'active'
    ]);

    return await this.getById(result.lastID);
  }

  static async update(id, teacherData) {
    const fields = [];
    const values = [];

    Object.keys(teacherData).forEach(key => {
      if (key !== 'id' && teacherData[key] !== undefined) {
        fields.push(`${key} = ?`);
        values.push(teacherData[key]);
      }
    });

    fields.push('updated_at = CURRENT_TIMESTAMP');
    values.push(id);

    await dbRun(`UPDATE teachers SET ${fields.join(', ')} WHERE id = ?`, values);
    return await this.getById(id);
  }

  static async delete(id) {
    return await dbRun('DELETE FROM teachers WHERE id = ?', [id]);
  }

  static async search(searchTerm) {
    const term = `%${searchTerm}%`;
    return await dbAll(`
      SELECT * FROM teachers
      WHERE full_name LIKE ? OR teacher_id LIKE ? OR email LIKE ? OR department LIKE ?
      ORDER BY full_name ASC
    `, [term, term, term, term]);
  }
}

module.exports = TeacherModel;
