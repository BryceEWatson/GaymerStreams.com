import React from 'react';
import './AppFooter.css';

const AppHeader = () => (
  <footer className="AppFooter navbar bg-secondary">
    <section className="navbar-section navbar-left-section">
     <a href="/" className="navbar-brand mr-2">&copy; GAYMER STREAMS 2017</a>
     {/*<a href="#" className="btn btn-link navbar-slogan">Find Gaymers Bears streaming your favorite games!</a>*/}
    </section>
    <section className="navbar-section navbar-right-section app-footer-navbar-right-section-override">

      <span>Comments/Suggestions? &nbsp;</span>

      <a href="https://twitter.com/Vinnie_Panda"
        className="twitter-follow-button"
        data-show-count="false" data-size="large">Follow @Vinnie_Panda</a>
    </section>

  </footer>
)

export default AppHeader;
