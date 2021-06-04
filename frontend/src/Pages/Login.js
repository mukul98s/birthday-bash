import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Header, Social } from "../Components/";
import TextField from "@material-ui/core/TextField";
import cancel from "../assets/cancel.svg";

const Login = () => {
  return (
    <Wrapper>
      <Header />
      <div className="container">
        <div className="cross">
          <Link to="/">
            <img src={cancel} alt="" />
          </Link>
        </div>
        <form>
          <TextField
            label="Email"
            variant="standard"
            color="primary"
            fullWidth
            required
          />
          <TextField
            label="Password"
            type="password"
            variant="standard"
            color="primary"
            fullWidth
            required
          />

          <button className="button">Login</button>
          <button className="small-button">Forget Password</button>
        </form>
        <article>
          <h4>Or Login</h4>
        </article>
        <Social />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .cross {
    width: 100%;
    display: flex;
    justify-content: flex-end;

    a {
      width: 2.25rem;
      margin: 2rem;

      img {
        width: 100%;
      }
    }
  }

  form {
    .MuiTextField-root {
      color: white;
      border-bottom: 2px var(--text-light) solid;
      margin: 2rem auto;
      label {
        color: var(--text-light);
      }
      input {
        color: var(--text-light);
        font-size: 1.2rem;
        font-weight: light;
      }
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

export default Login;
