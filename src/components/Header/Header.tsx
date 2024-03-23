import React from 'react';
import './header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo" onClick={()=>{window.location.href="/"}}>
        Articles
      </div>
    </header>
  );
};

export default Header;
