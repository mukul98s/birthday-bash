import React from "react";
import styled from "styled-components";
import { motion, useViewportScroll, useTransform } from "framer-motion";

const Header = () => {
  const { scrollYProgress } = useViewportScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
  return (
    <Wrapper>
      <motion.header
        initial={{ y: -100, scale: 10 }}
        animate={{ y: 0, scale: 1 }}
        when="afterChildren"
        style={{ scale: scale }}
      >
        <div style={{ scaleY: scrollYProgress }}>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Birthday Bash
          </motion.h1>
        </div>
      </motion.header>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  overflow: hidden;
  header {
    background-color: var(--dark-header);

    h1 {
      text-align: center;
      padding: 20px 10px;
      font-weight: 700;
      text-transform: uppercase;
      font-size: 2.25rem;
      letter-spacing: var(--letter-spacing-advance);
      text-shadow: var(--text-shadow-dark);
      color: var(--color-primary);
      font-family: "Shadows Into Light", cursive;

      @media screen and (min-width: 768px) {
        font-size: 3rem;
      }
    }
  }
`;

export default Header;
