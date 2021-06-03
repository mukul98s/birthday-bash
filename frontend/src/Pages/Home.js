import React from "react";
import styled from "styled-components";
import axios from "axios";
import { Header, Social } from "../Components";
import { Link } from "react-router-dom";

import cake from "../assets/cake.svg";

const Home = () => {
  axios
    .post("http://localhost:4000/api/v1/login/", {
      email: "mukul@gmail.com",
      password: "123456789",
    })
    .then((res) => console.log(res.data));

  return (
    <Wrapper>
      <Header />
      <section className="container">
        <div className="banner">
          <img src={cake} alt="cake" />
        </div>
        <div>
          <Link className="button link-button" to="/login">
            login
          </Link>
          <Link className="button link-button" to="/signup">
            Signup
          </Link>
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
`;

export default Home;
