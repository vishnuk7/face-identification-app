import React from 'react';
import Tilt from 'react-tilt';
import './navigation.css';

const Navigation = ()=>(
  <nav>
    <Tilt className="Tilt" options={{ max : 25 }} style={{ height:178, width: 250 }} >
      <div className="Tilt-inner"><img alt="logo" className="nav_logo" src={require("./image.svg")} /></div>
    </Tilt>
    <h1 className="heading">FINDFACE</h1>
    <a className="nav-link" href="#">Sign Out</a>
</nav>
);

export default Navigation;
