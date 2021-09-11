import "./App.css";
import { Switch, Route } from "react-router-dom";
import { Home, Login, Error, SignUp } from "./Pages/";
import { ProvideAuth } from "./State/LoginState";
import PrivateRoute from "./utils/PrivateRoute";
import { SignUpProvider } from "./State/SignupState";
import { Suspense } from "react";
import Loader from "./Components/Loader";
import {
  Feed,
  UserProfile,
  Search,
  Notifications,
  AddBirthday,
} from "./Components/";
import AppShell from "./AppShell";

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
        <PrivateRoute path="/feed">
          <AppShell>
            <Feed />
          </AppShell>
        </PrivateRoute>
        <PrivateRoute path="/search">
          <AppShell>
            <Search />
          </AppShell>
        </PrivateRoute>
        <PrivateRoute path="/add-birthday">
          <AppShell>
            <AddBirthday />
          </AppShell>
        </PrivateRoute>
        <PrivateRoute path="/notification">
          <AppShell>
            <Notifications />
          </AppShell>
        </PrivateRoute>
        <PrivateRoute path="/profile">
          <AppShell>
            <UserProfile />
          </AppShell>
        </PrivateRoute>
        <Route path="*" component={Error} />
      </Switch>
    </Suspense>
  );
}

export default App;
