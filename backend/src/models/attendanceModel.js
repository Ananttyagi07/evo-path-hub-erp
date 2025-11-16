const { dbRun, dbGet, dbAll } = require('../config/database');

class AttendanceModel {
  static async getAll() {
    return await dbAll(`
      SELECT a.*, s.full_name, s.student_id, s.class, s.section
      FROM attendance a
      JOIN students s ON a.student_id = s.id
      ORDER BY a.date DESC
    `);
  }

  static async getByDate(date) {
    return await dbAll(`
      SELECT a.*, s.full_name, s.student_id, s.class, s.section
      FROM attendance a
      JOIN students s ON a.student_id = s.id
      WHERE a.date = ?
      ORDER BY s.class, s.section, s.roll_number
    `, [date]);
  }

  static async getByStudentId(studentId, startDate = null, endDate = null) {
    let query = 'SELECT * FROM attendance WHERE student_id = ?';
    const params = [studentId];

    if (startDate && endDate) {
      query += ' AND date BETWEEN ? AND ?';
      params.push(startDate, endDate);
    }

    query += ' ORDER BY date DESC';
    return await dbAll(query, params);
  }

  static async create(attendanceData) {
    try {
      const result = await dbRun(`
        INSERT INTO attendance (student_id, date, status, subject, remarks)
        VALUES (?, ?, ?, ?, ?)
      `, [
        attendanceData.student_id,
        attendanceData.date,
        attendanceData.status,
        attendanceData.subject || null,
        attendanceData.remarks || ''
      ]);

      return { id: result.lastID, ...attendanceData };
    } catch (error) {
      // If duplicate, update instead
      await dbRun(`
        UPDATE attendance
        SET status = ?, remarks = ?
        WHERE student_id = ? AND date = ? AND (subject = ? OR (subject IS NULL AND ? IS NULL))
      `, [
        attendanceData.status,
        attendanceData.remarks || '',
        attendanceData.student_id,
        attendanceData.date,
        attendanceData.subject || null,
        attendanceData.subject || null
      ]);

      return { ...attendanceData };
    }
  }

  static async bulkCreate(attendanceArray) {
    for (const record of attendanceArray) {
      await this.create(record);
    }
    return { success: true, count: attendanceArray.length };
  }

  static async getStatistics(studentId, startDate = null, endDate = null) {
    let query = `
      SELECT
        COUNT(*) as total_days,
        SUM(CASE WHEN status = 'present' THEN 1 ELSE 0 END) as present_days,
        SUM(CASE WHEN status = 'absent' THEN 1 ELSE 0 END) as absent_days,
        ROUND(CAST(SUM(CASE WHEN status = 'present' THEN 1 ELSE 0 END) AS FLOAT) / COUNT(*) * 100, 2) as percentage
      FROM attendance
      WHERE student_id = ?
    `;
    const params = [studentId];

    if (startDate && endDate) {
      query += ' AND date BETWEEN ? AND ?';
      params.push(startDate, endDate);
    }

    return await dbGet(query, params);
  }

  static async updateStudentAttendancePercentage(studentId) {
    const stats = await this.getStatistics(studentId);

    if (stats && stats.percentage !== null) {
      await dbRun('UPDATE students SET attendance_percentage = ? WHERE id = ?', [stats.percentage, studentId]);
    }
  }
}

module.exports = AttendanceModel;
