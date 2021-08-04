import LoggedInSwitch from "./CheckIfUserIsLoggedIn.js"
import LogInWindow from "./LoginAndSignupComponents/LogInWindow.js";
import SignUpWindow from "./LoginAndSignupComponents/SignUpWindow.js";
import GroupList from "./LoggedInComponents/GroupList.js";
import InsideGroup from "./LoggedInComponents/InsideGroup.js";
import '../App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {

  return (
    <Router>
      <Switch>
        <Route path="/" exact component={LoggedInSwitch} />
        <Route path="/login" component={LogInWindow} />
        <Route path="/signup" component={SignUpWindow} />
        <Route path="/my-groups" exact component={GroupList} />
        <Route path="/my-groups/:groupUrl" component={InsideGroup} />
      </Switch>
    </Router>
  );
}

export default App;
