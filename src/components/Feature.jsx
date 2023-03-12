import React from "react";
import styled from "styled-components";

const Feature = ({ src, imgHeading, descHeading, desc, right }) => {
  return (
    <Container>
      <ImageSection>
        <Image src={src} alt="" />
        <ImageHeading>{imgHeading}</ImageHeading>
      </ImageSection>
      <Partition></Partition>
      <DescriptionContainer>
        <DescriptionHeading>{descHeading}</DescriptionHeading>
        <DescriptionText>
          {desc}
        </DescriptionText>
      </DescriptionContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 500px;
  height: 250px;
  position: relative;
`;

const ImageSection = styled.div`
  background-color: white;
  padding: 20px;
  height: 150px;
  width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-right: 20px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
`;


const ImageHeading = styled.p`
  position: absolute;
  top: -50px;
  left: -31px;
  color: #34d1b6;
  font-size: 91px;
  font-weight: bolder;
  letter-spacing: 0.2rem;
`;

const Partition = styled.div`
  height: 20%;
  border: 2px dashed #bebabb;
  position: absolute;
  left: 45.5%;
  top: 4%;
`;
const DescriptionContainer = styled.div`
  width: 90%;
  color: white;
`;

const DescriptionHeading = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: 0.2rem;
  color: #cda63c;
  margin-bottom: 1rem;
  text-align: center;
`;
const DescriptionText = styled.p`
  letter-spacing: 0.1rem;
`;

export default Feature;
