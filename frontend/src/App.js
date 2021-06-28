import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home, Login, SignUp } from "./Pages/";
import { ProvideAuth } from "./State/LoginState";
import PrivateRouteLogin from "./Pages/PrivateRouteLogin";
import { SignUpProvider } from "./State/SignupState";
import { lazy, Suspense } from "react";
import Loader from "./Components/Loader";

function App() {
  const UserHome = lazy(() => import("./Pages/UserHome"));
  const UserProfile = lazy(() => import("./Pages/UserProfile"));
  return (
    <Router>
      <Suspense fallback={<Loader />}>
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
          <PrivateRouteLogin path="/home">
            <UserHome />
          </PrivateRouteLogin>
          <PrivateRouteLogin path="/profile">
            <UserProfile />
          </PrivateRouteLogin>
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
