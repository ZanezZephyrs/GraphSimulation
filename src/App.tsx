import React from 'react';
import HomePage from './pages/HomePage';
import {AdjListProvider} from './contexts/AdjListContext'
function App() {
  return (
    <div className="App">
      <AdjListProvider>
        <HomePage/>
      </AdjListProvider>
    </div>
  );
}

export default App;
