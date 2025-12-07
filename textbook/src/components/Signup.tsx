import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [softwareBg, setSoftwareBg] = useState('');
  const [hardwareBg, setHardwareBg] = useState('');

  const handleSignup = async () => {
    await axios.post('/api/auth/signup', { email, password, softwareBg, hardwareBg });
  };

  return (
    <form onSubmit={handleSignup}>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <input placeholder="Software Background" value={softwareBg} onChange={e => setSoftwareBg(e.target.value)} />
      <input placeholder="Hardware Background" value={hardwareBg} onChange={e => setHardwareBg(e.target.value)} />
      <button type="submit">Signup</button>
    </form>
  );
};

export default Signup;