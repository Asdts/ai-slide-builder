/* eslint-disable @typescript-eslint/no-explicit-any */
// src/slides/agents/baseAgent.ts
// created by ASDTS
// This file is part of the Gemini Agent project.

import { llm } from "@/connection/genAi"
export abstract class BaseAgent {
  abstract NAME: string

  protected abstract authPrompt(...args: any[]): string

  getGeminiMessages(...args: any[]): any {
    return this.authPrompt(...args)
  }

  async getAction(generatedText: string): Promise<any> {
    try {
      return await llm({prompt:generatedText});
    } catch (err) {
       console.error("Error parsing action:",this.NAME, err)
    }
  }
}
