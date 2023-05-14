import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './main.scss'
import LoginPage from "./pages/LoginPage/LoginPage.tsx";
import Nodes from "./pages/Nodes/Nodes.tsx";
import Select from "./pages/Select/Select.tsx";

const App = () => {
	
	return (
		<Router>
			<Routes>
				<Route path='/' element={<LoginPage/>}/>
				<Route path='/blockchains' element={<Select/>}/>
				<Route path='/nodes' element={<Nodes/>}/>
			</Routes>
		</Router>
	);
};

export default App;
