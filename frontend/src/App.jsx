import { useState, useEffect } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import Navigation from './components/Navigation';

function App() {
  const [incidents, setIncidents] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

  useEffect(() => {
    fetchData();
    // Refresh every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [incidentsRes, alertsRes] = await Promise.all([
        fetch(`${apiUrl}/incidents`),
        fetch(`${apiUrl}/alerts`),
      ]);

      if (incidentsRes.ok) {
        const data = await incidentsRes.json();
        setIncidents(data.data || []);
      }

      if (alertsRes.ok) {
        const data = await alertsRes.json();
        setAlerts(data.data || []);
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <Navigation />
      <main className="main-content">
        <Dashboard
          incidents={incidents}
          alerts={alerts}
          loading={loading}
          error={error}
          onRefresh={fetchData}
        />
      </main>
    </div>
  );
}

export default App;
