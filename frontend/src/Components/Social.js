import React from "react";
import instagram from "../assets/instagram.svg";
import facebook from "../assets/facebook.svg";
import google from "../assets/google.svg";
import twitter from "../assets/twitter.svg";
import styled from "styled-components";

import { motion } from "framer-motion";

const iconVariant = {};

const Social = () => {
  return (
    <Wrapper>
      <motion.div
        initial={{ y: 100, scale: 10 }}
        animate={{ y: 0, scale: 1 }}
        className="button-group"
      >
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
      </motion.div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 3rem auto;
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
