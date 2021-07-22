import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { BiHomeCircle } from "react-icons/bi";
import { BsSearch, BsPlusSquare } from "react-icons/bs";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
const BottomNavbar = () => {
  return (
    <Wrapper>
      <nav>
        <div>
          <Link to="/home">
            <BiHomeCircle />
          </Link>
        </div>
        <div>
          <Link>
            <BsSearch />
          </Link>
        </div>
        <div>
          <Link>
            <BsPlusSquare />
          </Link>
        </div>
        <div>
          <Link>
            <IoIosNotificationsOutline />
          </Link>
        </div>
        <div>
          <Link to="/profile">
            <CgProfile />
          </Link>
        </div>
      </nav>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-top: 5rem;
  nav {
    background: var(--dark-header);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;

    svg {
      font-size: 1.5rem;
      color: white;
    }
  }
`;

export default BottomNavbar;
