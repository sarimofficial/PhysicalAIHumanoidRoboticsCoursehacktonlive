import React, { useState, useEffect, useRef } from "react";
import styles from "./ChatbotWidget.module.css";

const ChatbotWidget = ({
  selectedText,
  clearSelectedText,
  initialQuery,
  clearInitialQuery,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [inputPlaceholder, setInputPlaceholder] = useState(
    "Type your question..."
  );
  const chatBodyRef = useRef(null);
  const chatInputRef = useRef(null);

  // Auto-scroll
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [conversation]);

  // Update placeholder
  useEffect(() => {
    setInputPlaceholder(
      selectedText
        ? `Ask about "${selectedText.substring(0, 30)}..."`
        : "Type your question..."
    );
  }, [selectedText]);

  // Focus input
  useEffect(() => {
    if (isOpen || initialQuery) {
      setTimeout(() => chatInputRef.current?.focus(), 100);
    }
  }, [isOpen, initialQuery]);

  // 🔥 Greeting from SAME agent
  useEffect(() => {
    if (isOpen && conversation.length === 0) {
      const timer = setTimeout(() => {
        callApi(""); // greeting from agent
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Populate input with initialQuery but do NOT send
  useEffect(() => {
    if (initialQuery) {
      setIsOpen(true);
      setMessage(initialQuery); // populate input
      clearInitialQuery?.();
    }
  }, [initialQuery]);

  const toggleWidget = () => {
    setIsOpen((prev) => !prev);
    if (!isOpen) setTimeout(() => chatInputRef.current?.focus(), 100);
  };

  const callApi = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        "https://codisfy-rag-chatbot.onrender.com/api/chat",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: query }),
        }
      );

      if (!res.ok) throw new Error("Server error");

      const data = await res.json();
      setConversation((prev) => [
        ...prev,
        { role: "assistant", content: data.response },
      ]);
    } catch (err) {
      setError(err.message || "Error connecting to AI.");
      setConversation((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I cannot answer right now." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setConversation((prev) => [...prev, { role: "user", content: message }]);
    setMessage("");
    clearSelectedText?.();
    setTimeout(() => chatInputRef.current?.focus(), 50);
    await callApi(message);
  };

  return (
    <>
      <button onClick={toggleWidget} className={styles.toggleButton}>
        {isOpen ? "×" : "💬"}
      </button>

      <div
        className={`${styles.chatContainer} ${isOpen ? styles.open : ""}`}
        onClick={() => chatInputRef.current?.focus()}
      >
        <div className={styles.chatHeader}>
          <h3>🤖RAG Chatbot</h3>
          <button onClick={toggleWidget} className={styles.closeButton}>
            ×
          </button>
        </div>

        <div className={styles.chatBody} ref={chatBodyRef}>
          {conversation.map((msg, i) => (
            <div
              key={i}
              className={`${styles.messageWrapper} ${styles[msg.role]}`}
            >
              <div className={`${styles.message} ${styles[msg.role]}`}>
                {msg.content}
              </div>
            </div>
          ))}
          {loading && <div className={styles.loading}>Thinking...</div>}
          {error && <div className={styles.error}>{error}</div>}
        </div>

        <form className={styles.inputForm} onSubmit={handleSend}>
          <input
            ref={chatInputRef}
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={inputPlaceholder}
            className={styles.chatInput}
            disabled={false}
          />
          <button
            type="submit"
            disabled={loading && !message.trim()}
            className={styles.sendBtn}
          >
            Send
          </button>
        </form>
      </div>
    </>
  );
};

export default ChatbotWidget;
