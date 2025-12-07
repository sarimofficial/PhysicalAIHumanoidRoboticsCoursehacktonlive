import React, { JSX } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import axios from 'axios';
import styles from './Buttons.module.css';

export default function PersonalizeButton(): JSX.Element {
    const handleClick = async () => {
        try {
            // TODO: Ensure the /api/personalize endpoint is implemented
            const response = await axios.post('/api/personalize', { chapter: 'current' });

            // Update content dynamically
            const contentElement = document.getElementById('chapter-content');
            if (contentElement) {
                contentElement.innerHTML = response.data.personalized;
            } else {
                console.warn('Element #chapter-content not found');
                // Fallback feedback for now since the API might not exist yet
                alert('Personalization request sent!');
            }
        } catch (error) {
            console.error('Failed to personalize content:', error);
            alert('Could not connect to personalization service. Is the API running?');
        }
    };

    return (
        <button className={styles.personalizeBtn} onClick={handleClick}>
            <span className={styles.icon}>✨</span>
            <span>Personalize Learning</span>
        </button>
    );
}
