import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import styled from "styled-components";

const LandingPage = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Container>
      {/* <ActionButton onClick={() => loginWithRedirect()}>
        <ActionButtonTitle>Login</ActionButtonTitle>
      </ActionButton> */}

      <Phone>
        <SensorContainer>
          <Sensor></Sensor>
        </SensorContainer>
        <Carousel></Carousel>
        <ClickButtonContainer>
          <ActionButton onClick={() => loginWithRedirect()}>
            <ActionButtonTitle>Login</ActionButtonTitle>
          </ActionButton>
        </ClickButtonContainer>
      </Phone>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;

const Phone = styled.div`
  width: 18rem;
  height: 32rem;
  background-color: black;
  border-radius: 50px;
  /* Gold shade color border */
  border: 0.2rem solid #cda63c;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SensorContainer = styled.div`
  height: 15%;
  display: flex;
  justify-content: center;
  position: relative;
`;

const Sensor = styled.div`
  width: 4.5rem;
  height: 0.5rem;
  position: absolute;
  top: 15px;
  border-radius: 15px;
  background-color: #34d1b6;
`;

const Carousel = styled.div`
  flex: 2;
  height: 100%;
  color: white;
  background-color: #cda63c;
  height: 70%;
  width: 80%;
  border-radius: 10px;
`;
const ClickButtonContainer = styled.div`
  color: white;
  height: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const ActionButton = styled.div`
  background: #227c9d;
  border-radius: 14px;
  color: white;
  padding: 0.3rem 0.5rem;
  cursor: pointer;
  width: 100px;
  text-align: center;
`;

const ActionButtonTitle = styled.span``;

export default LandingPage;
