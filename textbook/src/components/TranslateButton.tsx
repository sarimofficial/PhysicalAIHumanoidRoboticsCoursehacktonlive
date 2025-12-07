import React, { JSX } from 'react';
import styles from './Buttons.module.css';

export default function TranslateButton(): JSX.Element {
    return (
        <button className={styles.translateBtn} onClick={() => alert('Translation features coming soon!')}>
            <span className={styles.icon}>🌐</span>
            <span>Translate</span>
        </button>
    );
}
