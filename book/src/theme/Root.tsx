import React from 'react';
import ChatWidget from '../components/ChatWidget';

// Default implementation, that you can customize
export default function Root({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
            <ChatWidget />
        </>
    );
}
