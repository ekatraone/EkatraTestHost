import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import AddNewCard from "../components/AddNewCard";
import CohortCard from "../components/CohortCard";

const Cohorts = () => {
  return (
    <Container>
      <Link to="/cohorts/addcohort">
        <AddNewCard src="/images/NewCohortCard.svg" title="Add a new cohort" />
      </Link>
      <Link to="/cohorts/cohort/1" style={{"color":"inherit"}}>
        <CohortCard
          batchMonth="Jan-to-Mar"
          batchNumber="Batch 1"
          totalUsers="80"
          activeUsers="40"
          openQueries="20"
        />
      </Link>
      <CohortCard
        batchMonth="Mar-to-Apr"
        batchNumber="Batch 2"
        totalUsers="60"
        activeUsers="20"
        openQueries="10"
      />
      <CohortCard
        batchMonth="Apr-to-May"
        batchNumber="Batch 3"
        totalUsers="20"
        activeUsers="10"
        openQueries="0"
      />
      <CohortCard
        batchMonth="Jun-to-Jul"
        batchNumber="Batch 4"
        totalUsers="65"
        activeUsers="35"
        openQueries="10"
      />
      <CohortCard
        batchMonth="Jan-to-Mar"
        batchNumber="Batch 6"
        totalUsers="65"
        activeUsers="25"
        openQueries="10"
      />
    </Container>
  );
};

const Container = styled.div`
  padding: 0.5rem;
  background: rgb(115, 216, 206);
  background: linear-gradient(
    223deg,
    rgba(115, 216, 206, 0.5) 0%,
    rgba(255, 211, 140, 0.3) 100%
  );
  display: flex;
  min-height: 92vh;
  height: auto;
  flex-wrap: wrap;
  justify-content: center;
`;

export default Cohorts;
