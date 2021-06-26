import React from "react";
import styled from "styled-components";
const Birthday = () => {
  return (
    <Wrapper>
      <main>
        <div className="person__image">
          <img
            src="https://wallpapercave.com/wp/mJRp4Xn.jpg"
            alt="Steve Jobs"
          />
        </div>
        <div className="person__details">
          <h3>Steve Jobs</h3>
          <h3>24 Feb</h3>
        </div>
        <div className="person__wish">
          <button>Wish</button>
        </div>
      </main>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  main {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    background: var(--button-background-dark);
    border-radius: var(--button-radius);
    padding: 1rem;

    .person__image {
      display: flex;
      align-items: center;
      flex: 1;

      img {
        border-radius: 50%;
        width: 5rem;
        height: 5rem;
        object-fit: contain;
        border: 2px solid var(--dark-header);
        box-shadow: var(--button-shadow);
      }
    }

    .person__details {
      flex: 2;
      text-align: center;

      h3 {
        font-weight: lighter;
        font-size: 1.2rem;
        text-shadow: var(--text-shadow-dark);
      }

      h3:nth-child(1) {
        text-transform: uppercase;
      }
    }

    .person__wish {
      flex: 1;

      button {
        display: block;
        border: none;
        outline: none;
        padding: 0.5rem 1rem;
        text-align: center;
        border-radius: var(--button-radius);
        width: 80%;
        margin: auto 10%;
        background-color: var(--button-background-light);
        color: var(--text-light);
        text-shadow: var(--text-shadow-dark);
        box-shadow: var(--button-shadow);
        cursor: pointer;
      }
    }
  }
`;

export default Birthday;
