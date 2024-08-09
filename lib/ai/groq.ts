import { createOpenAI } from '@ai-sdk/openai';

const groq = createOpenAI({
	baseURL: process.env?.GROQ_API_URL || '',
	apiKey: process.env?.GROQ_API_KEY || '',
    compatibility: 'compatible',

});

export default groq;
