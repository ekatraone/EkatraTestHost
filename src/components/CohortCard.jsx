import React from "react";
import styled from "styled-components";

const CohortCard = ({
  batchMonth,
  batchNumber,
  totalUsers,
  activeUsers,
  openQueries,
}) => {
  return (
    <Container>
      <UpperContainer>
        <BatchMonth>{batchMonth}</BatchMonth>
        <BatchNumber>{batchNumber}</BatchNumber>
      </UpperContainer>
      <LowerContainer>
        <Button primary>
          <ButtonStat>{totalUsers}</ButtonStat>
          <ButtonTitle>Total Users</ButtonTitle>
        </Button>

        <Button secondary>
          <ButtonStat>{activeUsers}</ButtonStat>
          <ButtonTitle>Active Users</ButtonTitle>
        </Button>

        <Button>
          <ButtonStat>{openQueries}</ButtonStat>
          <ButtonTitle>Open Queries</ButtonTitle>
        </Button>
      </LowerContainer>
    </Container>
  );
};

const Container = styled.div`
  margin: 1rem;
  width: 29rem;
  height: 18rem;
  display: flex;
  background: #fff;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  border-radius: 0.8rem;
`;
const UpperContainer = styled.div``;
const BatchMonth = styled.h3`
  font-size: 32px;
  font-weight: 700;
  line-height: 39px;
`;
const BatchNumber = styled.p`
  font-size: 24px;
  font-weight: 400;
  line-height: 29px;
`;

const LowerContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
`;
const Button = styled.div`
  background-color: ${(props) =>
    props.primary
      ? "rgba(255, 203, 119, 0.2)"
      : props.secondary
      ? "rgba(23, 195, 178, 0.2)"
      : "rgba(254, 109, 115, 0.2)"};
  padding: 0.6rem;
  border-radius: 0.4rem;
  cursor: pointer;
  max-width: 30%;
  min-width: 25%;
`;
const ButtonStat = styled.p`
  font-size: 24px;
  font-weight: 700;
  line-height: 29px;
`;
const ButtonTitle = styled.span`
  font-size: 14px;
  font-weight: 500;
  line-height: 17px;
`;

export default CohortCard;
