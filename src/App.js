import React from "react";
import { Route, Switch } from "react-router-dom";
import TopBar from "./components/TopBar";
import HomePage from "./pages/HomePage";
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";
import ProductsPage from "./pages/ProductsPage";
import UserPage from "./pages/UserPage";
import OneProductPage from "./pages/OneProductPage";
import "./App.css";


function App() {
  return (
    <div>
      <TopBar />
      <div className="container">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegistrationPage} />
          <Route path="/products" component={ProductsPage} />
          <Route path="/users/:username" component={UserPage} />
          <Route path="/product/:productName" component={OneProductPage} />
        </Switch>
      </div>
    </div>
  );
}


export default App;
