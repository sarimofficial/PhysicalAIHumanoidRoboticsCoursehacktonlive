import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './signup.module.css';
import axios from 'axios';
import { useHistory } from '@docusaurus/router';

export default function LoginPage(): React.JSX.Element {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const history = useHistory();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const res = await axios.post(
                'http://localhost:8000/api/auth/signin',
                { email, password }
            );

            // ✅ Save JWT token
            localStorage.setItem('auth_token', res.data.token);

            // ✅ Redirect after login
            history.push('/');
        } catch (err: any) {
            console.error(err);
            setError(
                err.response?.data?.detail ||
                err.response?.data?.message ||
                'Login failed. Please try again.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout title="Log in" description="Log in to your account">
            <main className={styles.signupContainer}>
                <div className={styles.signupCard}>
                    <h1 className={styles.title}>Log In</h1>

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

                    <form onSubmit={handleLogin}>
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
                                placeholder="Your password"
                            />
                        </div>

                        <button type="submit" className={styles.button} disabled={loading}>
                            {loading ? 'Logging in…' : 'Log In'}
                        </button>
                    </form>

                    <span className={styles.subText}>
                        Don&apos;t have an account?{' '}
                        <Link to="/signup" className={styles.link}>
                            Sign up
                        </Link>
                    </span>
                </div>
            </main>
        </Layout>
    );
}
