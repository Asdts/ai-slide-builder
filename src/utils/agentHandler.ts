/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { AgentRegistry } from "@/slides/agents/registry";

export async function handleAgentRequest(
    body: any,
    agentKey: keyof typeof AgentRegistry,
    extractArgs: (body: any) => any[]
  ) {
    const AgentClass = AgentRegistry[agentKey];
    if (!AgentClass) {
      return NextResponse.json({ error: `Agent '${agentKey}' not found` }, { status: 400 });
    }
    console.log("AgentClass", AgentClass);
    const agent = new AgentClass();
    const prompt = agent.getGeminiMessages(...extractArgs(body));
    console.log("Prompt", prompt);
    const rawResult = await agent.getAction(prompt);
    console.log("Raw result", rawResult);
  
    let result: string;
  
    if (rawResult?.response?.text && typeof rawResult.response.text === 'function') {
      result = await rawResult.response.text();
    } else if (rawResult?.text && typeof rawResult.text === 'function') {
      result = await rawResult.text();
    } else if (typeof rawResult === 'string') {
      result = rawResult;
    } else {
      result = JSON.stringify(rawResult);
    }

    console.log("Final result", result);
    return result; // not a Response object
  }
  