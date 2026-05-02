import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Dashboard from './Dashboard';

// Composant Login
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Veuillez remplir tous les champs');
      return;
    }
    if (!email.includes('@')) {
      setError('Email invalide');
      return;
    }
    
    alert('Connexion réussie !');
    navigate('/dashboard');
  };
  
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Connexion</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Mot de passe</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit">Se connecter</button>
        </form>
        <div className="auth-links">
          <Link to="/register">Pas encore de compte ? S'inscrire</Link>
          <Link to="/reset-password">Mot de passe oublié ?</Link>
        </div>
      </div>
    </div>
  );
}

// Composant Register
function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!name || !email || !password) {
      setError('Tous les champs sont obligatoires');
      return;
    }
    if (!email.includes('@')) {
      setError('Email invalide');
      return;
    }
    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }
    
    alert('Inscription réussie ! Connectez-vous.');
    navigate('/login');
  };
  
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Inscription</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nom complet</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Mot de passe</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit">S'inscrire</button>
        </form>
        <div className="auth-links">
          <Link to="/login">Déjà un compte ? Se connecter</Link>
        </div>
      </div>
    </div>
  );
}

// Composant ResetPassword
function ResetPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!email) {
      setError('Veuillez entrer votre email');
      return;
    }
    if (!email.includes('@')) {
      setError('Email invalide');
      return;
    }
    
    setSuccess(true);
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };
  
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Réinitialisation</h2>
        {!success ? (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            {error && <div className="error-message">{error}</div>}
            <button type="submit">Envoyer le lien</button>
          </form>
        ) : (
          <div className="success-message">
            <p>Un lien a été envoyé à <strong>{email}</strong></p>
            <p>Redirection vers la connexion...</p>
          </div>
        )}
        <div className="auth-links">
          <Link to="/login">Retour à la connexion</Link>
        </div>
      </div>
    </div>
  );
}

// App avec routage
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;