// src/components/RegisterForm.jsx
import { useState } from 'react';
import { registerUser } from '../services/authService';
import './RegisterForm.css';

export default function RegisterForm({ onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getPasswordStrength = (password) => {
    if (password.length < 6) return 'weak';
    if (password.length < 8) return 'medium';
    if (password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)) return 'strong';
    return 'medium';
  };

  const getPasswordStrengthText = (strength) => {
    switch (strength) {
      case 'weak':   return 'Contraseña débil (mínimo 6 caracteres)';
      case 'medium': return 'Contraseña media';
      case 'strong': return 'Contraseña fuerte';
      default:       return '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validaciones básicas
    if (formData.name.trim().length < 2) {
      setError('El nombre debe tener al menos 2 caracteres');
      setLoading(false);
      return;
    }
    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      setLoading(false);
      return;
    }

    try {
      await registerUser({
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password
      });
      // ¡Registro ok! Volvemos al login en el mismo modal
      onSwitchToLogin();
    } catch (err) {
      setError(err.response?.data?.message || 'Error al crear la cuenta');
    } finally {
      setLoading(false);
    }
  };

  const strength = formData.password
    ? getPasswordStrength(formData.password)
    : null;

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <h3 className="register-title">Crear cuenta</h3>
      
      <label className="register-label">
        Nombre completo
        <input
          className="register-input"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Tu nombre completo"
          required
        />
      </label>
      
      <label className="register-label">
        Email
        <input
          className="register-input"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="tu@email.com"
          required
        />
      </label>
      
      <label className="register-label">
        Contraseña
        <input
          className="register-input"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Mínimo 6 caracteres"
          required
        />
        {strength && (
          <div className={`password-strength ${strength}`}>
            {getPasswordStrengthText(strength)}
          </div>
        )}
      </label>
      
      {error && <p className="register-error">{error}</p>}
      
      <button
        className={`register-submit ${loading ? 'loading' : ''}`}
        type="submit"
        disabled={loading}
      >
        {loading ? '' : 'Crear cuenta'}
      </button>
      
      <p className="register-login-link">
        ¿Ya tenés cuenta?{' '}
        <button type="button" onClick={onSwitchToLogin}>
          Iniciá sesión
        </button>
      </p>
    </form>
  );
}
