import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import LoginForm from './LoginForm';
import './loginButton.css';

Modal.setAppElement('#root');

export default function LoginButton({ onAuthChange }) {
  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState(() => localStorage.getItem('userName') || '');

  // Sincronizar con cambios de login/logout
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    setUserName('');
    onAuthChange?.();
  };

  const handleSuccess = (name) => {
    setUserName(name);
    setOpen(false);
    onAuthChange?.();
  };

  // Escuchar cambios en otras pestañas
  useEffect(() => {
    const sync = () => setUserName(localStorage.getItem('userName') || '');
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);

  return (
    <>
      {userName ? (
        <div className="user-menu">
          <button className="user-btn">{userName}</button>
          <div className="dropdown">
            <button onClick={logout}>Logout</button>
          </div>
        </div>
      ) : (
        <button className="login-btn" onClick={() => setOpen(true)}>
          Login
        </button>
      )}

      <Modal
        isOpen={open}
        onRequestClose={() => setOpen(false)}
        className="login-modal"
        overlayClassName="login-modal-overlay"
        closeTimeoutMS={200}
      >
        <LoginForm onSuccess={handleSuccess} />
        <hr className="login-divider" />
        <p className="login-register-link">
          ¿No tienes una cuenta?{' '}
          <a href="/register" onClick={() => setOpen(false)}>
            Registrate
          </a>
        </p>
      </Modal>
    </>
  );
}