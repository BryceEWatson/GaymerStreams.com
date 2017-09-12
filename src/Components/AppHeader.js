import React from 'react';
import AddGaymerFormContainer from './Containers/AddGaymerFormContainer';
import './AppHeader.css';

const AppHeader = () => (
  <header className="AppHeader navbar bg-secondary">
    <section className="navbar-section navbar-left-section">
     <a href="/" className="navbar-brand mr-2"><h3>GAYMER STREAMS</h3></a>
     {/*<a href="#" className="btn btn-link navbar-slogan">Find Gaymers Bears streaming your favorite games!</a>*/}
    </section>
    <section className="navbar-section navbar-add-gaymer-form">
      <AddGaymerFormContainer />
    </section>

  </header>
)

export default AppHeader;
