import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home, Login, SignUp, UserHome } from "./Pages/";
import { ProvideAuth } from "./State/LoginState";
import PrivateRouteLogin from "./Pages/PrivateRouteLogin";
import { SignUpProvider } from "./State/SignupState";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact={true}>
          <Home />
        </Route>
        <Route path="/login">
          <ProvideAuth>
            <Login />
          </ProvideAuth>
        </Route>
        <Route path="/signup">
          <SignUpProvider>
            <SignUp />
          </SignUpProvider>
        </Route>
        <PrivateRouteLogin path="/username">
          <UserHome />
        </PrivateRouteLogin>
      </Switch>
    </Router>
  );
}

export default App;
