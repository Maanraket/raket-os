import React from 'react';
import Window from './components/window/Window';
import './App.css';
import './reset.css';

function App() {
  return (
    <>
      <Window title="hans">Frans</Window>
      <Window title="kazan">
        <div style={{ width: '500px' }}>Bauer</div>
      </Window>
    </>
  );
}

export default App;
