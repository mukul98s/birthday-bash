import "./App.css";
import { Switch, Route } from "react-router-dom";
import { Home, Login, Error, SignUp, UserHome, UserProfile } from "./Pages/";
import { ProvideAuth } from "./State/LoginState";
import PrivateRoute from "./utils/PrivateRoute";
import { SignUpProvider } from "./State/SignupState";
import { Suspense } from "react";
import Loader from "./Components/Loader";

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        <Route path="/" exact={true} component={Home} />
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
        <PrivateRoute path="/home" component={UserHome} />
        <PrivateRoute path="/profile" component={UserProfile} />
        <Route path="*" component={Error} />
      </Switch>
    </Suspense>
  );
}

export default App;
