import React from "react";
import "./styles/Global.css";
// import { Support } from "./pages/Support";
import Requests from "./pages/Requests";

import { Support } from "./pages/Support";
import { Login } from "./pages/Login/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register/Register";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";



import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <div className="App">

      <Requests />
    
  

       <Header />
      <Register/>
    <UserProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/login" Component={Login} />
          <Route path="/register" Component={Register} />
          <Route path="/support" Component={Support} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </UserProvider>
  );
}

export default App;
