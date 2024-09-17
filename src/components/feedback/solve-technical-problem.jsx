import React, { useState } from 'react';
import {
  generateInterviewQuestions,
  analyzeResume,
  provideFeedback,
  optimizeLinkedInProfile,
  solveTechnicalProblem,
  handleInterviewFlow
} from '../../service/service';

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

  const handleAnalyzeResume = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await analyzeResume(resumeData, jobDescription);
      setResult(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleProvideFeedback = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await provideFeedback(interviewQuestion, candidateAnswer);
      setResult(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOptimizeProfile = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await optimizeLinkedInProfile(profileData);
      setResult(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSolveTechnicalProblem = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await solveTechnicalProblem(criteria);
      setResult(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInterviewFlow = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await handleInterviewFlow(jobRole, jobDescription, interviewQuestion, candidateAnswer);
      setResult(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gradient-to-r from-purple-500 to-purple-700 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-white">Interview Assistant</h1>
      <div className="space-y-4">
        {/* New field for criteria (Technical Problem) */}
        <div>
          <input
            type="text"
            placeholder="Technical Problem Criteria"
            value={criteria}
            onChange={(e) => setCriteria(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white text-gray-800"
          />
          <button
            onClick={handleSolveTechnicalProblem}
            className="mt-2 px-4 py-2 bg-black text-white rounded-md"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Solve Technical Problem'}
          </button>
        </div>

        {/* Result and Error Messages */}
        {result && (
          <div className="mt-4 p-4 bg-gray-100 rounded-md text-gray-800 overflow-x-auto max-h-96">
            <pre className="whitespace-pre-wrap">{result}</pre>
          </div>
        )}
        {error && <div className="mt-4 p-4 bg-red-100 text-red-800 rounded-md">{error}</div>}
      </div>
    </div>
  );
}

export default InterviewAssistantComponent;
