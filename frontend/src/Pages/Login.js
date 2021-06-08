import React, { useState, useEffect } from "react";
import { Header, Social } from "../Components/";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";

import TextField from "@material-ui/core/TextField";
import cancel from "../assets/cancel.svg";
import { useAuth } from "../State/LoginState";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const emailRegex = /\w+@[A-Za-z]{1,8}\.[A-Za-z]{2,5}(\.[A-za-z]{2})*/i;

  const auth = useAuth();

  //this will redirect from here after successful login
  useEffect(() => {
    if (auth.user) {
      history.push("/username");
    }
  }, [auth.user, history]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email && password) {
      if (emailRegex.test(email)) {
        auth.login({ email, password });
      } else {
        // popup window
        console.log("write a valid email addrress");
      }
    } else {
      // pop up window
      console.log("Both email and password are required");
    }
  };

  return (
    <Wrapper>
      <Header />
      <div className="container">
        <div className="cross">
          <Link to="/">
            <img src={cancel} alt="" />
          </Link>
        </div>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            variant="standard"
            type="email"
            color="primary"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="standard"
            color="primary"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
      width: 1.5rem;
      margin: 1.5rem;

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
