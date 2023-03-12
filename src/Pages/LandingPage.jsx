import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import styled from "styled-components";
import Feature from "../components/Feature";

const LandingPage = () => {
  const { loginWithRedirect } = useAuth0();

  const featuresContent = [
    {
      title: "MADE FOR BHARAT",
      description:
        "We realized that Digital Learning is Broken. The youth in rural and semi-urban areas are not connected with high bandwidth internet. The minimal dependency on data makes Ekatra - MADE FOR BHARAT.",
      image: "/images/Feature0.svg",
    },
    {
      title: "1 CLICK LEARNING",
      description:
        "The system allows you to provide lessons over multiple channels - SMS, WhatsApp, Email, Video & Text from a single dashboard with just 1-click!",
      image: "/images/Feature1.svg",
    },
    {
      title: "LOW COST SOLUTION",
      description:
        "Students can now learn over text & audio medium without the need for a smartphone. We also have options for video and in-site hardware.",
      image: "/images/Feature2.svg",
    },
  ];

  return (
    <Container>
      <LeftSideContainer>
        <HeadingContainer>
          <Heading>EKATRA</Heading>
          <Description>
            An Integrated Education Platform for Under-Served Learners.
          </Description>
        </HeadingContainer>

        <Phone>
          <SensorContainer>
            <Sensor></Sensor>
          </SensorContainer>
          <Carousel>
            <Image src="/images/Landing_1.png" alt="" />
          </Carousel>
          <ClickButtonContainer>
            <ActionButton onClick={() => loginWithRedirect()}>
              <ActionButtonTitle>Login</ActionButtonTitle>
            </ActionButton>
          </ClickButtonContainer>
        </Phone>
      </LeftSideContainer>

      <FeaturesContainer>
        <FeaturesHeading>FEATURES</FeaturesHeading>
        {
            featuresContent.map((feature, index) => {
                return <Feature key={index} 
                src={feature.image}
                imgHeading={"0"+ (index+1) }
                descHeading={feature.title}
                desc={feature.description}
                />
            })

        }
      </FeaturesContainer>
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

const LeftSideContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
`;

const HeadingContainer = styled.div`
  margin-bottom: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Heading = styled.p`
  font-size: 2rem;
  letter-spacing: 0.4rem;
  font-weight: 600;
  color: #cda63c;
`;
const Description = styled.p`
  color: white;
  letter-spacing: 0.1rem;
`;

const Phone = styled.div`
  width: 19rem;
  height: 35rem;
  background-color: black;
  border-radius: 50px;
  border: 0.2rem solid #cda63c;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SensorContainer = styled.div`
  height: 12%;
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
  overflow: hidden;
  display: flex;
  border-radius: 10px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
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
  border: 2px solid #a1a4ab;
`;

const ActionButtonTitle = styled.span``;

const FeaturesContainer = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  & > div {
    margin-bottom: 10px;
  }
`;

const FeaturesHeading = styled.p`

    font-size: 2rem;
    letter-spacing: 0.4rem;
    font-weight: 600;
    color: #cda63c;
    margin-bottom:20px;
`;

export default LandingPage;
