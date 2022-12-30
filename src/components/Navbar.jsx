import React, { useEffect } from "react";
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
  const { loginWithRedirect, logout, isAuthenticated, user, isLoading } =
    useAuth0();

  useEffect(()=>{
    user?.sub && console.log("USer CHanged")
    //:TODO check if Authenticated and if yes then in airtable try to find the person with user.sub, if exists return the object and if doesnot exist upload data into the airtable.
    isAuthenticated && fetch("URL")
  },[user])

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
          {isAuthenticated ? (
            <ActionButton
              onClick={() => logout({ returnTo: window.location.origin })}
            >
              <AddCircleOutlineOutlined />
              <ActionButtonTitle>Logout</ActionButtonTitle>
            </ActionButton>
          ) : (
            <ActionButton onClick={() => loginWithRedirect()}>
              <AddCircleOutlineOutlined />
              <ActionButtonTitle>Login</ActionButtonTitle>
            </ActionButton>
          )}
          <CalendarMonthOutlined />
          <NotificationsOutlined />
        </ActionContainer>

        <EducatorContainer>
          <Partition></Partition>
          <Avatar src={user?.picture} />
          <EducatorDetailsContainer>
            <EducatorName>{user?.name}</EducatorName>
            {/* <EducatorSpecialization>Data Scientist</EducatorSpecialization> */}
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
  svg {
    margin-left: 0;
    margin-right: 0.3rem;
    color: #fff;
  }
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
const EducatorSpecialization = styled.span`
  color: #c4c4c4;
  font-weight: 400;
  font-size: 12px;
`;
const DottedDiv = styled.div``;

export default Navbar;
