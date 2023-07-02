import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import UserLogin from "./Components/User/UserLogInAndSignIn/UserLogin";
import UserSignIn from "./Components/User/UserLogInAndSignIn/UserSignIn";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/user_login" element={<UserLogin />} />
          <Route exact path="/user_signin" element={<UserSignIn />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
