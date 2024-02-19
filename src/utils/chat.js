import { openai } from '../lib/openapi.js';
import readline from 'node:readline';

import data from '../data.json' assert { type: 'json' };

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const newMessage = async (history, message) => {
  const chatCompletion = await openai.chat.completions.create({
    messages: [...history, message],
    model: 'gpt-3.5-turbo',
  });

  return chatCompletion.choices[0].message;
};

const formatMessage = (userInput) => ({ role: 'user', content: userInput });

export const chat = async () => {
  const history = [
    {
      role: 'system',
      content:
        "You are an AI assistant, You help people to find their interest, goals, learning interest, and also help them by motivating. You're like a guide to them for their life. Answer any questions to the best your ability.",
    },
    {
      role: 'system',
      content: `Here are the 20 questions and answers to any psychology test of the user. Based on the responses, guide him/her to find a path for my future. And tell him/her, what can he/she do next? what field best suits him/her?. User Responses for the psychological test: ${JSON.stringify(
        data
      )}`,
    },
  ];

  const start = () => {
    rl.question('You: ', async (userInput) => {
      if (userInput.toLowerCase() === 'exit') {
        rl.close();
        return;
      }

      const userMessage = formatMessage(userInput);
      const response = await newMessage(history, userMessage);

      history.push(userMessage, response);
      console.log(`\n\nAI: ${response.content}\n\n`);
      start();
    });
  };

  const response = await newMessage(
    history,
    formatMessage(
      'What should I do next? Help me to choose my profession that suits my interests and mental state.'
    )
  );
  // console.log('\n\nAI: How can I help you today?\n\n');
  console.log(`\n\nAI: ${response.content}\n\n`);
  start();
};
