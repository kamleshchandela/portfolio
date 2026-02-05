
import { GoogleGenerativeAI } from '@google/generative-ai';

// Key from .env
const apiKey = "AIzaSyC0ioD6m3Vy04iHbQD_La-j8Kzj8FFKIDg";

async function run() {
    const genAI = new GoogleGenerativeAI(apiKey);
    console.log("Testing gemini-1.5-flash with key ending in: " + apiKey.slice(-4));

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent("Hello");
        console.log("SUCCESS");
        console.log(result.response.text());
    } catch (e) {
        console.log("FAILURE");
        console.log(e.message);
    }
}

run();
