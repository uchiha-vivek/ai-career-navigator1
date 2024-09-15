import OpenAI from 'openai'; // Assuming Upstage AI is initialized the same way

// Initialize Upstage AI with the API key and base URL
const apiKey = 'up_883OJjJ3CDTfEgYyZOE9UaOzeWCEd'; // Replace with your actual Upstage API key
const upstage = new OpenAI({
  apiKey: apiKey,
  baseURL: 'https://api.upstage.ai/v1/solar' // Use the correct Upstage API endpoint
});

// Agent Class
class Agent {
  constructor(role, goal, backstory, verbose) {
    this.role = role;
    this.goal = goal;
    this.backstory = backstory;
    this.verbose = verbose;
  }

  async callAPI(taskDescription) {
    try {
      // Make API request using Upstage AI
      const chatCompletion = await upstage.chat.completions.create({
        model: 'solar-pro', // Assuming this is the model in Upstage AI
        messages: [
          {
            role: 'system',
            content: this.backstory,
          },
          {
            role: 'user',
            content: taskDescription,
          },
        ],
        stream: false, // Change to true if you want real-time streaming
      });

      // Assuming Upstage AI's response format is similar to OpenAI's
      return chatCompletion.choices[0]?.message?.content || '';
    } catch (error) {
      console.error(`Error in agent ${this.role}:`, error);
      return 'Error occurred';
    }
  }
}

// Task Class
class Task {
  constructor(description, expectedOutput, agent) {
    this.description = description;
    this.expectedOutput = expectedOutput;
    this.agent = agent;
  }

  async executeTask(inputs) {
    const taskDescription = this.description.replace(/\{(\w+)\}/g, (_, key) => inputs[key]);
    return await this.agent.callAPI(taskDescription);
  }
}

// InterviewAssistant Class
class InterviewAssistant {
  constructor() {
    // Initialize agents with their respective roles and goals
    this.questionGeneratorAgent = new Agent(
      'Interview Question Generator',
      'Generate relevant and challenging interview questions based on the job role.',
      'You are an expert in interview preparation...',
      true
    );

    this.resumeAgent = new Agent(
      'Resume Screener',
      'Analyze resumes and provide feedback on relevance to the job role.',
      'You are an expert in resume screening...',
      true
    );

    this.feedbackAgent = new Agent(
      'Interview Feedback Specialist',
      'Provide constructive and detailed feedback on interview answers.',
      'You are an expert in interview feedback...',
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

  async analyzeResume(resumeData, jobRole) {
    const resumeTask = new Task(
      'Analyze the resume and provide feedback based on the job role: {job_role}\nResume: {resume_data}',
      'Detailed feedback on the resume relevance.',
      this.resumeAgent
    );
    return await resumeTask.executeTask({ job_role: jobRole, resume_data: resumeData });
  }

  async provideFeedback(interviewQuestion, candidateAnswer) {
    const feedbackTask = new Task(
      'Provide feedback for the following question: {interview_question}\nAnswer: {candidate_answer}',
      'Constructive feedback on the candidate\'s answer.',
      this.feedbackAgent
    );
    return await feedbackTask.executeTask({
      interview_question: interviewQuestion,
      candidate_answer: candidateAnswer,
    });
  }
}

// Example usage
async function main() {
  const assistant = new InterviewAssistant();

  // Generate Interview Questions
  const questions = await assistant.generateInterviewQuestions(
    'JavaScript Developer',
    'A developer responsible for building dynamic web applications.'
  );
  console.log('Generated Questions:', questions);

  // Analyze Resume
  const resumeFeedback = await assistant.analyzeResume(
    'John Doe\'s resume with experience in frontend development...',
    'JavaScript Developer'
  );
  console.log('Resume Feedback:', resumeFeedback);

  // Provide Feedback on an Interview Answer
  const feedback = await assistant.provideFeedback(
    'What are JavaScript closures?',
    'Closures are a function combined with references to its lexical environment...'
  );
  console.log('Feedback on Answer:', feedback);
}

// Execute the main function
main();
