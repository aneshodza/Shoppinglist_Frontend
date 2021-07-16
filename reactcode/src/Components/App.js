import LoggedInSwitch from "./CheckIfUserIsLoggedIn.js"
import LogInWindow from "./LoginAndSignupComponents/LogInWindow.js";
import SignUpWindow from "./LoginAndSignupComponents/SignUpWindow.js";
import '../App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={LoggedInSwitch} />
        <Route path="/login" component={LogInWindow} />
        <Route path="/signup" component={SignUpWindow} />
      </Switch>
    </Router>
  );
}

export default App;
