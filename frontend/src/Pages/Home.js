import React from "react";
import styled from "styled-components";
import cake from "../assets/cake.svg";
import instagram from "../assets/instagram.svg";
import facebook from "../assets/facebook.svg";
import google from "../assets/google.svg";
import twitter from "../assets/twitter.svg";

const Home = () => {
  return (
    <Wrapper>
      <header>
        <div className="container">
          <h1>Birthday Bash</h1>
        </div>
      </header>
      <section className="container">
        <div className="banner">
          <img src={cake} alt="cake" />
        </div>
        <div>
          <button className="button">Login</button>
          <button className="button">signup</button>
        </div>

        <article>
          <h4>Or sign up</h4>
        </article>

        <div className="button-group">
          <div>
            <img src={instagram} alt="" />
          </div>
          <div>
            <img src={google} alt="" />
          </div>
          <div>
            <img src={twitter} alt="" />
          </div>
          <div>
            <img src={facebook} alt="" />
          </div>
        </div>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  header {
    border-bottom: 2px solid white;

    h1 {
      text-align: center;
      padding: 20px 10px;
      font-weight: 700;
      text-transform: uppercase;
      font-size: 2.25rem;
      letter-spacing: var(--letter-spacing-basic);
      text-shadow: var(--text-shadow-dark);
    }
  }

  .banner {
    margin: 5rem 15%;
    width: 70%;

    img {
      width: 100%;
    }
  }

  article {
    border-top: var(--border-light);
    margin: 5rem auto 3rem;

    h4 {
      position: relative;
      top: -13px;
      text-align: center;
      background-color: var(--background-dark);
      width: 40%;
      left: 50%;
      transform: translateX(-50%);
      font-weight: 700;
      font-size: 1.2rem;
      text-transform: uppercase;
    }
  }

  .button-group {
    padding: 0 1rem;
    display: flex;
    justify-content: space-between;

    div {
      width: 3rem;

      img {
        width: 100%;
      }
    }
  }
`;

export default Home;
