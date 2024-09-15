const axios = require('axios');

// Initialize Upstage AI API key and base URL
const API_KEY = 'up_883OJjJ3CDTfEgYyZOE9UaOzeWCEd';
const BASE_URL = 'https://api.upstage.ai/v1/solar';

class InterviewAssistant {
  constructor() {
    this.apiKey = API_KEY;
    this.baseUrl = BASE_URL;
  }

  // Helper function to call Upstage API
  async callUpstageAI(agentRole, taskDescription, inputData) {
    try {
      const response = await axios.post(
        `${this.baseUrl}/chat/completions`,
        {
          model: 'solar-pro',
          messages: [
            {
              role: 'system',
              content: `You are a ${agentRole}.`
            },
            {
              role: 'user',
              content: taskDescription.replace(/\{(.+?)\}/g, (_, key) => inputData[key] || '')
            }
          ]
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      throw new Error('Error occurred while processing the request.');
    }
  }

  // Generate interview questions
  async generateInterviewQuestions(jobRole, jobDescription) {
    const taskDescription = `Generate a set of interview questions based on the following job role: {job_role}, and job description: {job_description}`;
    return await this.callUpstageAI('Interview Question Generator', taskDescription, {
      job_role: jobRole,
      job_description: jobDescription
    });
  }

  // Analyze resume and provide feedback
  async analyzeResume(resumeData, jobDescription) {
    const taskDescription = `Analyze the resume and job description: {job_description}, and provide feedback on relevance. Resume: {resume_data}`;
    return await this.callUpstageAI('Resume Screener', taskDescription, {
      resume_data: resumeData,
      job_description: jobDescription
    });
  }

  // Provide interview feedback
  async provideFeedback(interviewQuestion, candidateAnswer) {
    const taskDescription = `Review the following interview question: {interview_question}, and provide feedback on the answer: {candidate_answer}`;
    return await this.callUpstageAI('Interview Feedback Specialist', taskDescription, {
      interview_question: interviewQuestion,
      candidate_answer: candidateAnswer
    });
  }

  // Optimize LinkedIn profile
  async optimizeLinkedInProfile(profileData) {
    const taskDescription = `Analyze the LinkedIn profile: {profile_data} and provide suggestions for optimization.`;
    return await this.callUpstageAI('LinkedIn Profile Optimizer', taskDescription, {
      profile_data: profileData
    });
  }

  // Solve technical problems
  async solveTechnicalProblem(criteria) {
    const taskDescription = `Generate and solve a technical problem based on the following criteria: {criteria}`;
    return await this.callUpstageAI('Technical Problem Solver', taskDescription, {
      criteria: criteria
    });
  }

  // Complete interview question flow
  async handleInterviewFlow(jobRole, jobDescription, interviewQuestion, candidateAnswer) {
    const taskDescription = `Handle the interview question flow: generate a question, evaluate the answer, and provide feedback. 
                             Job role: {job_role}, 
                             Job description: {job_description}, 
                             Question: {interview_question}, 
                             Answer: {candidate_answer}`;
    return await this.callUpstageAI('Interview Question Flow Specialist', taskDescription, {
      job_role: jobRole,
      job_description: jobDescription,
      interview_question: interviewQuestion,
      candidate_answer: candidateAnswer
    });
  }
}

module.exports = InterviewAssistant;