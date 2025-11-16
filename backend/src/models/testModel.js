const { dbRun, dbGet, dbAll } = require('../config/database');

class TestModel {
  static async getAll() {
    return await dbAll(`
      SELECT t.*, d.name as domain_name
      FROM tests t
      JOIN domains d ON t.domain_id = d.id
      WHERE t.is_active = 1
      ORDER BY t.created_at DESC
    `);
  }

  static async getById(id) {
    return await dbGet(`
      SELECT t.*, d.name as domain_name
      FROM tests t
      JOIN domains d ON t.domain_id = d.id
      WHERE t.id = ?
    `, [id]);
  }

  static async getByDomain(domainId) {
    return await dbAll(`
      SELECT t.*, d.name as domain_name
      FROM tests t
      JOIN domains d ON t.domain_id = d.id
      WHERE t.domain_id = ? AND t.is_active = 1
      ORDER BY t.created_at DESC
    `, [domainId]);
  }

  static async getByType(domainId, type) {
    return await dbAll(`
      SELECT t.*, d.name as domain_name
      FROM tests t
      JOIN domains d ON t.domain_id = d.id
      WHERE t.domain_id = ? AND t.type = ? AND t.is_active = 1
      ORDER BY t.created_at DESC
    `, [domainId, type]);
  }

  static async create(testData) {
    const result = await dbRun(`
      INSERT INTO tests (
        domain_id, title, description, type, difficulty, duration_minutes,
        total_marks, passing_marks, created_by, created_by_name
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      testData.domain_id,
      testData.title,
      testData.description,
      testData.type,
      testData.difficulty,
      testData.duration_minutes,
      testData.total_marks,
      testData.passing_marks,
      testData.created_by,
      testData.created_by_name
    ]);

    return await this.getById(result.lastID);
  }

  static async update(id, testData) {
    const fields = [];
    const values = [];

    Object.keys(testData).forEach(key => {
      if (key !== 'id' && testData[key] !== undefined) {
        fields.push(`${key} = ?`);
        values.push(testData[key]);
      }
    });

    fields.push('updated_at = CURRENT_TIMESTAMP');
    values.push(id);

    await dbRun(`UPDATE tests SET ${fields.join(', ')} WHERE id = ?`, values);
    return await this.getById(id);
  }

  static async delete(id) {
    return await dbRun('UPDATE tests SET is_active = 0 WHERE id = ?', [id]);
  }

  static async getWithQuestions(id) {
    const test = await this.getById(id);
    if (!test) return null;

    const questions = await dbAll(
      'SELECT * FROM test_questions WHERE test_id = ? ORDER BY id',
      [id]
    );

    return { ...test, questions };
  }

  static async addQuestion(questionData) {
    const result = await dbRun(`
      INSERT INTO test_questions (
        test_id, question_text, question_type, options, correct_answer,
        marks, code_template, test_cases, explanation
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      questionData.test_id,
      questionData.question_text,
      questionData.question_type,
      JSON.stringify(questionData.options || []),
      questionData.correct_answer,
      questionData.marks || 1,
      questionData.code_template,
      JSON.stringify(questionData.test_cases || []),
      questionData.explanation
    ]);

    return result.lastID;
  }

  static async submitTest(submissionData) {
    const result = await dbRun(`
      INSERT INTO test_submissions (
        test_id, student_id, answers, score, total_marks, percentage, time_taken_minutes
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [
      submissionData.test_id,
      submissionData.student_id,
      JSON.stringify(submissionData.answers),
      submissionData.score,
      submissionData.total_marks,
      submissionData.percentage,
      submissionData.time_taken_minutes
    ]);

    return result.lastID;
  }

  static async getStudentSubmissions(studentId, testId = null) {
    if (testId) {
      return await dbAll(`
        SELECT ts.*, t.title as test_title, t.total_marks as test_total_marks
        FROM test_submissions ts
        JOIN tests t ON ts.test_id = t.id
        WHERE ts.student_id = ? AND ts.test_id = ?
        ORDER BY ts.submitted_at DESC
      `, [studentId, testId]);
    }

    return await dbAll(`
      SELECT ts.*, t.title as test_title, t.total_marks as test_total_marks
      FROM test_submissions ts
      JOIN tests t ON ts.test_id = t.id
      WHERE ts.student_id = ?
      ORDER BY ts.submitted_at DESC
    `, [studentId]);
  }
}

module.exports = TestModel;
