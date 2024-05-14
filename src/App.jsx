import React from "react";
import "./styles/Global.css";
import { Support } from "./pages/Support";
import { Login } from "./pages/Login/Login";
import { Register } from "./pages/Register/Register";
import { BrowserRouter,Route, Routes } from 'react-router-dom';

  function App() {
    return (
      <BrowserRouter>
      <div className="App">
          <Routes>
          <Route path='/login' Component={Login}/>
          <Route path='/support' Component={Support}/>
          <Route path='/register' Component={Register}/>
          </Routes>
      </div>
      </BrowserRouter>
    );
  }

export default App;
