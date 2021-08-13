import React from "react";
import styled from "styled-components";
import { Link, useRouteMatch } from "react-router-dom";
import { BiHomeCircle } from "react-icons/bi";
import { BsSearch, BsPlusSquare } from "react-icons/bs";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import Badge from "@material-ui/core/Badge";

const BottomNavbar = () => {
  const { url } = useRouteMatch();
  return (
    <Wrapper>
      <nav>
        <div>
          <Link to={`${url}/feed`}>
            <BiHomeCircle />
          </Link>
        </div>
        <div>
          <Link to={`${url}/search`}>
            <BsSearch />
          </Link>
        </div>
        <div>
          <Link to={`${url}/addUser`}>
            <BsPlusSquare />
          </Link>
        </div>
        <div>
          <Link to={`${url}/notification`}>
            <Badge
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              color="error"
              badgeContent={10}
              max={9}
            >
              <IoIosNotificationsOutline />
            </Badge>
          </Link>
        </div>
        <div>
          <Link to={`${url}/profile`}>
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
