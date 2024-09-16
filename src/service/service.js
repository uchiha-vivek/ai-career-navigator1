// services/interviewAssistantService.js
import axios from 'axios';

const API_KEY = "up_4cNh3N2oiXa2H7oFbk1ivxbwVClsI" ;
const BASE_URL = 'https://api.upstage.ai/v1/solar';

const callUpstageAI = async (agentRole, taskDescription, inputData) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/chat/completions`,
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
                    Authorization: `Bearer ${API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        throw new Error('Error occurred while processing the request.');
    }
};

export const generateInterviewQuestions = async (jobRole, jobDescription) => {
    const taskDescription = `Generate a set of interview questions based on the following job role: {job_role}, and job description: {job_description}`;
    return await callUpstageAI('Interview Question Generator', taskDescription, {
        job_role: jobRole,
        job_description: jobDescription
    });
};

export const analyzeResume = async (resumeData, jobDescription) => {
    const taskDescription = `Analyze the resume and job description: {job_description}, and provide feedback on relevance. Resume: {resume_data}`;
    return await callUpstageAI('Resume Screener', taskDescription, {
        resume_data: resumeData,
        job_description: jobDescription
    });
};

export const provideFeedback = async (interviewQuestion, candidateAnswer) => {
    const taskDescription = `Review the following interview question: {interview_question}, and provide feedback on the answer: {candidate_answer}`;
    return await callUpstageAI('Interview Feedback Specialist', taskDescription, {
        interview_question: interviewQuestion,
        candidate_answer: candidateAnswer
    });
};

export const optimizeLinkedInProfile = async (profileData) => {
    const taskDescription = `Analyze the LinkedIn profile: {profile_data} and provide suggestions for optimization.`;
    return await callUpstageAI('LinkedIn Profile Optimizer', taskDescription, {
        profile_data: profileData
    });
};

export const solveTechnicalProblem = async (criteria) => {
    const taskDescription = `Generate and solve a technical problem based on the following criteria: {criteria}`;
    return await callUpstageAI('Technical Problem Solver', taskDescription, {
        criteria: criteria
    });
};

export const handleInterviewFlow = async (jobRole, jobDescription, interviewQuestion, candidateAnswer) => {
    const taskDescription = `Handle the interview question flow: generate a question, evaluate the answer, and provide feedback. 
                             Job role: {job_role}, 
                             Job description: {job_description}, 
                             Question: {interview_question}, 
                             Answer: {candidate_answer}`;
    return await callUpstageAI('Interview Question Flow Specialist', taskDescription, {
        job_role: jobRole,
        job_description: jobDescription,
        interview_question: interviewQuestion,
        candidate_answer: candidateAnswer
    });
};
