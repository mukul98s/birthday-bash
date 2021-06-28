import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "./Pages/";
import { ProvideAuth } from "./State/LoginState";
import PrivateRouteLogin from "./Pages/PrivateRouteLogin";
import { SignUpProvider } from "./State/SignupState";
import { lazy, Suspense } from "react";
import Loader from "./Components/Loader";

function App() {
  // Lazy Imports
  const UserHome = lazy(() => import("./Pages/UserHome"));
  const UserProfile = lazy(() => import("./Pages/UserProfile"));
  const Login = lazy(() => import("./Pages/Login"));
  const SignUp = lazy(() => import("./Pages/SignUp"));
  const Error = lazy(() => import("./Pages/Error"));

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
          <Route path="*">
            <Error />
          </Route>
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
