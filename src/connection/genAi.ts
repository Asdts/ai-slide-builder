/* eslint-disable @typescript-eslint/no-explicit-any */
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API || '' );

const model = genAI.getGenerativeModel({ model :process.env.GOOGLE_MODEL || 'gemini-2.0-flash'});

const llm = async (prompt:any) => {
    return await model.generateContent(prompt);
}

const apillm = async (prompt:any,apiKey:any) => {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model :process.env.GOOGLE_MODEL || 'gemini-2.0-flash'});
    return await model.generateContent(prompt);
}
export {apillm , llm};