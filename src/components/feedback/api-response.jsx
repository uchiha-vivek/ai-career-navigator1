// import React, { useState } from 'react';
// import { AiOutlineLoading3Quarters } from 'react-icons/ai';

// const FeedbackForm = () => {
//   const [formData, setFormData] = useState({
//     job_role: '',
//     job_description: '',
//     interview_question: '',
//     candidate_answer: '',
//   });

//   const [responseData, setResponseData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch('http://127.0.0.1:8000/provide-feedback/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const data = await response.json();
//       setResponseData(data.result);
//     } catch (error) {
//       setError('An error occurred while fetching data.');
//       console.error('Error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-gradient-to-r from-purple-500 to-purple-700 rounded-lg shadow-md">
//       <h1 className="text-3xl font-bold text-white mb-6 text-center">Feedback Form</h1>
//       <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-transparent rounded-lg shadow-lg">
//         <div>
//           <label className="block text-sm font-medium text-white">
//             Job Role:
//             <input
//               type="text"
//               name="job_role"
//               value={formData.job_role}
//               onChange={handleChange}
//               className="mt-1 block w-full p-3 border border-gray-300 rounded-md bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
//               placeholder="Enter job role"
//             />
//           </label>
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-white">
//             Job Description:
//             <textarea
//               name="job_description"
//               value={formData.job_description}
//               onChange={handleChange}
//               rows="4"
//               className="mt-1 block w-full p-3 border border-gray-300 rounded-md bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
//               placeholder="Enter job description"
//             />
//           </label>
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-white">
//             Interview Question:
//             <input
//               type="text"
//               name="interview_question"
//               value={formData.interview_question}
//               onChange={handleChange}
//               className="mt-1 block w-full p-3 border border-gray-300 rounded-md bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
//               placeholder="Enter interview question"
//             />
//           </label>
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-white">
//             Candidate Answer:
//             <textarea
//               name="candidate_answer"
//               value={formData.candidate_answer}
//               onChange={handleChange}
//               rows="4"
//               className="mt-1 block w-full p-3 border border-gray-300 rounded-md bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
//               placeholder="Enter candidate answer"
//             />
//           </label>
//         </div>
//         <button
//           type="submit"
//           className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//           disabled={loading}
//         >
//           {loading ? (
//             <div className="flex items-center justify-center">
//               <AiOutlineLoading3Quarters className="animate-spin h-5 w-5 mr-3" />
//               Submitting...
//             </div>
//           ) : (
//             'Submit'
//           )}
//         </button>
//       </form>

//       {error && (
//         <div className="mt-6 text-red-400">
//           <p>{error}</p>
//         </div>
//       )}

//       {responseData && !error && (
//         <div className="mt-8 p-6 bg-gradient-to-r from-purple-800 to-purple-600 rounded-lg shadow-lg">
//           <h2 className="text-2xl font-semibold text-white mb-4">Response Data</h2>
//           <div>
//             <h3 className="text-lg font-semibold text-white">Candidate's Answer:</h3>
//             <pre className="bg-gray-800 p-4 rounded-md text-white">{responseData.raw}</pre>
//           </div>
//           <div className="mt-4">
//             <h3 className="text-lg font-semibold text-white">Tasks Output:</h3>
//             {responseData.tasks_output.map((task, index) => (
//               <div key={index} className="mt-4">
//                 <h4 className="font-medium text-white">Task {index + 1}</h4>
//                 <p className="text-white"><strong>Description:</strong> {task.description}</p>
//                 <p className="text-white"><strong>Expected Output:</strong> {task.expected_output}</p>
//                 <p className="text-white"><strong>Summary:</strong> {task.summary}</p>
//                 <p className="text-white"><strong>Raw Output:</strong></p>
//                 <pre className="bg-gray-800 p-2 rounded-md text-white">{task.raw}</pre>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FeedbackForm;

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
           
        </div>

        {/* New fields for Interview Question and Candidate Answer */}
        <div>
          <input
            type="text"
            placeholder="Interview Question"
            value={interviewQuestion}
            onChange={(e) => setInterviewQuestion(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white text-gray-800"
          />
          <input
            type="text"
            placeholder="Candidate Answer"
            value={candidateAnswer}
            onChange={(e) => setCandidateAnswer(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white text-gray-800"
          />
          <button
            onClick={handleProvideFeedback}
            className="mt-2 px-4 py-2 bg-black items-center justify-center text-white rounded-md"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Provide Feedback'}
          </button>
        </div>

        {/* Result and Error Messages */}
        {result && <pre className="mt-4 p-4 bg-gray-100 rounded-md text-gray-800">{result}</pre>}
        {error && <div className="mt-4 p-4 bg-red-100 text-red-800 rounded-md">{error}</div>}
      </div>
    </div>
  );
}

export default InterviewAssistantComponent;
