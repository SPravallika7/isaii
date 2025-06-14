import React from 'react';
import Home from './Home.jsx';
import History from './History.jsx';
import { BrowserRouter as Router,Route,Routes,Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import './App.css';
function App(){
  return(
    <Router>
      <div className="navbar">
        <Link to="/" className="nav-logo" >Daijo</Link>
        <Link to="History/" className='nav-button'><FaSearch style={{marginRight:'6px'}}/>Search</Link>

      </div>
      <Routes>
        <Route path="/"element={<Home/>}/>
        <Route path="/History"element={<History/>}/>
                
      </Routes>
    </Router>
  )
}
export default App;