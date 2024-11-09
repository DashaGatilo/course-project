import React from 'react';
import AppNavbar from '../navbar/AppNavbar';
import AppMain from '../navbar/AppMain';
import AppAdmin from '../navbar/AppAdmin';
import AppLogin from '../navbar/AppLogin';

function App() {
  return (
    <div className="app">
      <AppNavbar />
      <AppMain />
      <AppAdmin />
      <AppLogin />
    </div>
  );
}

export default App;