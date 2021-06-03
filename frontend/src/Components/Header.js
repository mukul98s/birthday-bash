import React from "react";
import styled from "styled-components";

const Header = () => {
  return (
    <Wrapper>
      <header>
        <div>
          <h1>Birthday Bash</h1>
        </div>
      </header>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  header {
    background-color: var(--dark-header);

    h1 {
      text-align: center;
      padding: 20px 10px;
      font-weight: 700;
      text-transform: uppercase;
      font-size: 2.25rem;
      letter-spacing: var(--letter-spacing-advance);
      text-shadow: var(--text-shadow-dark);
      color: var(--color-primary);
      font-family: "Shadows Into Light", cursive;
    }
  }
`;

export default Header;
