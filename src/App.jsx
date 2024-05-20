import React from "react";
import "./styles/Global.css";
import Requests from "./pages/Requests/Requests";
import { Support } from "./pages/Support";
import { Login } from "./pages/Login/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import Order from "./pages/Order/Order";
import { UserProvider } from "./context/UserContext";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import { NotFound } from "./pages/NotFound";
import UserProfileForm  from "./pages/UserProfileForm/UserProfileForm";


function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" Component={Login} />
          <Route path="/login" Component={Login} />
          <Route path="/register" Component={Register} />
          <Route path="/requests" Component={Requests} />
          <Route path="/support" Component={Support} />
          <Route path="/dashboard" Component={Dashboard} />
          <Route path="/edit-profile" element={<UserProfileForm />} />
          <Route path="/history" element={<Order />} />
          <Route path="*" Component={NotFound} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </UserProvider>
  );
}

export default App;
