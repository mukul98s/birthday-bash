import "./App.css";
import { Switch, Route, useLocation } from "react-router-dom";
import { Home } from "./Pages/";
import { ProvideAuth } from "./State/LoginState";
import PrivateRouteLogin from "./Pages/PrivateRouteLogin";
import { SignUpProvider } from "./State/SignupState";
import { lazy, Suspense } from "react";
import Loader from "./Components/Loader";

import { AnimatePresence } from "framer-motion";

function App() {
  // Lazy Imports
  const UserHome = lazy(() => import("./Pages/UserHome"));
  const UserProfile = lazy(() => import("./Pages/UserProfile"));
  const Login = lazy(() => import("./Pages/Login"));
  const SignUp = lazy(() => import("./Pages/SignUp"));
  const Error = lazy(() => import("./Pages/Error"));

  const location = useLocation();

  return (
    <Suspense fallback={<Loader />}>
      <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.key}>
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
      </AnimatePresence>
    </Suspense>
  );
}

export default App;
