import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './signup.module.css';
import axios from 'axios';
import { useHistory } from '@docusaurus/router';

export default function SignupPage(): React.JSX.Element {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [softwareBg, setSoftwareBg] = useState('');
    const [hardwareBg, setHardwareBg] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const history = useHistory();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);

        try {
            // Assuming the API endpoint from the previous component
            await axios.post('/api/auth/signup', {
                email,
                password,
                softwareBg,
                hardwareBg
            });
            // Redirect to success page or login
            // For now, let's redirect to home
            history.push('/');
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.message || "An error occurred during sign up. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout
            title="Join the Course"
            description="Sign up for the Physical AI & Humanoid Robotics Course">
            <main className={styles.signupContainer}>
                <div className={styles.signupCard}>
                    <h1 className={styles.title}>Create Account</h1>

                    {error && (
                        <div style={{ color: 'var(--ifm-color-danger)', marginBottom: '1rem', textAlign: 'center' }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSignup}>
                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="email">Email Address</label>
                            <input
                                id="email"
                                type="email"
                                className={styles.input}
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                                placeholder="you@example.com"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                className={styles.input}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                                placeholder="Create a strong password"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="confirm-password">Confirm Password</label>
                            <input
                                id="confirm-password"
                                type="password"
                                className={styles.input}
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                required
                                placeholder="Confirm your password"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="software-bg">Software Background</label>
                            <input
                                id="software-bg"
                                type="text"
                                className={styles.input}
                                value={softwareBg}
                                onChange={e => setSoftwareBg(e.target.value)}
                                placeholder="e.g., Python, C++, Web Dev (Optional)"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="hardware-bg">Hardware Background</label>
                            <input
                                id="hardware-bg"
                                type="text"
                                className={styles.input}
                                value={hardwareBg}
                                onChange={e => setHardwareBg(e.target.value)}
                                placeholder="e.g., Arduino, PCB Design (Optional)"
                            />
                        </div>

                        <button type="submit" className={styles.button} disabled={loading}>
                            {loading ? 'Creating Account...' : 'Sign Up'}
                        </button>
                    </form>

                    <span className={styles.subText}>
                        Already have an account? <Link to="/login" className={styles.link}>Log in</Link>
                    </span>
                </div>
            </main>
        </Layout>
    );
}
