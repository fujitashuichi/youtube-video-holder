import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import HowToUsePage from './HowToUsePage';


function App() {
	return (
		<BrowserRouter>
		<div className="App">
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/how-to-use' element={<HowToUsePage />} />
			</Routes>
		</div>
		</BrowserRouter>
	);
}

export default App;
