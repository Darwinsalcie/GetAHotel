import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import './loginButton.css';

Modal.setAppElement('#root');

export default function LoginButton({ onAuthChange }) {
  const [open, setOpen] = useState(false);
  const [currentView, setCurrentView] = useState('login'); // 'login' o 'register'
  const [userName, setUserName] = useState(() => localStorage.getItem('userName') || '');

  // Sincronizar con cambios de login/logout
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    setUserName('');
    onAuthChange?.();
  };

  const handleLoginSuccess = (name) => {
    setUserName(name);
    setOpen(false);
    setCurrentView('login'); // Reset to login view
    onAuthChange?.();
  };

  const handleRegisterSuccess = () => {
    setOpen(false);
    setCurrentView('login'); // Reset to login view
    onAuthChange?.();
    // La redirección ya se maneja en el componente RegisterForm
  };

  const handleSwitchToRegister = () => {
    setCurrentView('register');
  };

  const handleSwitchToLogin = () => {
    setCurrentView('login');
  };

  const handleCloseModal = () => {
    setOpen(false);
    setCurrentView('login'); // Reset to login view when closing
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
        onRequestClose={handleCloseModal}
        className="login-modal"
        overlayClassName="login-modal-overlay"
        closeTimeoutMS={200}
      >
        {currentView === 'login' ? (
          <LoginForm 
            onSuccess={handleLoginSuccess}
            onSwitchToRegister={handleSwitchToRegister}
          />
        ) : (
          <RegisterForm 
            onSuccess={handleRegisterSuccess}
            onSwitchToLogin={handleSwitchToLogin}
          />
        )}
        
        <hr className="login-divider" />
        
        <p className="login-register-link">
          {currentView === 'login' 
            ? '¿Necesitás ayuda? Contactanos.' 
            : '¿Problemas para registrarte? Contactanos.'
          }
        </p>
      </Modal>
    </>
  );
}