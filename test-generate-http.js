const apiKey = "AIzaSyC0ioD6m3Vy04iHbQD_La-j8Kzj8FFKIDg";
const model = "gemini-2.0-flash";

async function run() {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const data = {
        contents: [{
            parts: [{ text: "Hello, world!" }]
        }]
    };

    try {
        console.log(`Sending request to: ${url}`);
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            console.error(`HTTP Error: ${response.status} ${response.statusText}`);
            const errorText = await response.text();
            console.error("Error Details:", errorText);
            return;
        }

        const result = await response.json();
        console.log("SUCCESS: Generated content!");
        console.log(JSON.stringify(result, null, 2));

    } catch (error) {
        console.error("Fetch Error:", error);
    }
}

run();
