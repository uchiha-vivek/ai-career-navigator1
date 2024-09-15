const express = require('express');
const bodyParser = require('body-parser');
const OpenAI = require('openai');  // Assuming OpenAI is imported correctly

// Initialize Upstage AI (or OpenAI) with the API key and base URL
const apiKey = 'up_883OJjJ3CDTfEgYyZOE9UaOzeWCEd';  // Replace with actual key
const upstage = new OpenAI({
  apiKey: apiKey,
  baseURL: 'https://api.upstage.ai/v1/solar'
});

// Define Agent, Task, and InterviewAssistant classes (as in your original code)
class Agent {
  // Your Agent class code...
}

class Task {
  // Your Task class code...
}

class InterviewAssistant {
  constructor() {
    this.questionGeneratorAgent = new Agent(
      'Interview Question Generator',
      'Generate relevant and challenging interview questions based on the job role.',
      'You are an expert in interview preparation...',
      true
    );
  }

  async generateInterviewQuestions(jobRole, jobDescription) {
    const questionGenerationTask = new Task(
      'Generate a set of interview questions for the following role: {job_role}\nDescription: {job_description}',
      'A list of relevant interview questions.',
      this.questionGeneratorAgent
    );
    return await questionGenerationTask.executeTask({ job_role: jobRole, job_description: jobDescription });
  }
}

// Initialize the Express app
const app = express();
app.use(bodyParser.json());

// Create an instance of InterviewAssistant
const assistant = new InterviewAssistant();

// Endpoint to generate interview questions
app.post('/generate-interview-questions', async (req, res) => {
  const { jobRole, jobDescription } = req.body;
  try {
    // Call the function on the assistant instance
    const questions = await assistant.generateInterviewQuestions(jobRole, jobDescription);
    res.json({ questions });
  } catch (error) {
    console.error('Error generating interview questions:', error);
    res.status(500).json({ error: error.message });
  }
});

// Start the Express server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
