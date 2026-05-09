import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot, Key, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import './ChatBot.css';

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { type: 'ai', content: "Hi! I am **Kamlesh's Personal AI**. I can answer anything about his skills, projects, or experience without needing internet or API keys! Try asking me something." }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const messagesEndRef = useRef(null);

    // Quick Suggestions
    const suggestions = [
        "What are your top skills?",
        "Tell me about your projects",
        "How can I contact you?",
        "Do you have any experience?",
        "What hackathons did you win?"
    ];

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    // Advanced Custom Offline NLP & Scoring Engine
    const getAiResponse = (text) => {
        const query = text.toLowerCase().replace(/[^\w\s]/gi, ''); // remove punctuation
        const words = query.split(' ').filter(w => w.length > 2); // get meaningful words
        
        // Extended Knowledge Base mapped from kamlesh portfolio
        const knowledgeBase = [
            {
                intent: 'greeting',
                keywords: ['hello', 'hi', 'hey', 'greetings', 'namaste', 'morning', 'afternoon'],
                answer: "Hello! 👋 I am **Kamlesh's Personal AI**. I don't use any external API keys to function! I can answer anything about his **Skills**, **Projects**, **Contact Info**, or **Certifications**."
            },
            {
                intent: 'contact',
                keywords: ['contact', 'hire', 'email', 'phone', 'reach', 'touch', 'call', 'number', 'whatsapp', 'linkedin', 'github', 'leetcode'],
                answer: "📬 **Contact Kamlesh**:\n\n- **Email**: kamlesh.b.chandela.cg@gmail.com\n- **Phone**: +91 9979265140\n- **LinkedIn**: [Kamlesh Chandela](https://www.linkedin.com/in/kamlesh-chandela/)\n- **GitHub**: [kamleshchandela](https://github.com/kamleshchandela)\n- **LeetCode**: [KamleshChandela](https://leetcode.com/u/KamleshChandela/)"
            },
            {
                intent: 'skills',
                keywords: ['skill', 'tech', 'stack', 'know', 'react', 'frontend', 'language', 'css', 'html', 'javascript', 'figma', 'design', 'database', 'tools'],
                answer: "💻 **Kamlesh's Skillset**:\n\n- **Languages**: HTML, CSS, JavaScript, C Language\n- **Frameworks/Libraries**: React.js, Custom API Integration\n- **Database**: MongoDB\n- **Tools**: Figma, Git, GitHub\n- **Core Strength**: UI/UX Design, Cinematic web experiences, and Full Stack Development."
            },
            {
                intent: 'projects_main',
                keywords: ['project', 'build', 'built', 'work', 'fasal', 'dangal', 'terra', 'portfolio', 'clone', 'website'],
                answer: "🚀 **Top Projects**:\n\nKamlesh has built numerous high-performance web apps:\n1. **DimagDangal**: Competitive premium quiz platform.\n2. **Team Terra**: KBC-style interactive web experience.\n3. **Fasal Rakshak**: AI-based Crop Disease Detection UI for farmers.\n\nHe has also built massive clones of **Taj Hotel**, **Cars24**, **Nansen**, and **Peak Design**! Check the Projects section for live links."
            },
            {
                intent: 'experience',
                keywords: ['experience', 'job', 'intern', 'work', 'google', 'apple', 'meta', 'role', 'engineer'],
                answer: "📈 **Experience**:\n\nKamlesh is a passionate **Full Stack Developer** and **UI/UX Designer**. He has strong experience in building complex, production-grade applications from scratch, focusing on aesthetic, dynamic frontend interfaces."
            },
            {
                intent: 'certifications',
                keywords: ['hackathon', 'win', 'award', 'prize', 'compete', 'certificate', 'certification', 'jpmorgan', 'walmart', 'aws'],
                answer: "🏆 **Certifications & Achievements**:\n\nKamlesh has completed rigorous Job Simulations including:\n- **Software Engineering** at JPMorgan Chase & Co.\n- **Software Architecture** at AWS\n- **Advanced Software Eng.** at Walmart Global Tech\n- **Code Contest** at Enginow"
            },
            {
                intent: 'about',
                keywords: ['about kamlesh', 'who is', 'background', 'thinker', 'artisan', 'do', 'role'],
                answer: "👨‍💻 **About Kamlesh Chandela**:\n\nKamlesh is a Full Stack Developer, UI/UX Designer, Creative Thinker, and Code Artisan. His main tagline is: *'Crafting immersive digital experiences with modern web technologies.'* He specializes in making premium, jaw-dropping UIs like this one!"
            },
            {
                intent: 'clones',
                keywords: ['taj', 'hotel', 'car', 'car24', 'nansen', 'xrp', 'peak', 'harvey', 'tic', 'toe', 'weather', 'news'],
                answer: "⚡ **Project Clones**:\n\nKamlesh has successfully cloned highly complex UIs using pure HTML/CSS/JS, including **Taj Hotel**, **Cars24**, **Nansen**, **XRPL**, **Peak Design**, and **Harvey AI**. He also built **API-driven Weather & News Apps**!"
            },
            {
                intent: 'ai_engine',
                keywords: ['who are you', 'what are you', 'how do you work', 'api', 'model', 'chat', 'bot', 'gemini', 'openai'],
                answer: "🧠 **My Brain**:\n\nI am a **Custom Local NLP Algorithm** built from scratch in exactly 150 lines of JavaScript by Kamlesh. I tokenize your sentences and execute a fuzzy scoring array against his portfolio data. I require **ZERO API Keys**, zero cost, and have no latency!"
            }
        ];

        // Scoring Logic: Find the intent that matches the most words
        let bestMatch = null;
        let highestScore = 0;

        knowledgeBase.forEach(kb => {
            let score = 0;
            // Direct full phrase matching first for high priority
            if (kb.keywords.some(kw => query.includes(kw))) {
                score += 5;
            }
            // Word by word matching
            words.forEach(word => {
                if (kb.keywords.some(kw => kw.includes(word) || word.includes(kw))) {
                    score += 1;
                }
            });

            if (score > highestScore) {
                highestScore = score;
                bestMatch = kb;
            }
        });

        // Threshold for a confident answer
        if (bestMatch && highestScore >= 1) {
            return bestMatch.answer;
        }

        // Default Fallback Response
        return "Kamlesh ne mujhe is specific sawal ke liye train nahi kiya! 🤖 Lekin main uske **Skills**, **Projects**, **Certificates**, aur **Contact Details** (phone/email) bta sakta hu. Aap kya janna chahte hain?";
    };

    const processMessage = async (messageText) => {
        if (!messageText.trim()) return;

        const userMessage = messageText.trim();
        setInput('');
        setMessages(prev => [...prev, { type: 'user', content: userMessage }]);
        setIsLoading(true);

        // Simulate local AI processing delay for realism
        setTimeout(() => {
            setIsLoading(false);
            const responseText = getAiResponse(userMessage);
            setMessages(prev => [...prev, { type: 'ai', content: responseText }]);
        }, 600); // 600ms latency simulation
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
                            <Bot size={18} />
                            <span>Portfolio AI</span>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="close-btn">
                            <X size={16} />
                        </button>
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
