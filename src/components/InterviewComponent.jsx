import React, { useState } from 'react';
import InterviewAssistant from '../classes/InterviewAssistant';

function InterviewComponent() {
  const [jobRole, setJobRole] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [questions, setQuestions] = useState([]);

  const assistant = new InterviewAssistant();

  const handleGenerateQuestions = async () => {
    try {
      const result = await assistant.generateInterviewQuestions(jobRole, jobDescription);
      setQuestions(result);
    } catch (error) {
      console.error('Error generating questions:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={jobRole}
        onChange={(e) => setJobRole(e.target.value)}
        placeholder="Job Role"
      />
      <textarea
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        placeholder="Job Description"
      />
      <button onClick={handleGenerateQuestions}>Generate Questions</button>
      <ul>
        {questions.map((question, index) => (
          <li key={index}>{question}</li>
        ))}
      </ul>
    </div>
  );
}

export default InterviewComponent;
