const { dbRun } = require('../config/database');
const { createCourseTables } = require('../config/courseTables');

const seedCourses = async () => {
  console.log('🌱 Seeding course data...');

  try {
    await createCourseTables();

    // Sample domains
    const domains = [
      { name: 'Web Development', description: 'Full stack web development', icon: '🌐', category: 'Technology', difficulty_level: 'Beginner to Advanced' },
      { name: 'Data Science', description: 'Data analysis and machine learning', icon: '📊', category: 'Technology', difficulty_level: 'Intermediate to Advanced' },
      { name: 'Mobile App Development', description: 'Android and iOS development', icon: '📱', category: 'Technology', difficulty_level: 'Intermediate' },
      { name: 'Machine Learning', description: 'AI and deep learning', icon: '🤖', category: 'Technology', difficulty_level: 'Advanced' },
      { name: 'DevOps', description: 'CI/CD and cloud infrastructure', icon: '⚙️', category: 'Technology', difficulty_level: 'Intermediate to Advanced' },
      { name: 'Cybersecurity', description: 'Network and application security', icon: '🔒', category: 'Technology', difficulty_level: 'Intermediate to Advanced' },
      { name: 'Blockchain', description: 'Decentralized applications', icon: '⛓️', category: 'Technology', difficulty_level: 'Advanced' },
      { name: 'Cloud Computing', description: 'AWS, Azure, GCP', icon: '☁️', category: 'Technology', difficulty_level: 'Intermediate' }
    ];

    for (const domain of domains) {
      await dbRun(`
        INSERT INTO domains (name, description, icon, category, difficulty_level, created_by)
        VALUES (?, ?, ?, ?, ?, ?)
      `, [domain.name, domain.description, domain.icon, domain.category, domain.difficulty_level, 1]);
    }

    console.log(`✅ ${domains.length} domains created`);

    // Sample roadmaps
    const roadmaps = [
      {
        domain_id: 1,
        title: 'Frontend Development Path',
        description: 'Complete frontend development roadmap',
        type: 'teacher-uploaded',
        difficulty: 'medium',
        timeline_weeks: 12,
        created_by: 1,
        uploaded_by_name: 'Anant Sir',
        is_ai_generated: 0,
        roadmap_data: JSON.stringify({
          weeks: [
            { week: 1, title: 'HTML & CSS Basics', tasks: ['Learn HTML5', 'CSS fundamentals', 'Flexbox and Grid'] },
            { week: 2, title: 'JavaScript Fundamentals', tasks: ['Variables and data types', 'Functions', 'DOM manipulation'] },
            { week: 3, title: 'React Basics', tasks: ['Components', 'Props and State', 'Hooks'] },
          ]
        })
      },
      {
        domain_id: 2,
        title: 'Data Science Bootcamp',
        description: 'Comprehensive data science path',
        type: 'teacher-uploaded',
        difficulty: 'hard',
        timeline_weeks: 16,
        created_by: 1,
        uploaded_by_name: 'Dr. Rajesh Kumar',
        is_ai_generated: 0,
        roadmap_data: JSON.stringify({
          weeks: [
            { week: 1, title: 'Python for Data Science', tasks: ['Python basics', 'NumPy', 'Pandas'] },
            { week: 2, title: 'Data Visualization', tasks: ['Matplotlib', 'Seaborn', 'Plotly'] },
          ]
        })
      }
    ];

    for (const roadmap of roadmaps) {
      await dbRun(`
        INSERT INTO roadmaps (domain_id, title, description, type, difficulty, timeline_weeks, created_by, uploaded_by_name, is_ai_generated, roadmap_data)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [roadmap.domain_id, roadmap.title, roadmap.description, roadmap.type, roadmap.difficulty, roadmap.timeline_weeks, roadmap.created_by, roadmap.uploaded_by_name, roadmap.is_ai_generated, roadmap.roadmap_data]);
    }

    console.log(`✅ ${roadmaps.length} roadmaps created`);

    // Sample resources
    const resources = [
      { domain_id: 1, title: 'HTML5 Complete Guide', type: 'notes', description: 'Comprehensive HTML5 notes', uploaded_by: 1, uploaded_by_name: 'Anant Sir' },
      { domain_id: 1, title: 'JavaScript Crash Course', type: 'videos', description: 'Video series on JavaScript', url: 'https://youtube.com/playlist?example', uploaded_by: 1, uploaded_by_name: 'Anant Sir' },
      { domain_id: 1, title: 'Frontend Development PYQ 2024', type: 'pyq', description: 'Previous year questions', uploaded_by: 1, uploaded_by_name: 'Anant Sir' },
      { domain_id: 2, title: 'Python for Data Science', type: 'notes', description: 'Complete Python notes', uploaded_by: 2, uploaded_by_name: 'Dr. Rajesh Kumar' },
      { domain_id: 2, title: 'Machine Learning Playlist', type: 'playlists', description: 'YouTube ML playlist', url: 'https://youtube.com/playlist?ml-course', uploaded_by: 2, uploaded_by_name: 'Dr. Rajesh Kumar' },
    ];

    for (const resource of resources) {
      await dbRun(`
        INSERT INTO resources (domain_id, title, description, type, url, uploaded_by, uploaded_by_name)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `, [resource.domain_id, resource.title, resource.description, resource.type, resource.url || null, resource.uploaded_by, resource.uploaded_by_name]);
    }

    console.log(`✅ ${resources.length} resources created`);

    // Sample tests
    const tests = [
      {
        domain_id: 1,
        title: 'HTML & CSS Basics Test',
        description: 'Test your HTML and CSS knowledge',
        type: 'pyq',
        difficulty: 'easy',
        duration_minutes: 30,
        total_marks: 50,
        passing_marks: 25,
        created_by: 1,
        created_by_name: 'Anant Sir'
      },
      {
        domain_id: 1,
        title: 'JavaScript Coding Challenge',
        description: 'Solve coding problems in JavaScript',
        type: 'coding',
        difficulty: 'medium',
        duration_minutes: 60,
        total_marks: 100,
        passing_marks: 50,
        created_by: 1,
        created_by_name: 'Anant Sir'
      },
      {
        domain_id: 2,
        title: 'Python Data Structures',
        description: 'Data structures and algorithms in Python',
        type: 'coding',
        difficulty: 'medium',
        duration_minutes: 90,
        total_marks: 100,
        passing_marks: 60,
        created_by: 2,
        created_by_name: 'Dr. Rajesh Kumar'
      }
    ];

    for (const test of tests) {
      const result = await dbRun(`
        INSERT INTO tests (domain_id, title, description, type, difficulty, duration_minutes, total_marks, passing_marks, created_by, created_by_name)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [test.domain_id, test.title, test.description, test.type, test.difficulty, test.duration_minutes, test.total_marks, test.passing_marks, test.created_by, test.created_by_name]);

      // Add sample questions to tests
      if (test.type === 'pyq') {
        await dbRun(`
          INSERT INTO test_questions (test_id, question_text, question_type, options, correct_answer, marks, explanation)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `, [result.lastID, 'What does HTML stand for?', 'mcq', JSON.stringify(['Hyper Text Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyperlinks and Text Markup Language']), 'Hyper Text Markup Language', 2, 'HTML stands for Hyper Text Markup Language']);

        await dbRun(`
          INSERT INTO test_questions (test_id, question_text, question_type, options, correct_answer, marks, explanation)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `, [result.lastID, 'Which CSS property is used to change text color?', 'mcq', JSON.stringify(['font-color', 'text-color', 'color', 'foreground-color']), 'color', 2, 'The color property is used to change text color in CSS']);
      } else if (test.type === 'coding') {
        await dbRun(`
          INSERT INTO test_questions (test_id, question_text, question_type, code_template, test_cases, marks, explanation)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `, [result.lastID, 'Write a function to reverse a string', 'coding', 'function reverseString(str) {\n  // Your code here\n}', JSON.stringify([
          { input: '"hello"', output: '"olleh"' },
          { input: '"world"', output: '"dlrow"' }
        ]), 10, 'Reverse the given string using any method']);
      }
    }

    console.log(`✅ ${tests.length} tests created with questions`);

    console.log('\n🎉 Course data seeding completed!');

  } catch (error) {
    console.error('❌ Error seeding courses:', error);
    throw error;
  }
};

// Run if called directly
if (require.main === module) {
  seedCourses()
    .then(() => process.exit(0))
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
}

module.exports = { seedCourses };
