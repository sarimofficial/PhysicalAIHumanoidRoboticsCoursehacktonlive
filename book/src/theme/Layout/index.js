import React, { useState, useEffect, useCallback } from "react";
import Layout from "@theme-original/Layout";
import ChatbotWidget from "@site/src/components/ChatbotWidget";

export default function LayoutWrapper(props) {
  const [selectedText, setSelectedText] = useState(null);
  const [initialQuery, setInitialQuery] = useState(null);

  const clearSelection = useCallback(() => {
    setSelectedText(null);
    if (window.getSelection().rangeCount > 0)
      window.getSelection().removeAllRanges();
  }, []);

  const handleMouseUp = useCallback(() => {
    const selection = window.getSelection();
    const text = selection.toString().trim();
    if (!text || text.length < 4) return clearSelection();
    if (selection.anchorNode?.parentElement?.closest(".chatContainer")) return;
    if (selection.focusNode?.parentElement?.closest(".chatContainer")) return;

    // Automatically open chat widget with selected text
    setSelectedText(text);
    setInitialQuery(text);
    clearSelection();
  }, [clearSelection]);

  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);
    return () => document.removeEventListener("mouseup", handleMouseUp);
  }, [handleMouseUp]);

  return (
    <>
      <Layout {...props} />
      <ChatbotWidget
        selectedText={selectedText}
        clearSelectedText={clearSelection}
        initialQuery={initialQuery}
        clearInitialQuery={() => setInitialQuery(null)}
      />
    </>
  );
}
