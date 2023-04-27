import React, { useState } from "react";
import styled from "styled-components";
import {
  SearchOutlined,
  AddCircleOutlineOutlined,
  CalendarMonthOutlined,
  NotificationsOutlined,
  MoreVertOutlined,
} from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
  const { logout, user } = useAuth0();
  const [showLogOut, setShowLogOut] = useState(false);

  return (
    <Container>
      <LeftContainer>
        <SearchOutlined />
        <Input />
      </LeftContainer>

      <RightContainer>
        <ActionContainer>
          <Link to="/courses/addcourse">
            <ActionButton>
              <AddCircleOutlineOutlined />
              <ActionButtonTitle>Create Course</ActionButtonTitle>
            </ActionButton>
          </Link>

          <CalendarMonthOutlined />
          <NotificationsOutlined />
        </ActionContainer>

        <EducatorContainer onClick={() => setShowLogOut((val) => !val)}>
          <Partition></Partition>
          <Avatar src={user?.picture} />
          <EducatorDetailsContainer>
            <ActionButton
              onClick={() => logout({ returnTo: window.location.origin })}
              showLogOut={showLogOut}
              logout
            >
              <ActionButtonTitle>Logout</ActionButtonTitle>
            </ActionButton>
            <EducatorName>
              {user?.given_name ? user?.given_name : user?.nickname}
            </EducatorName>
          </EducatorDetailsContainer>
        </EducatorContainer>
        <MoreVertOutlined />
      </RightContainer>
    </Container>
  );
};

const Container = styled.nav`
  width: 100%;
  height: 8vh;
  padding: 0.5rem;
  border-bottom: 3px solid #f3f3f3;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: center;
  /* justify-content:center; */
  flex: 2;
  svg {
    color: #c4c4c4;
  }
`;

const Input = styled.input`
  border: none;
  width: 100%;
  padding: 0.5rem;
  color: #9f9c9c;
  font-size: 20px;
  &:focus {
    outline: none;
  }
`;

const Partition = styled.div`
  width: 0.1rem;
  height: 2rem;
  /* background-color: #c4c4c4; */
  border: 1px solid #c4c4c4;
  margin: 0 1rem;
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
  flex-basis: 30rem;
  justify-content: flex-end;
  gap: 2px;
  position: relative;
`;

const ActionContainer = styled.div`
  display: flex;
  align-items: center;
  svg {
    margin-left: 1.3rem;
    color: #227c9d;
  }
  * {
    cursor: pointer;
  }
`;
const ActionButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #227c9d;
  border-radius: 0.3rem;
  color: white;
  padding: 0.3rem 0.5rem;
  cursor: pointer;
  svg {
    margin-left: 0;
    margin-right: 0.3rem;
    color: #fff;
  }

  display: ${(props) => props.logout && "none"};

  ${(props) =>
    props.showLogOut &&
    `
    position: absolute;
    right: 32px;
    top: 52px;
    display: block;

    
  `}
`;
const ActionButtonTitle = styled.span``;

const EducatorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;
const EducatorDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0.5rem;
`;

const EducatorName = styled.span`
  color: #227c9d;
  font-weight: 600;
  font-size: 16px;
`;


export default Navbar;
