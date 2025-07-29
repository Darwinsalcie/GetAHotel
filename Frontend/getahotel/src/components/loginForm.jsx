// src/components/LoginForm.jsx
import { useState } from 'react';
import axios from 'axios';
import './LoginForm.css';

export default function LoginForm({ onSuccess, onSwitchToRegister }) {
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
      
      // Guardamos token y nombre de usuario
      localStorage.setItem('token', data.token);
      localStorage.setItem('userName', data.user.name);
      onSuccess(data.user.name);
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
        Email
        <input
          className="login-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@email.com"
          required
        />
      </label>
      
      <label className="login-label">
        Contraseña
        <input
          className="login-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Tu contraseña"
          required
        />
      </label>
      
      {error && <p className="login-error">{error}</p>}
      
      <button 
        className={`login-submit ${loading ? 'loading' : ''}`} 
        type="submit" 
        disabled={loading}
      >
        {loading ? '' : 'Entrar'}
      </button>
      
      <p className="login-register-link">
        ¿No tenés cuenta?{' '}
        <button type="button" onClick={onSwitchToRegister}>
          Registrate aquí
        </button>
      </p>
    </form>
  );
}