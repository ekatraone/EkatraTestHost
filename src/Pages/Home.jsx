import React from "react";
import styled from "styled-components";
import Card from "../components/Card";
import Table from "../components/Table";

const Home = () => {
  return (
    <Container>
      <CardContainer>
        <Card
          title="Learners"
          statsNum="500"
          statsDen=""
          statsPercent="12"
          isPositive
          img="/images/Card1.svg"
        />
        <Card
          title="Completed"
          statsNum="75"
          statsDen="500"
          statsPercent="17"
          isPositive
          img="/images/Card2.svg"
        />
        <Card
          title="In Progress"
          statsNum="375"
          statsDen="500"
          statsPercent="12"
          isPositive
          img="/images/Card3.svg"
        />
        <Card
          title="In Progress"
          statsNum="50"
          statsDen="500"
          statsPercent="7"
          img="/images/Card4.svg"
        />
      </CardContainer>
      <Table />
    </Container>
  );
};

const Container = styled.section`
  padding: 0.5rem;
  background: rgb(115, 216, 206);
  background: linear-gradient(
    223deg,
    rgba(115, 216, 206, 0.5) 0%,
    rgba(255, 211, 140, 0.3) 100%
  );
  display: flex;
  flex-direction: column;
  min-height: 92vh;
  height: auto;
`;
const CardContainer = styled.div`
  margin: 2rem  0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

export default Home;
