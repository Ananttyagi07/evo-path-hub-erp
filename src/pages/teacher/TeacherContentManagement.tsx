import React, { useState, useEffect } from 'react';
import { Plus, Upload, Trash2, Edit, Save, X } from 'lucide-react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api';

const TeacherContentManagement = () => {
  const [activeSection, setActiveSection] = useState<'domains' | 'roadmaps' | 'resources' | 'tests'>('domains');
  const [domains, setDomains] = useState<any[]>([]);
  const [roadmaps, setRoadmaps] = useState<any[]>([]);
  const [resources, setResources] = useState<any[]>([]);
  const [tests, setTests] = useState<any[]>([]);

  // Domain Form State
  const [domainForm, setDomainForm] = useState({
    name: '',
    description: '',
    icon: '',
    category: 'Technology',
    difficulty_level: 'Beginner'
  });

  // Roadmap Form State
  const [roadmapForm, setRoadmapForm] = useState({
    domain_id: '',
    title: '',
    description: '',
    difficulty: 'medium',
    timeline_weeks: 12,
    roadmap_data: ''
  });

  // Resource Form State
  const [resourceForm, setResourceForm] = useState({
    domain_id: '',
    title: '',
    description: '',
    type: 'notes',
    url: ''
  });
  const [resourceFile, setResourceFile] = useState<File | null>(null);

  // Test Form State
  const [testForm, setTestForm] = useState({
    domain_id: '',
    title: '',
    description: '',
    type: 'pyq',
    difficulty: 'medium',
    duration_minutes: 60,
    total_marks: 100,
    passing_marks: 50
  });

  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState({
    question_text: '',
    question_type: 'mcq',
    options: ['', '', '', ''],
    correct_answer: '',
    marks: 2,
    explanation: ''
  });

  const teacherId = 1; // Replace with actual logged-in teacher ID
  const teacherName = 'Anant Sir'; // Replace with actual teacher name

  useEffect(() => {
    fetchDomains();
    fetchRoadmaps();
    fetchResources();
    fetchTests();
  }, []);

  const fetchDomains = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/domains`);
      setDomains(response.data.data || []);
    } catch (error) {
      console.error('Failed to fetch domains:', error);
    }
  };

  const fetchRoadmaps = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/roadmaps`);
      setRoadmaps(response.data.data || []);
    } catch (error) {
      console.error('Failed to fetch roadmaps:', error);
    }
  };

  const fetchResources = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/resources`);
      setResources(response.data.data || []);
    } catch (error) {
      console.error('Failed to fetch resources:', error);
    }
  };

  const fetchTests = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/tests`);
      setTests(response.data.data || []);
    } catch (error) {
      console.error('Failed to fetch tests:', error);
    }
  };

  // Domain Management
  const handleCreateDomain = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/domains`, {
        ...domainForm,
        created_by: teacherId
      });
      alert('Domain created successfully!');
      fetchDomains();
      setDomainForm({ name: '', description: '', icon: '', category: 'Technology', difficulty_level: 'Beginner' });
    } catch (error) {
      console.error('Failed to create domain:', error);
      alert('Failed to create domain');
    }
  };

  const handleDeleteDomain = async (id: number) => {
    if (!confirm('Are you sure you want to delete this domain?')) return;
    try {
      await axios.delete(`${API_BASE_URL}/domains/${id}`);
      alert('Domain deleted successfully!');
      fetchDomains();
    } catch (error) {
      console.error('Failed to delete domain:', error);
      alert('Failed to delete domain');
    }
  };

  // Roadmap Management
  const handleCreateRoadmap = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let roadmapData = {};
      try {
        roadmapData = JSON.parse(roadmapForm.roadmap_data);
      } catch {
        roadmapData = { weeks: [] };
      }

      await axios.post(`${API_BASE_URL}/roadmaps`, {
        ...roadmapForm,
        type: 'teacher-uploaded',
        created_by: teacherId,
        uploaded_by_name: teacherName,
        is_ai_generated: 0,
        roadmap_data: roadmapData
      });
      alert('Roadmap uploaded successfully!');
      fetchRoadmaps();
      setRoadmapForm({ domain_id: '', title: '', description: '', difficulty: 'medium', timeline_weeks: 12, roadmap_data: '' });
    } catch (error) {
      console.error('Failed to create roadmap:', error);
      alert('Failed to create roadmap');
    }
  };

  // Resource Management
  const handleUploadResource = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      if (resourceFile) {
        formData.append('file', resourceFile);
      }
      formData.append('domain_id', resourceForm.domain_id);
      formData.append('title', resourceForm.title);
      formData.append('description', resourceForm.description);
      formData.append('type', resourceForm.type);
      formData.append('url', resourceForm.url);
      formData.append('uploaded_by', teacherId.toString());
      formData.append('uploaded_by_name', teacherName);

      await axios.post(`${API_BASE_URL}/resources`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Resource uploaded successfully!');
      fetchResources();
      setResourceForm({ domain_id: '', title: '', description: '', type: 'notes', url: '' });
      setResourceFile(null);
    } catch (error) {
      console.error('Failed to upload resource:', error);
      alert('Failed to upload resource');
    }
  };

  const handleDeleteResource = async (id: number) => {
    if (!confirm('Are you sure you want to delete this resource?')) return;
    try {
      await axios.delete(`${API_BASE_URL}/resources/${id}`);
      alert('Resource deleted successfully!');
      fetchResources();
    } catch (error) {
      console.error('Failed to delete resource:', error);
      alert('Failed to delete resource');
    }
  };

  // Test Management
  const handleAddQuestion = () => {
    setQuestions([...questions, { ...currentQuestion }]);
    setCurrentQuestion({
      question_text: '',
      question_type: 'mcq',
      options: ['', '', '', ''],
      correct_answer: '',
      marks: 2,
      explanation: ''
    });
  };

  const handleCreateTest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (questions.length === 0) {
      alert('Please add at least one question');
      return;
    }

    try {
      // Create test
      const testResponse = await axios.post(`${API_BASE_URL}/tests`, {
        ...testForm,
        created_by: teacherId,
        created_by_name: teacherName
      });

      const testId = testResponse.data.data.id;

      // Add questions
      for (const question of questions) {
        await axios.post(`${API_BASE_URL}/tests/${testId}/questions`, question);
      }

      alert('Test created successfully!');
      fetchTests();
      setTestForm({
        domain_id: '',
        title: '',
        description: '',
        type: 'pyq',
        difficulty: 'medium',
        duration_minutes: 60,
        total_marks: 100,
        passing_marks: 50
      });
      setQuestions([]);
    } catch (error) {
      console.error('Failed to create test:', error);
      alert('Failed to create test');
    }
  };

  const handleDeleteTest = async (id: number) => {
    if (!confirm('Are you sure you want to delete this test?')) return;
    try {
      await axios.delete(`${API_BASE_URL}/tests/${id}`);
      alert('Test deleted successfully!');
      fetchTests();
    } catch (error) {
      console.error('Failed to delete test:', error);
      alert('Failed to delete test');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 text-gray-900">Teacher Content Management</h1>
        <p className="text-gray-600 mb-8">Manage domains, roadmaps, resources, and tests</p>

        {/* Navigation */}
        <div className="flex gap-2 mb-8 flex-wrap">
          <button
            onClick={() => setActiveSection('domains')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeSection === 'domains'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            📚 Manage Domains
          </button>
          <button
            onClick={() => setActiveSection('roadmaps')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeSection === 'roadmaps'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            🗺️ Upload Roadmaps
          </button>
          <button
            onClick={() => setActiveSection('resources')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeSection === 'resources'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            📁 Upload Resources
          </button>
          <button
            onClick={() => setActiveSection('tests')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeSection === 'tests'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            📝 Create Tests
          </button>
        </div>

        {/* DOMAINS SECTION */}
        {activeSection === 'domains' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Create Domain Form */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Plus size={24} />
                Create New Domain
              </h2>
              <form onSubmit={handleCreateDomain} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Domain Name</label>
                  <input
                    type="text"
                    value={domainForm.name}
                    onChange={(e) => setDomainForm({ ...domainForm, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Description</label>
                  <textarea
                    value={domainForm.description}
                    onChange={(e) => setDomainForm({ ...domainForm, description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Icon (Emoji)</label>
                  <input
                    type="text"
                    value={domainForm.icon}
                    onChange={(e) => setDomainForm({ ...domainForm, icon: e.target.value })}
                    placeholder="🌐"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Category</label>
                  <select
                    value={domainForm.category}
                    onChange={(e) => setDomainForm({ ...domainForm, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option>Technology</option>
                    <option>Business</option>
                    <option>Design</option>
                    <option>Science</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Difficulty Level</label>
                  <input
                    type="text"
                    value={domainForm.difficulty_level}
                    onChange={(e) => setDomainForm({ ...domainForm, difficulty_level: e.target.value })}
                    placeholder="Beginner to Advanced"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Create Domain
                </button>
              </form>
            </div>

            {/* Existing Domains List */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-2xl font-bold mb-6">Existing Domains ({domains.length})</h2>
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {domains.map((domain) => (
                  <div
                    key={domain.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{domain.icon}</span>
                      <div>
                        <h3 className="font-semibold">{domain.name}</h3>
                        <p className="text-sm text-gray-600">{domain.category}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteDomain(domain.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ROADMAPS SECTION */}
        {activeSection === 'roadmaps' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upload Roadmap Form */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Upload size={24} />
                Upload Roadmap
              </h2>
              <form onSubmit={handleCreateRoadmap} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Select Domain</label>
                  <select
                    value={roadmapForm.domain_id}
                    onChange={(e) => setRoadmapForm({ ...roadmapForm, domain_id: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Choose a domain...</option>
                    {domains.map((domain) => (
                      <option key={domain.id} value={domain.id}>
                        {domain.icon} {domain.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Roadmap Title</label>
                  <input
                    type="text"
                    value={roadmapForm.title}
                    onChange={(e) => setRoadmapForm({ ...roadmapForm, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Description</label>
                  <textarea
                    value={roadmapForm.description}
                    onChange={(e) => setRoadmapForm({ ...roadmapForm, description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Difficulty</label>
                    <select
                      value={roadmapForm.difficulty}
                      onChange={(e) => setRoadmapForm({ ...roadmapForm, difficulty: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Timeline (weeks)</label>
                    <input
                      type="number"
                      value={roadmapForm.timeline_weeks}
                      onChange={(e) => setRoadmapForm({ ...roadmapForm, timeline_weeks: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min="1"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Roadmap Data (JSON)</label>
                  <textarea
                    value={roadmapForm.roadmap_data}
                    onChange={(e) => setRoadmapForm({ ...roadmapForm, roadmap_data: e.target.value })}
                    placeholder='{"weeks": [{"week": 1, "title": "Introduction", "tasks": ["Task 1", "Task 2"]}]}'
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                    rows={5}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Upload Roadmap
                </button>
              </form>
            </div>

            {/* Existing Roadmaps */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-2xl font-bold mb-6">Your Roadmaps ({roadmaps.length})</h2>
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {roadmaps.map((roadmap) => (
                  <div
                    key={roadmap.id}
                    className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">{roadmap.title}</h3>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        roadmap.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                        roadmap.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {roadmap.difficulty}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{roadmap.description}</p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>📚 {roadmap.timeline_weeks} weeks</span>
                      <span>🌐 {roadmap.domain_name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* RESOURCES SECTION */}
        {activeSection === 'resources' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upload Resource Form */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Upload size={24} />
                Upload Resource
              </h2>
              <form onSubmit={handleUploadResource} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Select Domain</label>
                  <select
                    value={resourceForm.domain_id}
                    onChange={(e) => setResourceForm({ ...resourceForm, domain_id: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Choose a domain...</option>
                    {domains.map((domain) => (
                      <option key={domain.id} value={domain.id}>
                        {domain.icon} {domain.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Resource Type</label>
                  <select
                    value={resourceForm.type}
                    onChange={(e) => setResourceForm({ ...resourceForm, type: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="notes">📝 Notes</option>
                    <option value="pyq">📄 PYQ Papers</option>
                    <option value="videos">🎥 Videos</option>
                    <option value="playlists">📺 Playlists</option>
                    <option value="others">📁 Others</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Title</label>
                  <input
                    type="text"
                    value={resourceForm.title}
                    onChange={(e) => setResourceForm({ ...resourceForm, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Description</label>
                  <textarea
                    value={resourceForm.description}
                    onChange={(e) => setResourceForm({ ...resourceForm, description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Upload File (Optional)</label>
                  <input
                    type="file"
                    onChange={(e) => setResourceFile(e.target.files?.[0] || null)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">URL (Optional)</label>
                  <input
                    type="url"
                    value={resourceForm.url}
                    onChange={(e) => setResourceForm({ ...resourceForm, url: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Upload Resource
                </button>
              </form>
            </div>

            {/* Existing Resources */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-2xl font-bold mb-6">Your Resources ({resources.length})</h2>
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {resources.map((resource) => (
                  <div
                    key={resource.id}
                    className="flex items-start justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold">{resource.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{resource.description}</p>
                      <div className="flex gap-4 mt-2 text-xs text-gray-500">
                        <span>{resource.type}</span>
                        <span>👁️ {resource.views} views</span>
                        <span>⬇️ {resource.downloads} downloads</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteResource(resource.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TESTS SECTION */}
        {activeSection === 'tests' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Create Test Form */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Plus size={24} />
                Create Test
              </h2>
              <form onSubmit={handleCreateTest} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Select Domain</label>
                  <select
                    value={testForm.domain_id}
                    onChange={(e) => setTestForm({ ...testForm, domain_id: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Choose a domain...</option>
                    {domains.map((domain) => (
                      <option key={domain.id} value={domain.id}>
                        {domain.icon} {domain.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Test Title</label>
                  <input
                    type="text"
                    value={testForm.title}
                    onChange={(e) => setTestForm({ ...testForm, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Description</label>
                  <textarea
                    value={testForm.description}
                    onChange={(e) => setTestForm({ ...testForm, description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={2}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Type</label>
                    <select
                      value={testForm.type}
                      onChange={(e) => setTestForm({ ...testForm, type: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="pyq">PYQ</option>
                      <option value="coding">Coding</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Difficulty</label>
                    <select
                      value={testForm.difficulty}
                      onChange={(e) => setTestForm({ ...testForm, difficulty: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Duration (min)</label>
                    <input
                      type="number"
                      value={testForm.duration_minutes}
                      onChange={(e) => setTestForm({ ...testForm, duration_minutes: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min="1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Total Marks</label>
                    <input
                      type="number"
                      value={testForm.total_marks}
                      onChange={(e) => setTestForm({ ...testForm, total_marks: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min="1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Passing Marks</label>
                    <input
                      type="number"
                      value={testForm.passing_marks}
                      onChange={(e) => setTestForm({ ...testForm, passing_marks: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min="1"
                    />
                  </div>
                </div>

                {/* Add Question Section */}
                <div className="border-t pt-4 mt-6">
                  <h3 className="font-bold mb-3">Add Question</h3>
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={currentQuestion.question_text}
                      onChange={(e) => setCurrentQuestion({ ...currentQuestion, question_text: e.target.value })}
                      placeholder="Question text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />

                    {testForm.type === 'pyq' && (
                      <>
                        {currentQuestion.options.map((opt, idx) => (
                          <input
                            key={idx}
                            type="text"
                            value={opt}
                            onChange={(e) => {
                              const newOptions = [...currentQuestion.options];
                              newOptions[idx] = e.target.value;
                              setCurrentQuestion({ ...currentQuestion, options: newOptions });
                            }}
                            placeholder={`Option ${idx + 1}`}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ))}
                        <input
                          type="text"
                          value={currentQuestion.correct_answer}
                          onChange={(e) => setCurrentQuestion({ ...currentQuestion, correct_answer: e.target.value })}
                          placeholder="Correct answer"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </>
                    )}

                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="number"
                        value={currentQuestion.marks}
                        onChange={(e) => setCurrentQuestion({ ...currentQuestion, marks: parseInt(e.target.value) })}
                        placeholder="Marks"
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        min="1"
                      />
                      <button
                        type="button"
                        onClick={handleAddQuestion}
                        className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Add Question
                      </button>
                    </div>
                  </div>

                  {/* Questions List */}
                  {questions.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <h4 className="font-semibold text-sm">Added Questions ({questions.length})</h4>
                      {questions.map((q, idx) => (
                        <div key={idx} className="text-sm bg-gray-50 p-2 rounded">
                          {idx + 1}. {q.question_text} ({q.marks} marks)
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors mt-6"
                >
                  Create Test with {questions.length} Questions
                </button>
              </form>
            </div>

            {/* Existing Tests */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-2xl font-bold mb-6">Your Tests ({tests.length})</h2>
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {tests.map((test) => (
                  <div
                    key={test.id}
                    className="flex items-start justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold">{test.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{test.description}</p>
                      <div className="flex gap-4 mt-2 text-xs text-gray-500">
                        <span>{test.type}</span>
                        <span>⏱️ {test.duration_minutes} min</span>
                        <span>📊 {test.total_marks} marks</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteTest(test.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherContentManagement;
