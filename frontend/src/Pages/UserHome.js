import React from "react";
import styled from "styled-components";
import { Header, BottomNavbar, Loader, Feed } from "../Components";
import { Switch, useRouteMatch } from "react-router-dom";
import { Suspense } from "react";
import PrivateRoute from "../utils/PrivateRoute";
import { UserProfile } from "../Pages";

const UserHome = () => {
  const { url } = useRouteMatch();
  return (
    <Wrapper>
      <Header />
      <Suspense fallback={<Loader />}>
        <Switch>
          <PrivateRoute exact path={`${url}/feed`} component={Feed} />
          <PrivateRoute path={`${url}/search`} />
          <PrivateRoute path={`${url}/addUser`} />
          <PrivateRoute path={`${url}/notification`} />
          <PrivateRoute path={`${url}/profile`} component={UserProfile} />
        </Switch>
      </Suspense>
      <BottomNavbar />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  article {
    margin: 1rem auto;
    width: 50%;
    .MuiSelect-select {
      color: white;
      font-size: 1rem;
      border-bottom: 2px solid white;
      @media screen and (min-width: 768px) {
        font-size: 1.5rem;
      }
    }
    .MuiSelect-icon,
    #demo-simple-select-label {
      color: white;
      font-size: 1rem;
    }
  }

  h2 {
    text-align: center;
    font-weight: lighter;
    font-size: 1.5rem;
    letter-spacing: var(--letter-spacing-basic);
  }

  section {
    margin: 2rem auto;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
`;

export default UserHome;
