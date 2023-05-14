import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoginPage from "./pages/LoginPage/LoginPage.tsx";
import BlockChainPage from "./pages/BlockChainPage.tsx";

const App = () => {

    return (
        <Router>
            <Routes>
                <Route path='/' element={<LoginPage/>}/>
                <Route path='/select-blockchain' element={<BlockChainPage/>}/>
            </Routes>
        </Router>
    );
};

export default App;
