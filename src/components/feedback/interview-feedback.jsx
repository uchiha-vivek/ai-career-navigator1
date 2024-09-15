import React, { useState } from "react";
import axios from "axios";

const ProvideFeedback = () => {
  const [formData, setFormData] = useState({
    jobRole: "",
    jobDescription: "",
    interviewQuestion: "",
    candidateAnswer: ""
  });

  const [feedback, setFeedback] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/provide-feedback/", {
        job_role: formData.jobRole,
        job_description: formData.jobDescription,
        interview_question: formData.interviewQuestion,
        candidate_answer: formData.candidateAnswer
      });
      setFeedback(response.data.result);
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-5 bg-white shadow-md">
      <h1 className="text-2xl font-semibold mb-4">Provide Interview Feedback</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium">Job Role</label>
          <input
            type="text"
            name="jobRole"
            value={formData.jobRole}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Job Description</label>
          <textarea
            name="jobDescription"
            value={formData.jobDescription}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Interview Question</label>
          <textarea
            name="interviewQuestion"
            value={formData.interviewQuestion}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Candidate Answer</label>
          <textarea
            name="candidateAnswer"
            value={formData.candidateAnswer}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Submit Feedback
        </button>
      </form>
      {feedback && (
        <div className="mt-5 p-4 bg-green-100 rounded">
          <h2 className="text-lg font-semibold">Feedback</h2>
          <p>{feedback}</p>
        </div>
      )}
    </div>
  );
};

export default ProvideFeedback;
