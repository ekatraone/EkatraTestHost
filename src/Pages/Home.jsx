import React from "react";
import styled from "styled-components";
import Card from "../components/Card";
import Table from "../components/Table";

const Home = () => {

  const columns = [
    { field: "name", headerName: "Name", minWidth: 250, maxWidth: 350 },
    {
      field: "modules",
      headerName: "Number Of Modules",
      minWidth: 200,
      maxWidth: 350,
    },
    { field: "tests", headerName: "Test Taken", minWidth: 200, maxWidth: 350 },
    {
      field: "avgScore",
      headerName: "Average Score",
      minWidth: 250,
      maxWidth: 350,
    },
    { field: "channel", headerName: "Channel", minWidth: 250, maxWidth: 350 },
  ];

  const rows = [
    {
      id: 1,
      name: "Jon",
      modules: 4,
      tests: 3,
      avgScore: 89,
      channel: "WhatsApp",
    },
    {
      id: 2,
      name: "Cersei",
      modules: 4,
      tests: 3,
      avgScore: 79,
      channel: "WhatsApp",
    },
    {
      id: 3,
      name: "Jaime",
      modules: 4,
      tests: 3,
      avgScore: 59,
      channel: "WhatsApp",
    },
    {
      id: 4,
      name: "Arya",
      modules: 4,
      tests: 3,
      avgScore: 69,
      channel: "WhatsApp",
    },
    {
      id: 5,
      name: "Daenerys",
      modules: 4,
      tests: 3,
      avgScore: 81,
      channel: "WhatsApp",
    },
    {
      id: 6,
      name: "Jammy",
      modules: 4,
      tests: 3,
      avgScore: 82,
      channel: "WhatsApp",
    },
    {
      id: 7,
      name: "Ferrara",
      modules: 4,
      tests: 3,
      avgScore: 80,
      channel: "WhatsApp",
    },
    {
      id: 8,
      name: "Rossini",
      modules: 4,
      tests: 3,
      avgScore: 57,
      channel: "WhatsApp",
    },
    {
      id: 9,
      name: "Harvey",
      modules: 4,
      tests: 3,
      avgScore: 75,
      channel: "WhatsApp",
    },
  ];

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
      <Table 
        rows={rows}
        columns = {columns}
      />
    </Container>
  );
};

const Container = styled.main`
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
