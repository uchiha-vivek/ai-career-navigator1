import React, { useState } from 'react';
import {
  generateInterviewQuestions,
  analyzeResume,
  provideFeedback,
  optimizeLinkedInProfile,
  solveTechnicalProblem,
  handleInterviewFlow
} from '../service/service';

function InterviewAssistantComponent() {
  const [jobRole, setJobRole] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [resumeData, setResumeData] = useState('');
  const [interviewQuestion, setInterviewQuestion] = useState('');
  const [candidateAnswer, setCandidateAnswer] = useState('');
  const [profileData, setProfileData] = useState('');
  const [criteria, setCriteria] = useState('');
  
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerateQuestions = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await generateInterviewQuestions(jobRole, jobDescription);
      setResult(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Other handler functions...

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gradient-to-r from-purple-500 to-purple-700 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-white">Interview Assistant</h1>
      <div className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Job Role"
            value={jobRole}
            onChange={(e) => setJobRole(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white text-gray-800"
          />
          <input
            type="text"
            placeholder="Job Description"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white text-gray-800"
          />
          <button
            onClick={handleGenerateQuestions}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Generate Questions'}
          </button>
        </div>
        
        {/* Result and error display with proper styling */}
        {result && (
          <pre className="mt-4 p-4 bg-gray-100 rounded-md text-gray-800 overflow-y-auto max-h-60">
            {result}
          </pre>
        )}
        {error && (
          <div className="mt-4 p-4 bg-red-100 text-red-800 rounded-md overflow-y-auto max-h-60">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default InterviewAssistantComponent;
