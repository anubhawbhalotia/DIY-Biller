import React from 'react';
import '../../App.css';

import Inventory from '../Inventory/inventory';
import Tools from '../Tools/tools';
import Settings from '../Bills/settings';
import Workspace from '../workspace/workspace';

function App() {
  return (
    <div className="App">
        <div className="ToolsInventory">
            <Inventory />
            <Tools/>
        </div>
        <Workspace/>
        <Settings/>
    </div>
  );
}

export default App;
