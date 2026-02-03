import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot, Key, Loader2 } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import ReactMarkdown from 'react-markdown';
import { portfolioData } from '../utils/portfolioData';
import './ChatBot.css';

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { type: 'ai', content: "Hi! I'm Kamlesh's AI Assistant. Ask me anything about his projects, skills, or experience!" }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // User requested to use their key for everyone.
    const API_KEY = "AIzaSyDClCSS2E9gIj0IW6-yFgVyj_DCm_7ry8g";

    const messagesEndRef = useRef(null);

    // Quick Suggestions
    const suggestions = [
        "What are your skills?",
        "Tell me about your projects",
        "How can I contact Kamlesh?",
        "Do you have any certifications?",
        "What is your experience?"
    ];

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    // Helper to pause execution
    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const processMessage = async (messageText) => {
        if (!messageText.trim()) return;

        const userMessage = messageText.trim();
        setInput('');
        setMessages(prev => [...prev, { type: 'user', content: userMessage }]);
        setIsLoading(true);

        // Optimized order: Flash 1.5 -> Pro 1.5 (Backup Quota) -> Flash 2.0
        const modelsToTry = [
            "gemini-1.5-flash",
            "gemini-1.5-pro",
            "gemini-2.0-flash",
            "gemini-1.5-flash-8b"
        ];

        let success = false;
        let lastError = null;

        // We will add the message only when the first chunk arrives to avoid "double bubbles"

        for (const modelName of modelsToTry) {
            try {
                const genAI = new GoogleGenerativeAI(API_KEY);
                const model = genAI.getGenerativeModel({ model: modelName });

                const chat = model.startChat({
                    history: [
                        {
                            role: "user",
                            parts: [{ text: portfolioData + "\n\nIMPORTANT: You are an helpful AI assistant for Kamlesh's Portfolio. Answer questions based on the info above. Use Markdown formatting (bold, lists) to make answers easy to read. Keep it concise." }],
                        },
                        {
                            role: "model",
                            parts: [{ text: "Understood. I will answer professionally using Markdown." }],
                        },
                    ],
                });

                // USE STREAMING for instant feedback
                try {
                    const result = await chat.sendMessageStream(userMessage);
                    let fullText = "";
                    let isFirstChunk = true;

                    for await (const chunk of result.stream) {
                        const chunkText = chunk.text();
                        fullText += chunkText;

                        if (isFirstChunk) {
                            setIsLoading(false); // Hide dots
                            // Create the message NOW, with the first chunk of text
                            setMessages(prev => [...prev, { type: 'ai', content: fullText }]);
                            isFirstChunk = false;
                        } else {
                            // Update the existing message
                            setMessages(prev => {
                                const newMessages = [...prev];
                                newMessages[newMessages.length - 1] = { type: 'ai', content: fullText };
                                return newMessages;
                            });
                        }
                    }
                    success = true;
                    break;
                } catch (streamError) {
                    console.warn(`Streaming failed for ${modelName}, trying standard request...`);
                    // Fallback
                    const result = await chat.sendMessage(userMessage);
                    const response = await result.response;
                    const text = response.text();

                    setIsLoading(false);
                    setMessages(prev => [...prev, { type: 'ai', content: text }]);

                    success = true;
                    break;
                }
            } catch (error) {
                console.warn(`Model ${modelName} failed:`, error.message);
                lastError = error;
                if (error.message.includes("429")) {
                    await wait(1000);
                }
            }
        }

        if (!success) {
            console.error("All attempts failed:", lastError);
            let errorMessage = "Sorry, I'm having trouble connecting right now.";

            if (lastError && lastError.message && lastError.message.includes("429")) {
                errorMessage = "I'm receiving too many messages right now. Please wait 1 minute before trying again.";
            }

            // Ensure loader is off if we failed
            setIsLoading(false);
            setMessages(prev => [...prev, { type: 'system', content: errorMessage }]);
        }
    };

    const handleSend = (e) => {
        e.preventDefault();
        processMessage(input);
    };

    const handleSuggestionClick = (text) => {
        processMessage(text);
    };

    return (
        <div className="chatbot-container">
            {isOpen && (
                <div className="chatbot-window">
                    <div className="chatbot-header">
                        <div className="chatbot-title">
                            <Bot size={20} />
                            <span>Portfolio AI</span>
                        </div>
                        <div style={{ display: 'flex', gap: '5px' }}>
                            <button onClick={() => setIsOpen(false)} className="close-btn">
                                <X size={20} />
                            </button>
                        </div>
                    </div>

                    <div className="chatbot-messages">
                        {messages.map((msg, index) => (
                            <div key={index} className={`message ${msg.type}`}>
                                {msg.type === 'ai' ? (
                                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                                ) : (
                                    msg.content
                                )}
                            </div>
                        ))}
                        {isLoading && (
                            <div className="message ai">
                                <div className="typing-dot"></div>
                                <div className="typing-dot"></div>
                                <div className="typing-dot"></div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {!isLoading && (
                        <div className="suggestions-container">
                            {suggestions.map((suggestion, index) => (
                                <button
                                    key={index}
                                    className="suggestion-chip"
                                    onClick={() => handleSuggestionClick(suggestion)}
                                >
                                    {suggestion}
                                </button>
                            ))}
                        </div>
                    )}

                    <form className="chatbot-input-area" onSubmit={handleSend}>
                        <input
                            type="text"
                            className="chatbot-input"
                            placeholder="Ask about Kamlesh..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            disabled={isLoading}
                        />
                        <button type="submit" className="chatbot-send" disabled={isLoading || !input.trim()}>
                            <Send size={18} />
                        </button>
                    </form>
                </div>
            )}

            <button className="chatbot-toggle" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
            </button>
        </div>
    );
};

export default ChatBot;
