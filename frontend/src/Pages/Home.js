import React from "react";
import styled from "styled-components";
import { Header, Social } from "../Components";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import cake from "../assets/cake.svg";

const Home = () => {
  return (
    <Wrapper>
      <Header />
      <section className="container">
        <motion.div
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          initial={{ scale: 2, opacity: 0, rotate: 180 }}
          className="banner"
        >
          <img src={cake} alt="cake" />
        </motion.div>
        <div>
          <motion.div initial={{ x: 1000 }} animate={{ x: 0 }}>
            <Link className="button link-button" to="/login">
              login
            </Link>
          </motion.div>
          <motion.div initial={{ x: -1000 }} animate={{ x: 0 }}>
            <Link className="button link-button" to="/signup">
              Signup
            </Link>
          </motion.div>
        </div>

        <article>
          <h4>Or sign up</h4>
        </article>
        <Social />
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .banner {
    margin: 5rem 15%;
    width: 70%;

    @media screen and (min-width: 768px) {
      margin: 7rem 10%;
      width: 80%;
    }

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
      @media screen and (min-width: 768px) {
        font-size: 1.5rem;
        top: -18px;
      }
    }
  }

  @media screen and (min-width: 768px) {
    .container div:nth-child(2) {
      display: flex;
      justify-content: space-evenly;

      a {
        flex: 1;
      }
    }
  }
`;

export default Home;
