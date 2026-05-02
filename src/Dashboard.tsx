import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    alert('Déconnexion réussie !');
    navigate('/login');
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#1a1a2e'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '24px',
        padding: '2rem',
        textAlign: 'center',
        maxWidth: '500px'
      }}>
        <h2 style={{ color: '#c6a43b' }}> Dashboard </h2>
        <p style={{ margin: '1rem 0' }}>Bienvenue dans votre espace personnel !</p>
        <p>🏨 Luxury Hotel</p>
        <button onClick={handleLogout} style={{
          marginTop: '1rem',
          padding: '0.8rem 1.5rem',
          background: '#c6a43b',
          border: 'none',
          borderRadius: '12px',
          color: 'white',
          cursor: 'pointer'
        }}>
          Se déconnecter
        </button>
      </div>
    </div>
  );
}

export default Dashboard;