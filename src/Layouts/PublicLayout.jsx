import React from 'react';
import { Outlet } from 'react-router-dom';

function PublicLayout() {
    return (
        <div>
        <header>
          <h1>Welcome to the Pizzeria</h1>
        </header>
        <main>
          {/* El Outlet renderiza los componentes de las rutas hijas */}
          <Outlet />
        </main>
        <footer>
          <p>&copy; 2025 Pizzeria Nick</p>
        </footer>
      </div>
    );
}

export default PublicLayout;