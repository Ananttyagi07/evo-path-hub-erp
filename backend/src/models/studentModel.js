const { dbRun, dbGet, dbAll } = require('../config/database');

class StudentModel {
  static async getAll() {
    return await dbAll('SELECT * FROM students ORDER BY rank ASC');
  }

  static async getById(id) {
    return await dbGet('SELECT * FROM students WHERE id = ?', [id]);
  }

  static async getByEmail(email) {
    return await dbGet('SELECT * FROM students WHERE email = ?', [email]);
  }

  static async create(studentData) {
    const result = await dbRun(`
      INSERT INTO students (
        student_id, email, password, full_name, phone, date_of_birth, gender,
        blood_group, class, section, roll_number, admission_date, address,
        parent_name, parent_phone, parent_email, status, attendance_percentage,
        gpa, total_marks
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      studentData.student_id, studentData.email, studentData.password,
      studentData.full_name, studentData.phone, studentData.date_of_birth,
      studentData.gender, studentData.blood_group, studentData.class,
      studentData.section, studentData.roll_number, studentData.admission_date,
      studentData.address, studentData.parent_name, studentData.parent_phone,
      studentData.parent_email, studentData.status || 'active',
      studentData.attendance_percentage || 0, studentData.gpa || 0,
      studentData.total_marks || 0
    ]);

    return await this.getById(result.lastID);
  }

  static async update(id, studentData) {
    const fields = [];
    const values = [];

    Object.keys(studentData).forEach(key => {
      if (key !== 'id' && studentData[key] !== undefined) {
        fields.push(`${key} = ?`);
        values.push(studentData[key]);
      }
    });

    fields.push('updated_at = CURRENT_TIMESTAMP');
    values.push(id);

    await dbRun(`UPDATE students SET ${fields.join(', ')} WHERE id = ?`, values);
    return await this.getById(id);
  }

  static async delete(id) {
    return await dbRun('DELETE FROM students WHERE id = ?', [id]);
  }

  static async getLeaderboard(limit = 10) {
    return await dbAll('SELECT * FROM students ORDER BY total_marks DESC, gpa DESC LIMIT ?', [limit]);
  }

  static async updateRanks() {
    const students = await dbAll('SELECT id FROM students ORDER BY total_marks DESC, gpa DESC');
    for (let i = 0; i < students.length; i++) {
      await dbRun('UPDATE students SET rank = ? WHERE id = ?', [i + 1, students[i].id]);
    }
  }

  static async getAttendance(studentId, startDate = null, endDate = null) {
    let query = 'SELECT * FROM attendance WHERE student_id = ?';
    const params = [studentId];

    if (startDate && endDate) {
      query += ' AND date BETWEEN ? AND ?';
      params.push(startDate, endDate);
    }

    query += ' ORDER BY date DESC';
    return await dbAll(query, params);
  }

  static async getMarks(studentId) {
    return await dbAll('SELECT * FROM marks WHERE student_id = ? ORDER BY exam_date DESC', [studentId]);
  }

  static async search(searchTerm) {
    const term = `%${searchTerm}%`;
    return await dbAll(`
      SELECT * FROM students
      WHERE full_name LIKE ? OR student_id LIKE ? OR email LIKE ?
      ORDER BY rank ASC
    `, [term, term, term]);
  }
}

module.exports = StudentModel;
