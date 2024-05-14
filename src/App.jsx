import React from "react";
import "./styles/Global.css";
// import { Support } from "./pages/Support";
import Requests from "./pages/Requests";

import { Support } from "./pages/Support";
import Register from "./Components/Register/Register";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";




function App() {
  return (
    <div className="App">

      <Requests />
    
  

       <Header />
      <Register/>
      <Footer />
    </div>
  );
}

export default App;
