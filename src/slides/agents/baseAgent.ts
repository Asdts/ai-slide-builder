/* eslint-disable @typescript-eslint/no-explicit-any */
// src/slides/agents/baseAgent.ts
// created by ASDTS
// This file is part of the Gemini Agent project.


export abstract class BaseAgent {
  abstract NAME: string

  protected abstract authPrompt(...args: any[]): string

  getGeminiMessages(...args: any[]): any {
    return this.authPrompt(...args)
  }

  getAction(generatedText: string): any {
    try {
      return generatedText
    } catch (err) {
       console.error("Error parsing action:",this.NAME, err)
    }
  }
}
