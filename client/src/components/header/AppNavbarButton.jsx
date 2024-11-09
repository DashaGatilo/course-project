import React from 'react';
import { Link } from 'react-router-dom';

function AppNavbarButton({ label, to, icon }) {
  return (
    <Link to={to} className="app-navbar-button">
      <i className={`bi bi-${icon}`}></i> {label}
    </Link>
  );
}

export default AppNavbarButton;