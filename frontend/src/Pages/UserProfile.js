import React, { useCallback } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { pageAnimation } from "../animation";
import axios from "axios";
import { BASE_URL } from "../constant/baseUrl";

const UserProfile = () => {
  const logout = useCallback(async () => {
    try {
      const response = await axios.get(`${BASE_URL}/logout`);
      if (response.status === 200) {
        document.location.reload(true);
      }
      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return (
    <motion.div
      variants={pageAnimation}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <Wrapper>
        <div className="container">
          <main>
            <article>
              <aside>
                <img
                  src="https://wallpapercave.com/wp/mJRp4Xn.jpg"
                  alt="profileImage"
                />
              </aside>
              <aside>
                <h3>Steve Jobs</h3>
                <h4>Followers : 151M </h4>
                <h4>Following : 1 </h4>
              </aside>
            </article>
            <div>
              <p>
                Founder & CEO of Apple <br />
                Founder & ex-CEO of NeXT
                <br />
                ex-CEO of Pixar
              </p>
            </div>
          </main>
        </div>
        <div className="underline"></div>
        <div className="container">
          <div>
            <h1>Recently Wished</h1>
          </div>
        </div>
        <button className="button" onClick={() => logout()}>
          Logout
        </button>
      </Wrapper>
    </motion.div>
  );
};

const Wrapper = styled.div`
  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 2rem auto 1rem;
    padding: 1rem;
    gap: 1.5rem;
    article {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      aside:first-child {
        flex: 1;
        img {
          width: 100%;
          border-radius: 50%;
        }
      }
      aside:last-child {
        flex: 2;
        text-align: center;
        h3 {
          text-transform: uppercase;
          font-size: 1.5rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          margin-bottom: 0.5rem;
          text-shadow: var(--text-shadow-dark);
        }
        h4 {
          font-weight: normal;
          letter-spacing: var(--letter-spacing-basic);
          text-transform: capitalizes;
        }
      }
    }
    div p {
      letter-spacing: var(--letter-spacing-basic);
    }
  }
  div h1 {
    text-transform: uppercase;
    text-align: center;
    font-weight: normal;
    letter-spacing: var(--letter-spacing-basic);
    font-size: 1rem;
    margin: 1rem auto;
  }
`;

export default UserProfile;
