import React from "react";
import { BottomNavbar, Header } from "./../Components";
import styled from "styled-components";
const Error = () => {
  return (
    <React.Fragment>
      <Header />
      <Wrapper>
        <h1>Error</h1>
        <h1>404</h1>
        <h1>😢</h1>
      </Wrapper>
      <BottomNavbar />
    </React.Fragment>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 30rem;
  h1 {
    font-size: 5rem;
    font-weight: lighter;
    letter-spacing: var(--letter-spacing-basic);
    text-transform: uppercase;
    text-align: center;
  }
`;

export default Error;
