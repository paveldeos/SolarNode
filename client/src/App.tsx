import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './main.scss'
import LoginPage from "./pages/LoginPage/LoginPage.tsx";
import Nodes from "./pages/Nodes/Nodes.tsx";
import Select from "./pages/Select/Select.tsx";
import Terminal from "./pages/Terminal/Terminal.tsx";
import {useEthereum} from "./hooks/useEthereum.ts";

const App = () => {
    const {account} = useEthereum();

    return (
        <Router>
            <Routes>
                {account ? (
                    <>
                        <Route path="/blockchains" element={<Select/>}/>
                        <Route path="/nodes" element={<Nodes/>}/>
                        <Route path="/terminal" element={<Terminal/>}/>
                        <Route path="/" element={<Select/>}/>
                    </>
                ) : (
                    <Route path="/" element={<LoginPage onConnect={() => console.log('Connected')}/>}/>
                )}
            </Routes>
        </Router>
    );
};

export default App;
