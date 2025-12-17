import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import styles from './ChatWidget.module.css';

type ChatMessage = {
    role: 'user' | 'assistant';
    content: string;
};

const ChatWidget = () => {
    const [selectedText, setSelectedText] = useState('');
    const [question, setQuestion] = useState('');
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const widgetRef = useRef<HTMLDivElement>(null);

    // ----------- TEXT SELECTION (FIXED) -----------
    useEffect(() => {
        const handleMouseUp = () => {
            setTimeout(() => {
                const selection = window.getSelection();
                if (!selection) return;

                const text = selection.toString().trim();
                if (!text) return;

                const anchorNode = selection.anchorNode;
                const element =
                    anchorNode instanceof Element
                        ? anchorNode
                        : anchorNode?.parentElement;

                if (!element) return;

                if (
                    element.closest('input') ||
                    element.closest('textarea') ||
                    widgetRef.current?.contains(element)
                ) {
                    return;
                }

                setSelectedText(text);
                setIsOpen(true);
                sendAutoQuery(text);

                selection.removeAllRanges(); // optional UX improvement
            }, 50);
        };

        document.addEventListener('mouseup', handleMouseUp);
        return () => document.removeEventListener('mouseup', handleMouseUp);
    }, []);

    const sendAutoQuery = async (text: string) => {
        const autoQuestion = 'Explain the selected text';

        const userMsg: ChatMessage = {
            role: 'user',
            content: autoQuestion,
        };

        const thinkingMsg: ChatMessage = {
            role: 'assistant',
            content: 'Thinking',
        };

        setMessages(prev => [...prev, userMsg, thinkingMsg]);
        setLoading(true);

        try {
            const res = await axios.post('http://localhost:8000/query', {
                question: autoQuestion,
                selected_text: text,
                history: [...messages, userMsg],
            });

            setMessages(prev => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                    role: 'assistant',
                    content: res.data.answer,
                };
                return updated;
            });
        } catch {
            setMessages(prev => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                    role: 'assistant',
                    content: 'Error connecting to AI.',
                };
                return updated;
            });
        } finally {
            setLoading(false);
        }
    };



    // ----------- SEND MESSAGE -----------
    const sendQuery = async () => {
        if (!question.trim()) return;

        const userMsg: ChatMessage = { role: 'user', content: question };
        const thinkingMsg: ChatMessage = { role: 'assistant', content: 'Thinking' };

        setMessages(prev => [...prev, userMsg, thinkingMsg]);
        setQuestion('');
        setLoading(true);

        try {
            const res = await axios.post('http://localhost:8000/query', {
                question,
                selected_text: selectedText,
                history: [...messages, userMsg],
            });

            setMessages(prev => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                    role: 'assistant',
                    content: res.data.answer,
                };
                return updated;
            });
        } catch {
            setMessages(prev => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                    role: 'assistant',
                    content: 'Error connecting to AI.',
                };
                return updated;
            });
        } finally {
            setLoading(false);
        }
    };

    // ----------- CLOSED STATE -----------
    if (!isOpen) {
        return (
            <button className={styles.toggleBtn} onClick={() => setIsOpen(true)}>
                💬
            </button>
        );
    }

    // ----------- UI -----------
    return (
        <div className={styles.chatWidget} ref={widgetRef}>
            <div className={styles.header} onClick={() => setIsOpen(false)}>
                <span>AI Assistant</span>
                <span>▼</span>
            </div>

            <div className={styles.body}>
                {selectedText && (
                    <div className={styles.contextInfo}>
                        Context: “{selectedText.slice(0, 60)}…”
                    </div>
                )}

                <div className={styles.messagesArea}>
                    {messages.length === 0 && (
                        <div className={styles.placeholder}>
                            Select text or ask a question to begin.
                        </div>
                    )}

                    {messages.map((msg, idx) => (
                        <div
                            key={idx}
                            className={
                                msg.role === 'user'
                                    ? styles.userMsg
                                    : styles.aiMsg
                            }
                        >
                            {msg.content}
                        </div>
                    ))}
                </div>

                <div className={styles.inputGroup}>
                    <input
                        className={styles.input}
                        value={question}
                        onChange={e => setQuestion(e.target.value)}
                        placeholder="Ask a question…"
                        onKeyDown={e => e.key === 'Enter' && sendQuery()}
                        disabled={loading}
                    />
                    <button
                        className={styles.sendBtn}
                        onClick={sendQuery}
                        disabled={loading}
                    >
                        {loading ? '…' : 'Ask'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatWidget;
