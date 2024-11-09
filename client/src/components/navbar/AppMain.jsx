import React from 'react';
import AppCategory from '../page/AppCategory';
import Banner from '../main/Banner';

function AppMain() {
  return (
    <main className="app-main">
      <Banner />
      <AppCategory />
    </main>
  );
}

export default AppMain;