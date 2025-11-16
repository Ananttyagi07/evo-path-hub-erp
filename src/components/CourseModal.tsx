import React, { useState, useEffect } from 'react';
import { X, Upload, BookOpen, Video, FileText, Award, Code, Brain } from 'lucide-react';
import axios from 'axios';

interface CourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  domainId: number;
  domainName: string;
}

const API_BASE_URL = 'http://localhost:5001/api';

const CourseModal: React.FC<CourseModalProps> = ({ isOpen, onClose, domainId, domainName }) => {
  const [activeTab, setActiveTab] = useState<'roadmap' | 'resources' | 'tests'>('roadmap');
  const [roadmapType, setRoadmapType] = useState<'ai' | 'teacher'>('ai');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [timetableFile, setTimetableFile] = useState<File | null>(null);
  const [teacherRoadmaps, setTeacherRoadmaps] = useState<any[]>([]);
  const [resources, setResources] = useState<any[]>([]);
  const [tests, setTests] = useState<any[]>([]);
  const [selectedResourceType, setSelectedResourceType] = useState<'pyq' | 'notes' | 'videos' | 'playlists'>('notes');
  const [selectedTestType, setSelectedTestType] = useState<'pyq' | 'coding'>('pyq');
  const [loading, setLoading] = useState(false);
  const [generatedRoadmap, setGeneratedRoadmap] = useState<any>(null);

  useEffect(() => {
    if (isOpen && domainId) {
      fetchTeacherRoadmaps();
      fetchResources();
      fetchTests();
    }
  }, [isOpen, domainId]);

  const fetchTeacherRoadmaps = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/roadmaps/domain/${domainId}/teacher`);
      setTeacherRoadmaps(response.data.data || []);
    } catch (error) {
      console.error('Failed to fetch roadmaps:', error);
    }
  };

  const fetchResources = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/resources/domain/${domainId}`);
      setResources(response.data.data || []);
    } catch (error) {
      console.error('Failed to fetch resources:', error);
    }
  };

  const fetchTests = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/tests/domain/${domainId}`);
      setTests(response.data.data || []);
    } catch (error) {
      console.error('Failed to fetch tests:', error);
    }
  };

  const generateAIRoadmap = async () => {
    if (!timetableFile) {
      alert('Please upload your timetable image');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('timetable', timetableFile);
    formData.append('domain_id', domainId.toString());
    formData.append('difficulty', difficulty);
    formData.append('student_id', '1'); // Replace with actual student ID

    try {
      const response = await axios.post(`${API_BASE_URL}/roadmaps/generate-ai`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setGeneratedRoadmap(response.data.data);
      alert('AI Roadmap generated successfully!');
    } catch (error) {
      console.error('Failed to generate roadmap:', error);
      alert('Failed to generate roadmap');
    } finally {
      setLoading(false);
    }
  };

  const handleResourceView = async (resourceId: number) => {
    try {
      await axios.post(`${API_BASE_URL}/resources/${resourceId}/view`);
    } catch (error) {
      console.error('Failed to track view:', error);
    }
  };

  const handleResourceDownload = async (resourceId: number) => {
    try {
      await axios.post(`${API_BASE_URL}/resources/${resourceId}/download`);
    } catch (error) {
      console.error('Failed to track download:', error);
    }
  };

  if (!isOpen) return null;

  const filteredResources = resources.filter(r => r.type === selectedResourceType);
  const filteredTests = tests.filter(t => t.type === selectedTestType);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold">{domainName}</h2>
            <p className="text-blue-100 mt-1">Complete Learning Path</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 bg-gray-50">
          <button
            onClick={() => setActiveTab('roadmap')}
            className={`flex-1 py-4 px-6 font-semibold transition-all ${
              activeTab === 'roadmap'
                ? 'bg-white text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            <BookOpen className="inline-block mr-2" size={20} />
            Roadmap
          </button>
          <button
            onClick={() => setActiveTab('resources')}
            className={`flex-1 py-4 px-6 font-semibold transition-all ${
              activeTab === 'resources'
                ? 'bg-white text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            <FileText className="inline-block mr-2" size={20} />
            Resources
          </button>
          <button
            onClick={() => setActiveTab('tests')}
            className={`flex-1 py-4 px-6 font-semibold transition-all ${
              activeTab === 'tests'
                ? 'bg-white text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            <Award className="inline-block mr-2" size={20} />
            Tests
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* ROADMAP TAB */}
          {activeTab === 'roadmap' && (
            <div className="space-y-6">
              {/* Roadmap Type Selector */}
              <div className="flex gap-4">
                <button
                  onClick={() => setRoadmapType('ai')}
                  className={`flex-1 p-6 rounded-xl border-2 transition-all ${
                    roadmapType === 'ai'
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <Brain className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                  <h3 className="font-bold text-lg mb-1">Generate from AI</h3>
                  <p className="text-sm text-gray-600">Personalized roadmap based on your schedule</p>
                </button>
                <button
                  onClick={() => setRoadmapType('teacher')}
                  className={`flex-1 p-6 rounded-xl border-2 transition-all ${
                    roadmapType === 'teacher'
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <BookOpen className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <h3 className="font-bold text-lg mb-1">Teacher Uploaded</h3>
                  <p className="text-sm text-gray-600">Curated roadmaps by expert teachers</p>
                </button>
              </div>

              {/* AI Roadmap Generator */}
              {roadmapType === 'ai' && (
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold mb-4 text-purple-900">AI Roadmap Generator</h3>

                  {/* Upload Timetable */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      Upload Current Timetable (Image)
                    </label>
                    <div className="border-2 border-dashed border-purple-300 rounded-lg p-6 text-center bg-white">
                      <Upload className="w-12 h-12 mx-auto mb-2 text-purple-400" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setTimetableFile(e.target.files?.[0] || null)}
                        className="hidden"
                        id="timetable-upload"
                      />
                      <label htmlFor="timetable-upload" className="cursor-pointer">
                        <span className="text-purple-600 font-semibold hover:underline">
                          Choose file
                        </span>
                        <span className="text-gray-600"> or drag and drop</span>
                      </label>
                      {timetableFile && (
                        <p className="mt-2 text-sm text-green-600">✓ {timetableFile.name}</p>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 mt-2">
                      📸 AI will use OCR to analyze your schedule and create an optimized roadmap
                    </p>
                  </div>

                  {/* Difficulty Selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold mb-3 text-gray-700">
                      Select Difficulty Level
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      <button
                        onClick={() => setDifficulty('easy')}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          difficulty === 'easy'
                            ? 'border-green-500 bg-green-50 ring-2 ring-green-200'
                            : 'border-gray-200 hover:border-green-300'
                        }`}
                      >
                        <div className="text-2xl mb-1">🌱</div>
                        <div className="font-semibold">Easy</div>
                        <div className="text-xs text-gray-600">16 weeks</div>
                      </button>
                      <button
                        onClick={() => setDifficulty('medium')}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          difficulty === 'medium'
                            ? 'border-yellow-500 bg-yellow-50 ring-2 ring-yellow-200'
                            : 'border-gray-200 hover:border-yellow-300'
                        }`}
                      >
                        <div className="text-2xl mb-1">⚡</div>
                        <div className="font-semibold">Medium</div>
                        <div className="text-xs text-gray-600">12 weeks</div>
                      </button>
                      <button
                        onClick={() => setDifficulty('hard')}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          difficulty === 'hard'
                            ? 'border-red-500 bg-red-50 ring-2 ring-red-200'
                            : 'border-gray-200 hover:border-red-300'
                        }`}
                      >
                        <div className="text-2xl mb-1">🔥</div>
                        <div className="font-semibold">Tough</div>
                        <div className="text-xs text-gray-600">8 weeks</div>
                      </button>
                    </div>
                  </div>

                  {/* Generate Button */}
                  <button
                    onClick={generateAIRoadmap}
                    disabled={!timetableFile || loading}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-lg font-bold text-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Generating...' : '✨ Generate AI Roadmap'}
                  </button>

                  {/* Display Generated Roadmap */}
                  {generatedRoadmap && (
                    <div className="mt-6 bg-white p-4 rounded-lg border border-purple-200">
                      <h4 className="font-bold text-lg mb-2">Generated Roadmap</h4>
                      <p className="text-sm text-gray-600 mb-3">{generatedRoadmap.description}</p>
                      <div className="text-sm">
                        <strong>Timeline:</strong> {generatedRoadmap.timeline_weeks} weeks
                      </div>
                      <div className="text-sm">
                        <strong>Difficulty:</strong> {generatedRoadmap.difficulty}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Teacher Roadmaps */}
              {roadmapType === 'teacher' && (
                <div>
                  <h3 className="text-xl font-bold mb-4">Teacher Uploaded Roadmaps</h3>
                  {teacherRoadmaps.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                      <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>No teacher roadmaps available yet</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {teacherRoadmaps.map((roadmap) => (
                        <div
                          key={roadmap.id}
                          className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                        >
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h4 className="font-bold text-lg text-gray-900">{roadmap.title}</h4>
                              <p className="text-sm text-gray-600 mt-1">{roadmap.description}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              roadmap.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                              roadmap.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {roadmap.difficulty}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>📚 {roadmap.timeline_weeks} weeks</span>
                            <span>👨‍🏫 {roadmap.uploaded_by_name}</span>
                            <span>📅 {new Date(roadmap.created_at).toLocaleDateString()}</span>
                          </div>
                          <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                            View Roadmap
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* RESOURCES TAB */}
          {activeTab === 'resources' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Learning Resources</h3>

              {/* Resource Type Filter */}
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => setSelectedResourceType('notes')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    selectedResourceType === 'notes'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  📝 Notes
                </button>
                <button
                  onClick={() => setSelectedResourceType('pyq')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    selectedResourceType === 'pyq'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  📄 PYQ Papers
                </button>
                <button
                  onClick={() => setSelectedResourceType('videos')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    selectedResourceType === 'videos'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  🎥 Video Lectures
                </button>
                <button
                  onClick={() => setSelectedResourceType('playlists')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    selectedResourceType === 'playlists'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  📺 Playlists
                </button>
              </div>

              {/* Resources List */}
              {filteredResources.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>No {selectedResourceType} available yet</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredResources.map((resource) => (
                    <div
                      key={resource.id}
                      className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow"
                    >
                      <h4 className="font-bold text-lg mb-2">{resource.title}</h4>
                      <p className="text-sm text-gray-600 mb-3">{resource.description}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                        <span>👨‍🏫 {resource.uploaded_by_name}</span>
                        <span>👁️ {resource.views} views</span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            handleResourceView(resource.id);
                            if (resource.url) window.open(resource.url, '_blank');
                          }}
                          className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
                        >
                          View
                        </button>
                        {resource.file_path && (
                          <button
                            onClick={() => handleResourceDownload(resource.id)}
                            className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-semibold"
                          >
                            Download
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TESTS TAB */}
          {activeTab === 'tests' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Available Tests</h3>

              {/* Test Type Filter */}
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedTestType('pyq')}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    selectedTestType === 'pyq'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  📝 PYQ Tests
                </button>
                <button
                  onClick={() => setSelectedTestType('coding')}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    selectedTestType === 'coding'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  💻 Coding Tests
                </button>
              </div>

              {/* Tests List */}
              {filteredTests.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Award className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>No {selectedTestType} tests available yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredTests.map((test) => (
                    <div
                      key={test.id}
                      className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-bold text-xl text-gray-900">{test.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{test.description}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          test.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                          test.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {test.difficulty}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                        <div className="bg-gray-50 p-3 rounded">
                          <div className="text-gray-600">Duration</div>
                          <div className="font-bold text-lg">{test.duration_minutes} min</div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded">
                          <div className="text-gray-600">Total Marks</div>
                          <div className="font-bold text-lg">{test.total_marks}</div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded">
                          <div className="text-gray-600">Passing</div>
                          <div className="font-bold text-lg">{test.passing_marks}</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">👨‍🏫 {test.created_by_name}</span>
                        <button className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold">
                          Start Test
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseModal;
