import React from 'react';
import './Header.css'; // Import the CSS for styling

const Header = ({ topNavItems, logoUrl, icons }) => {
  return (
    <header className="zalando-header">
      {/* Top Navigation Bar */}
      <nav className="header-top-nav">
        <ul>
          {topNavItems.map((item) => (
            <li key={item}>
              <button className="top-nav-button">{item}</button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Main Header Bar */}
      <div className="header-main-bar">
        {/* Left Side: Logo */}
        <div className="main-bar-left">
          <a href="/" aria-label="Zalando Homepage">
            <img src={logoUrl} alt="Zalando Logo" className="zalando-logo" />
          </a>
        </div>

        {/* Center: Search Bar */}
        <div className="main-bar-center">
          <form className="search-form" onSubmit={(e) => e.preventDefault()}>
            {/* Ideally use a search icon here */}
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search"
              className="search-input"
              aria-label="Search"
            />
          </form>
        </div>

        {/* Right Side: Icons */}
        <div className="main-bar-right">
          {icons.map((icon) => (
            <button key={icon.id} className="icon-button" aria-label={icon.name}>
              <span className="icon-symbol">{icon.symbol}</span>
               {/* Optional: Show text on hover or larger screens */}
              <span className="icon-text">{icon.name}</span>
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;