

import Sidebar from './Sidebar';
import Chat from './Chat';

import{
  BrowserRouter, Routes, Route
} from 'react-router-dom'

import './App.css';
import { useState } from 'react';
import Login from './Login';


function App() {

  const [user,setUser] = useState(sessionStorage.getItem('user') || ""
  );
  

  return !user?(
    <Login setuser={setUser}/>
  ):(
    <div className="app">
      <div className='app_body'>
        <BrowserRouter>
        <Sidebar 
        setUser={setUser} 
        user={user}
        />
        <Routes>
        <Route path='/rooms/:roomId' element={<Chat user={user} />}/>
        <Route path='/' element={<Chat user={user}/>}
        
        />
        </Routes>
        </BrowserRouter>


        

      </div>
    </div>
  );
}

export default App;
