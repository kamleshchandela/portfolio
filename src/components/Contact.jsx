import React, { useState, useRef } from 'react';
import { Mail, Linkedin, Github, Send, Phone, Code } from 'lucide-react';
import emailjs from '@emailjs/browser';
import './Contact.css';

const Contact = () => {
    const form = useRef();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('sending');

        emailjs.sendForm(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            form.current,
            {
                publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
            }
        )
            .then(
                () => {
                    setStatus('success');
                    setFormData({ name: '', email: '', message: '' });
                    setTimeout(() => setStatus(''), 3000);
                },
                (error) => {
                    console.error('FAILED...', error.text);
                    setStatus('error');
                    setTimeout(() => setStatus(''), 3000);
                },
            );
    };

    return (
        <section id="contact" className="contact-section">
            <h2 className="section-title">Let's <span className="highlight">Connect</span></h2>

            <div className="contact-container">
                <div className="contact-info">
                    <h3 className="contact-heading">Get in touch</h3>
                    <p className="contact-text">
                        Have a project in mind or just want to say hi?
                        My inbox is open for new opportunities.
                    </p>

                    <div className="contact-links">
                        <a href="mailto:chandelakamlesh3@gmail.com" className="contact-social"><Mail /> <span>kamlesh.b.chandela.cg@gmail.com</span></a>
                        <a href="tel:+919979265140" className="contact-social"><Phone /> <span>9979265140</span></a>
                        <a target='_blank' href="https://www.linkedin.com/in/kamlesh-chandela/" className="contact-social"><Linkedin /> <span>Kamlesh Chandela</span></a>
                        <a target='_blank' href="https://github.com/kamleshchandela" className="contact-social"><Github /> <span>Kamlesh Chandela</span></a>
                        <a target='_blank' href="https://leetcode.com/u/KamleshChandela/" className="contact-social"><Code /> <span>LeetCode Profile</span></a>
                    </div>
                </div>

                <form className="contact-form card-glass" ref={form} onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="John Doe"
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="john@gmail.com"
                        />
                    </div>
                    <div className="form-group">
                        <label>Message</label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            placeholder="Your message..."
                            rows="5"
                        ></textarea>
                    </div>

                    <button type="submit" className="submit-btn">
                        {status === 'sending' ? 'Sending...' : (status === 'success' ? 'Message Sent!' : status === 'error' ? 'Failed to Send' : <><Send size={18} /> Send Message</>)}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Contact;
