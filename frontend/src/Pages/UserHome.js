import React from "react";
import styled from "styled-components";
import { Header, BottomNavbar } from "../Components";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { lazy, Suspense } from "react";

const UserProfile = lazy(() => import("../Pages/UserProfile"));
const Feed = lazy(() => import("../Components/Feed"));

const UserHome = () => {
  const { url } = useRouteMatch();
  return (
    <Wrapper>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path={`${url}/feed`}>
            <Feed />
          </Route>
          <Route path={`${url}/search`}></Route>
          <Route path={`${url}/addUser`}></Route>
          <Route path={`${url}/notification`}></Route>
          <Route path={`${url}/profile`}>
            <UserProfile />
          </Route>
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
