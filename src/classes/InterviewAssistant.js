import OpenAI from 'openai'; // Ensure correct import

 
const upstage = new OpenAI({
  apiKey: 'up_883OJjJ3CDTfEgYyZOE9UaOzeWCEd',
  baseURL: 'https://api.upstage.ai/v1/solar',
  dangerouslyAllowBrowser: true
});

// Define Agent Class
class Agent {
  constructor(role, goal, backstory, verbose) {
    this.role = role;
    this.goal = goal;
    this.backstory = backstory;
    this.verbose = verbose;
  }

  async callAPI(taskDescription) {
    try {
      const chatCompletion = await upstage.chat.completions.create({
        model: 'solar-pro',
        messages: [
          { role: 'system', content: this.backstory },
          { role: 'user', content: taskDescription },
        ],
        stream: false
      });
      return chatCompletion.choices[0]?.message?.content || '';
    } catch (error) {
      console.error(`Error in agent ${this.role}:`, error);
      return 'Error occurred';
    }
  }
}

// Define Task Class
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

// Define InterviewAssistant Class
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
    return await questionGenerationTask.executeTask({
      job_role: jobRole,
      job_description: jobDescription
    });
  }
}
export default InterviewAssistant