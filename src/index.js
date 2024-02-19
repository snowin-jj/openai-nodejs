import OpenAI from 'openai';
import 'dotenv/config';
import data from './data.json' assert { type: 'json' };

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const results = await openai.chat.completions.create({
  model: 'gpt-3.5-turbo',
  messages: [
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
    {
      role: 'user',
      content:
        "What can I do next? I don't have any idea. Just now I finished my school. Help me to find a perfect profession that suits me.",
    },
  ],
});

console.log(results.choices[0]);
