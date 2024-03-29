const { Configuration, OpenAIApi } = require('openai');
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
require('dotenv').config();



const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(
    req: Request
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { prompt, amount = 1, resolution = "512x512" } = body;

        if(!userId) {
            return new NextResponse ("Unauthorized", { status: 401 });
        }

        if(!Configuration.apiKey) {
            return new NextResponse("Open ai key not configured", { status: 500 });
        }

        if(!prompt) {
            return new NextResponse("Prompt is required", { status: 400 });
        }

        if(!amount) {
            return new NextResponse("Amount is required", { status: 400 });
        }

        if(!resolution) {
            return new NextResponse("Resolution is required", { status: 400 });
        }

        const response = await openai.createImage({
            prompt: prompt,
            n: parseInt(amount, 10),
            size: resolution,
        });

        return NextResponse.json(response.data.data)


    } catch (error) {
        console.log("[IMAGE_ERROR]", error);
        return new NextResponse("Interanl Error", { status: 500});
    }
}