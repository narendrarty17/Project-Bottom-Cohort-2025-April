import React from 'react';
import Header from './components/Header';
import './App.css';

function App() {
  // Data for the header
  const headerData = {
    topNavItems: ['Women', 'Men', 'Kids'],
    logoUrl: './Header/CompanyLogo.svg',
    
    icons: [
      { name: 'Wishlist', id: 'wishlist', symbol: '🤍' }, // Simple emoji placeholder
      { name: 'Bag', id: 'bag', symbol: '👜' },          // Simple emoji placeholder
      { name: 'Account', id: 'account', symbol: '👤' }    // Simple emoji placeholder
    ]
  };

  return (
    <div className="App">
      <Header
        topNavItems={headerData.topNavItems}
        logoUrl={headerData.logoUrl}
        icons={headerData.icons}
      />
    </div>
  );
}

export default App;