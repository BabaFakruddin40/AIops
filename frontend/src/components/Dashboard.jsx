import './Dashboard.css';

function Dashboard({ incidents, alerts, loading, error, onRefresh }) {
  const criticalIncidents = incidents.filter((i) => i.severity === 'critical').length;
  const activeAlerts = alerts.filter((a) => a.enabled).length;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <button className="btn-primary" onClick={onRefresh}>
          🔄 Refresh
        </button>
      </div>

      {error && <div className="error">Error: {error}</div>}

      {loading && <div className="loading">Loading...</div>}

      {!loading && (
        <>
          {/* Stats Cards */}
          <div className="stats-grid">
            <div className="stat-card">
              <h3 className="stat-label">Total Incidents</h3>
              <p className="stat-value">{incidents.length}</p>
              <p className="stat-detail">
                {criticalIncidents} critical
              </p>
            </div>

            <div className="stat-card">
              <h3 className="stat-label">Active Alerts</h3>
              <p className="stat-value">{activeAlerts}</p>
              <p className="stat-detail">
                {alerts.length} total
              </p>
            </div>

            <div className="stat-card">
              <h3 className="stat-label">System Status</h3>
              <p className="stat-value" style={{ color: '#28a745' }}>●</p>
              <p className="stat-detail">Healthy</p>
            </div>
          </div>

          {/* Incidents Section */}
          <div className="card">
            <h3 className="card-title">Recent Incidents</h3>
            {incidents.length === 0 ? (
              <p className="empty-state">No incidents reported</p>
            ) : (
              <div className="incidents-list">
                {incidents.slice(0, 5).map((incident) => (
                  <div key={incident.id} className="incident-item">
                    <div className="incident-header">
                      <span className={`severity-badge severity-${incident.severity}`}>
                        {incident.severity.toUpperCase()}
                      </span>
                      <h4>{incident.title}</h4>
                    </div>
                    <p className="incident-status">
                      Status: <strong>{incident.status}</strong>
                    </p>
                    <p className="incident-time">
                      {new Date(incident.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Alerts Section */}
          <div className="card">
            <h3 className="card-title">Active Alert Rules</h3>
            {alerts.length === 0 ? (
              <p className="empty-state">No alerts configured</p>
            ) : (
              <div className="alerts-list">
                {alerts.slice(0, 5).map((alert) => (
                  <div key={alert.id} className="alert-item">
                    <div className="alert-header">
                      <span className={`status-badge ${alert.enabled ? 'enabled' : 'disabled'}`}>
                        {alert.enabled ? 'ENABLED' : 'DISABLED'}
                      </span>
                      <h4>{alert.name}</h4>
                    </div>
                    <p className="alert-config">
                      {alert.metric} {alert.operator} {alert.threshold}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
