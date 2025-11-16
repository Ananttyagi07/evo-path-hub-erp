const { dbRun, dbGet, dbAll } = require('../config/database');

class MarksModel {
  static async getAll() {
    return await dbAll(`
      SELECT m.*, s.full_name, s.student_id, s.class, s.section
      FROM marks m
      JOIN students s ON m.student_id = s.id
      ORDER BY m.exam_date DESC
    `);
  }

  static async getByStudentId(studentId) {
    return await dbAll('SELECT * FROM marks WHERE student_id = ? ORDER BY exam_date DESC', [studentId]);
  }

  static async getBySubject(subject) {
    return await dbAll(`
      SELECT m.*, s.full_name, s.student_id, s.class, s.section
      FROM marks m
      JOIN students s ON m.student_id = s.id
      WHERE m.subject = ?
      ORDER BY m.marks_obtained DESC
    `, [subject]);
  }

  static async create(marksData) {
    const result = await dbRun(`
      INSERT INTO marks (student_id, subject, exam_type, marks_obtained, total_marks, grade, exam_date)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [
      marksData.student_id,
      marksData.subject,
      marksData.exam_type,
      marksData.marks_obtained,
      marksData.total_marks,
      marksData.grade,
      marksData.exam_date
    ]);

    await this.updateStudentMarks(marksData.student_id);
    return { id: result.lastID, ...marksData };
  }

  static async update(id, marksData) {
    const fields = [];
    const values = [];

    Object.keys(marksData).forEach(key => {
      if (key !== 'id' && marksData[key] !== undefined) {
        fields.push(`${key} = ?`);
        values.push(marksData[key]);
      }
    });

    values.push(id);

    const result = await dbRun(`UPDATE marks SET ${fields.join(', ')} WHERE id = ?`, values);

    const mark = await dbGet('SELECT student_id FROM marks WHERE id = ?', [id]);
    if (mark) {
      await this.updateStudentMarks(mark.student_id);
    }

    return result;
  }

  static async delete(id) {
    const mark = await dbGet('SELECT student_id FROM marks WHERE id = ?', [id]);
    const result = await dbRun('DELETE FROM marks WHERE id = ?', [id]);

    if (mark) {
      await this.updateStudentMarks(mark.student_id);
    }

    return result;
  }

  static async updateStudentMarks(studentId) {
    const stats = await dbGet(`
      SELECT
        SUM(marks_obtained) as total_marks,
        SUM(total_marks) as max_marks,
        COUNT(*) as exam_count
      FROM marks
      WHERE student_id = ?
    `, [studentId]);

    if (stats && stats.total_marks !== null) {
      const percentage = (stats.total_marks / stats.max_marks) * 100;
      const gpa = (percentage / 10).toFixed(2);

      await dbRun(`
        UPDATE students
        SET total_marks = ?, gpa = ?
        WHERE id = ?
      `, [stats.total_marks, gpa, studentId]);

      const StudentModel = require('./studentModel');
      await StudentModel.updateRanks();
    }
  }

  static async getSubjectPerformance(studentId) {
    return await dbAll(`
      SELECT
        subject,
        COUNT(*) as exam_count,
        AVG(marks_obtained) as avg_marks,
        MAX(marks_obtained) as max_marks,
        MIN(marks_obtained) as min_marks
      FROM marks
      WHERE student_id = ?
      GROUP BY subject
    `, [studentId]);
  }
}

module.exports = MarksModel;
