import React from "react";
import styled from "styled-components";

const CohortCard = ({
  cohortName,
  batchName,
  totalUsers,
  activeUsers,
  openQueries,
  record
}) => {
  return (
    <Container onMouseOver={(e)=>{console.log(cohortName)}}>
      <UpperContainer>
        <BatchMonth>{cohortName}</BatchMonth>
        <BatchNumber>{batchName}</BatchNumber>
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
  -webkit-user-select: none; /* Safari */        
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */
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
