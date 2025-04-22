/* eslint-disable @typescript-eslint/no-explicit-any */
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '' );

const model = genAI.getGenerativeModel({ model :'gemini-2.0-flash'});

async function llm({ prompt, file }: { prompt: string; file?: File }) {
    let input;
    if(file){
    const buffer = Buffer.from(await file.arrayBuffer());
    const base64 = buffer.toString("base64");
    const mimeType = file?.type || "application/pdf";
    
    input = {
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `Please extract the complete readable and relevant text content from the uploaded document as it is required for ppt creation.`,
              },
              {
                inlineData: {
                  mimeType,
                data: base64,
                },
              },
            ],
          },
        ],
      }
    }else{
        input = prompt;
    }
  
    const result = await model.generateContent(input);
    return result.response.text();
  }
const apillm = async (prompt:any,apiKey:any) => {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model :process.env.GOOGLE_MODEL || 'gemini-2.0-flash'});
    return await model.generateContent(prompt);
}
export {apillm , llm};