import React from "react";
import instagram from "../assets/instagram.svg";
import facebook from "../assets/facebook.svg";
import google from "../assets/google.svg";
import twitter from "../assets/twitter.svg";
import styled from "styled-components";

const Social = () => {
  return (
    <Wrapper>
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
    </Wrapper>
  );
};

const Wrapper = styled.div`
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

export default Social;
