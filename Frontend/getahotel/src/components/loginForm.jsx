// src/components/LoginForm.jsx
import { useState } from 'react';
import axios from 'axios';
import './loginForm.css';

export default function LoginForm({ onSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

 const login = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');

  try {
    const { data } = await axios.post(
      'https://localhost:7023/api/auth/login',
      { email, password }
    );
    // 👇 guardamos ambas cosas
    localStorage.setItem('token', data.token);
    localStorage.setItem('userName', data.user.name);

    onSuccess(data.user.name); // le pasamos el nombre
  } catch (err) {
    setError(err.response?.data?.message || 'Credenciales inválidas');
  } finally {
    setLoading(false);
  }
};

  return (
    <form className="login-form" onSubmit={login}>
      <h3 className="login-title">Ingresá a tu cuenta</h3>

      <label className="login-label">
        Email:
        <input
          className="login-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>

      <label className="login-label">
        Contraseña:
        <input
          className="login-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>

      {error && <p className="login-error">{error}</p>}

      <button className="login-submit" type="submit" disabled={loading}>
        {loading ? 'Enviando…' : 'Entrar'}
      </button>
    </form>
  );
}