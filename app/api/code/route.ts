const { Configuration, OpenAIApi, ChatCompletionRequestMessage } = require('openai');
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
require('dotenv').config();



const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const instructionMessage:typeof ChatCompletionRequestMessage = {
    role: "system",
    content: "You are a code generator. You must answer only in markdown code snippets. Use comments for explanations."
}

export async function POST(
    req: Request
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { messages } = body;

        if(!userId) {
            return new NextResponse ("Unauthorized", { status: 401 });
        }

        if(!Configuration.apiKey) {
            return new NextResponse("Open ai key not configured", { status: 500 });
        }

        if(!messages) {
            return new NextResponse("Messages are required", { status: 400 });
        }

        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [instructionMessage, ...messages]
        })

        return NextResponse.json(response.data.choices[0].message)


    } catch (error) {
        console.log("[CONVERSATION_ERROR]", error);
        return new NextResponse("Interanl Error", { status: 500});
    }
}