import React, { useState, useEffect } from 'react';
import ReactTooltip from 'react-tooltip';
import CanadaMap from './components/CanadaMap';
import './App.css';

function App() {
  const [stats, setStats] = useState("");

  useEffect(() => {
    ReactTooltip.rebuild();
  });

  const handleStats = e => {
    setStats(e);
  };

  return (
    <div className="App">
      <header className="App-header">Canada Covid Tracker</header>
        <CanadaMap setTooltipContent={handleStats}/>
        <ReactTooltip type="dark">{stats}</ReactTooltip>
    </div>
  );
}

export default App;
