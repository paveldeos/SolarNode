//@ts-nocheck
// import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
// import LoginPage from "./pages/LoginPage/LoginPage.tsx";
// import BlockChainPage from "./pages/BlockChainPage.tsx";

// const App = () => {

//     return (
//         <Router>
//             <Routes>
//                 <Route path='/' element={<LoginPage/>}/>
//                 <Route path='/select-blockchain' element={<BlockChainPage/>}/>
//             </Routes>
//         </Router>
//     );
// };

// export default App;

import React, { useEffect, useRef } from "react";
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';
import io from 'socket.io-client';

function App() {
  const termRef = useRef(null);

  useEffect(() => {
    const term = new Terminal();
    termRef.current = term;
    term.open(document.getElementById('terminal'));
    const socket = io('http://localhost:3000');
    term.onData(data => socket.emit('data', data));
    socket.on('data', function(data) {
      term.write(data);
    });
  }, []);

  return (
    <div className="App">
      <div id="terminal"></div>
    </div>
  );
}

export default App;
