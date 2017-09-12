import React from 'react';
import AddGaymerFormContainer from './Containers/AddGaymerFormContainer';
import './AppHeader.css';

const AppHeader = () => (
  <header className="AppHeader navbar">
    <section className="navbar-section">
     <a href="#" className="navbar-brand mr-2">GAYMER BEARS</a>
     <a href="#" className="btn btn-link">Find Bear Gaymers streaming your favorite games!</a>
    </section>
    <section className="navbar-section navbar-add-gaymer-form">
      <AddGaymerFormContainer />
    </section>

  </header>
)

export default AppHeader;
