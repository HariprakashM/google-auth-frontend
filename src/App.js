import logo from './logo.svg';
import './App.css';
import {BrowserRouter , Routes , Route , Link} from 'react-router-dom'
import Login from './screens/Login';
import Register from './screens/Register';
import Dashboard from './screens/Dashboard';
import Nav from './components/Nav';
function App() {
  return (
    <div className="App">
      <Nav/>
      <BrowserRouter>
      <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
