import LoggedInSwitch from "./CheckIfUserIsLoggedIn.js"
import LogInWindow from "./LoginAndSignupComponents/LogInWindow.js";
import SignUpWindow from "./LoginAndSignupComponents/SignUpWindow.js";
import GroupList from "./LoggedInComponents/GroupList.js";
import '../App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";

function App() {

  if (localStorage.getItem('rememberMe') === 'false') {
    localStorage.removeItem('rememberedUsername')
    localStorage.removeItem('rememberedPassword')
  } else if (localStorage.getItem('rememberedUsername') === null || localStorage.getItem('rememberedPassword') === null) {
    localStorage.setItem('rememberMe', false)
  }

  return (
    <Router>
      <Switch>
        <Route path="/" exact component={LoggedInSwitch} />
        <Route path="/login" component={LogInWindow} />
        <Route path="/signup" component={SignUpWindow} />
        <Route path="/my-groups" component={GroupList} />
      </Switch>
    </Router>
  );
}

export default App;
