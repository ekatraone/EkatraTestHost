import React from "react";
import { keyframes } from "styled-components";
import styled from "styled-components";

const Loading = () => {
  return (
    <Container>
      <Spinner />
      <LoadingMessage>Loading...</LoadingMessage>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;

// Define a keyframe animation for the loading spinner
const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// Define a styled component for the loading spinner
const Spinner = styled.div`
  display: inline-block;
  width: 40px;
  height: 40px;
  border: 4px solid #f2f2f2;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: ${rotate360} 2s linear infinite;
`;

// Define a styled component for the loading message
const LoadingMessage = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-left:20px;
  
`;

export default Loading;
