import { useState } from 'react';
import Login from './login/Login.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from "react-router-dom";
import Register from './register/Register.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="p-2 w-screen h-screen flex items-center justify-center">
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        
        
      </Routes>
      <Login/>
      <ToastContainer/>
    </div>
      
    </>
  )
}

export default App;





/*
<div className="p-2 w-screen h-screen flex items-center justify-center">
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route element={<VerifyUser/>}>
        <Route path="/" element={<Home/>}/>
        </Route>
      </Routes>
      <ToastContainer/>
    </div>
*/ 

