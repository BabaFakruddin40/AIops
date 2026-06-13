import './Navigation.css';

function Navigation() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <h1>🚨 AIops</h1>
          <span className="tagline">AI-Powered Operations Automation</span>
        </div>
        <ul className="navbar-menu">
          <li><a href="#dashboard">Dashboard</a></li>
          <li><a href="#incidents">Incidents</a></li>
          <li><a href="#alerts">Alerts</a></li>
          <li><a href="#metrics">Metrics</a></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
