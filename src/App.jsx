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
import UserProfileForm from "./pages/UserProfileForm/UserProfileForm";
import Home from "./pages/Home/Home";
import { History } from "./pages/History";
import { PrivateRoutes } from "./Components/PrivateRoutes";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/login" Component={Login} />
          <Route path="/register" Component={Register} />
          <Route element={<PrivateRoutes />}>
            <Route path="/requests" Component={Requests} />
            <Route path="/support" Component={Support} />
            <Route path="/dashboard" Component={Dashboard} />
            <Route path="history" Component={History} />
            <Route path="/edit-profile" element={<UserProfileForm />} />
            <Route path="/orders" element={<Order />} />
            <Route path="/checkout/:orderId" element={<Requests />} />
            <Route path="*" Component={NotFound} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Footer />
    </UserProvider>
  );
}

export default App;
