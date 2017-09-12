import React from 'react';
import AddGaymerFormContainer from './Containers/AddGaymerFormContainer';
import './AppHeader.css';

const AppHeader = () => (
  <header className="AppHeader navbar bg-secondary">
    <section className="AppHeaderSection navbar-section navbar-left-section">
      <div>
        <div><a href="/" className="AppHeaderSectionLogo eight-bit-font mr-2">
          <span className="colorG">G</span>
          <span className="colorA">A</span>
          <span className="colorY">Y</span>
          MER STREAMS</a></div>
        <div className="btn-link navbar-slogan text-primary">

            Find your favorite gay (and gay friendly) streamers!
        </div>
      </div>
    </section>
    <section className="navbar-section navbar-add-gaymer-form navbar-right-section">
      <AddGaymerFormContainer />
    </section>

  </header>
)

export default AppHeader;
