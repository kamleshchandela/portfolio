
import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = "AIzaSyDClCSS2E9gIj0IW6-yFgVyj_DCm_7ry8g";

async function run() {
    const genAI = new GoogleGenerativeAI(apiKey);

    try {
        // For some keys/regions, listModels might not be directly available or might behave differently.
        // But let's try to infer from a simple generation which one works.

        const modelsToTry = ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-1.0-pro", "gemini-pro"];

        console.log("Testing models...");

        for (const modelName of modelsToTry) {
            console.log(`\nTesting ${modelName}...`);
            try {
                const model = genAI.getGenerativeModel({ model: modelName });
                const result = await model.generateContent("Hi");
                const response = await result.response;
                console.log(`SUCCESS: ${modelName} works!`);
                console.log("Response:", response.text());
                return; // We found a working one
            } catch (e) {
                console.log(`FAILED: ${modelName} - ${e.message}`);
            }
        }

        console.log("\nNo models worked with this key.");

    } catch (error) {
        console.error("Error:", error);
    }
}

run();
