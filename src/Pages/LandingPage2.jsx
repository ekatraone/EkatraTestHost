import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import styled from "styled-components";
import Feature from "../components/Feature";

const LandingPage = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Container>
        <Box>
            <Heading>Educator Login</Heading>
            <ActionButton onClick={() => loginWithRedirect()}>
                <ActionButtonTitle>Login</ActionButtonTitle>
            </ActionButton>
        </Box>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  padding:0.8rem;
  align-items: center;
  justify-content: space-around;
  background-color: #1a323d;
`;

const Box = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    min-width: 30%;
    height: 20%;
    border-radius: 1rem;
    box-shadow: 0 0 0.5rem 0.1rem #000000;
    padding: 1rem;
`;

const Heading = styled.p`
    font-size: 2rem;
    letter-spacing: 0.4rem;
    font-weight: 600;
    color: #cda63c;
`;

const ActionButton = styled.div`
  background: #227c9d;
  border-radius: 14px;
  color: white;
  padding: 0.3rem 0.5rem;
  cursor: pointer;
  width: 100px;
  text-align: center;
  border: 2px solid #a1a4ab;
  margin-top: 1rem;
`;

const ActionButtonTitle = styled.span``;



export default LandingPage;
