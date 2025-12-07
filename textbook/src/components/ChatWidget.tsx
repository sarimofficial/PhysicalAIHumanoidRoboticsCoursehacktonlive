import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './ChatWidget.module.css';

const ChatWidget = () => {
    const [selectedText, setSelectedText] = useState('');
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handleMouseUp = () => {
            const selection = window.getSelection()?.toString();
            if (selection && selection.length > 0) {
                setSelectedText(selection);
                if (!isOpen) setIsOpen(true); // Auto-open on selection
            }
        };

        document.addEventListener('mouseup', handleMouseUp);
        return () => document.removeEventListener('mouseup', handleMouseUp);
    }, [isOpen]);

    const sendQuery = async () => {
        if (!question.trim()) return;

        setLoading(true);
        try {
            // Note: Ensure backend is running on port 8000 and proxy is configured or CORS allows this
            // For now, we assume a proxy or direct call. 
            // If using direct call to different port, use full URL: http://localhost:8000/query
            // But user code said '/api/query'. We will try that first.
            const res = await axios.post('http://localhost:8000/query', {
                question,
                selected_text: selectedText
            });
            setAnswer(res.data.answer);
        } catch (error) {
            console.error(error);
            setAnswer('Error connecting to AI assistant.');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) {
        return (
            <button className={styles.toggleBtn} onClick={() => setIsOpen(true)}>
                💬
            </button>
        );
    }

    return (
        <div className={styles.chatWidget}>
            <div className={styles.header} onClick={() => setIsOpen(false)}>
                <span>AI Assistant</span>
                <span>▼</span>
            </div>
            <div className={styles.body}>
                <div className={styles.messagesArea}>
                    {selectedText && (
                        <div className={styles.contextInfo}>
                            Context: "{selectedText.substring(0, 30)}..."
                        </div>
                    )}
                    {answer ? (
                        <div className={styles.answer}>{answer}</div>
                    ) : (
                        <div className={styles.placeholder}>
                            👋 Hi! Select text in the book to ask specific questions, or just ask me anything!
                        </div>
                    )}
                </div>

                <div className={styles.inputGroup}>
                    <input
                        className={styles.input}
                        value={question}
                        onChange={e => setQuestion(e.target.value)}
                        placeholder="Ask a question..."
                        onKeyDown={e => e.key === 'Enter' && sendQuery()}
                    />
                    <button className={styles.sendBtn} onClick={sendQuery} disabled={loading}>
                        {loading ? '...' : 'Ask'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatWidget;
