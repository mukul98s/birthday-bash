import React from "react";
import styled from "styled-components";

import { Header } from "../Components";

const UserProfile = () => {
  return (
    <Wrapper>
      <Header />
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

        <div>
          <h1>Recently Wished</h1>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 3rem auto;
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
          font-size: 2rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          margin-bottom: 0.5rem;
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
    font-size: 1.6rem;
  }
`;

export default UserProfile;
