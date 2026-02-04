
import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = "AIzaSyC0ioD6m3Vy04iHbQD_La-j8Kzj8FFKIDg";

async function run() {
    const genAI = new GoogleGenerativeAI(apiKey);

    try {
        // For some keys/regions, listModels might not be directly available or might behave differently.
        // But let's try to infer from a simple generation which one works.

        const modelsToTry = ["models/gemini-2.0-flash", "gemini-2.0-flash", "gemini-1.5-flash"];

        console.log("Testing models...");

        for (const modelName of modelsToTry) {
            console.log(`\nTesting ${modelName}...`);
            try {
                const model = genAI.getGenerativeModel({ model: modelName }, { apiVersion: 'v1beta' });
                const result = await model.generateContent("Hi");
                const response = await result.response;
                console.log(`SUCCESS: ${modelName} works!`);
                console.log("Response:", response.text());
                return; // We found a working one
            } catch (e) {
                console.log(`FAILED: ${modelName}`);
                console.error(JSON.stringify(e, Object.getOwnPropertyNames(e), 2));
            }
        }

        console.log("\nNo models worked with this key.");

    } catch (error) {
        console.error("Error:", error);
    }
}

run();
