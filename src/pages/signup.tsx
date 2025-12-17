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
            setError('Passwords do not match');
            return;
        }

        setLoading(true);

        try {
            const res = await axios.post('http://localhost:8000/api/auth/signup', {
                email,
                password,
                software_bg: softwareBg || null,
                hardware_bg: hardwareBg || null,
            });

            // ✅ Save JWT token
            localStorage.setItem('auth_token', res.data.token);

            // ✅ Redirect after successful signup
            history.push('/');
        } catch (err: any) {
            console.error(err);
            setError(
                err.response?.data?.detail ||
                err.response?.data?.message ||
                'Sign up failed. Please try again.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout
            title="Join the Course"
            description="Sign up for the Physical AI & Humanoid Robotics Course"
        >
            <main className={styles.signupContainer}>
                <div className={styles.signupCard}>
                    <h1 className={styles.title}>Create Account</h1>

                    {error && (
                        <div
                            style={{
                                color: 'var(--ifm-color-danger)',
                                marginBottom: '1rem',
                                textAlign: 'center',
                            }}
                        >
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSignup}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Email Address</label>
                            <input
                                type="email"
                                className={styles.input}
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                                placeholder="you@example.com"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Password</label>
                            <input
                                type="password"
                                className={styles.input}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                                placeholder="Create a strong password"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Confirm Password</label>
                            <input
                                type="password"
                                className={styles.input}
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                required
                                placeholder="Confirm your password"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Software Background</label>
                            <input
                                type="text"
                                className={styles.input}
                                value={softwareBg}
                                onChange={e => setSoftwareBg(e.target.value)}
                                placeholder="Python, C++, Web Dev (Optional)"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Hardware Background</label>
                            <input
                                type="text"
                                className={styles.input}
                                value={hardwareBg}
                                onChange={e => setHardwareBg(e.target.value)}
                                placeholder="Arduino, PCB Design (Optional)"
                            />
                        </div>

                        <button type="submit" className={styles.button} disabled={loading}>
                            {loading ? 'Creating Account…' : 'Sign Up'}
                        </button>
                    </form>

                    <span className={styles.subText}>
                        Already have an account?{' '}
                        <Link to="/login" className={styles.link}>
                            Log in
                        </Link>
                    </span>
                </div>
            </main>
        </Layout>
    );
}
