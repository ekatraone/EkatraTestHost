import React from "react";
import styled from "styled-components";
import Button from "../components/Button";
import Table from "../components/Table";

const Cohort = () => {


  const columns = [
    { field: "name", headerName: "Name", minWidth: 250, maxWidth: 350 },

    { field: "number", headerName: "Contact Number", minWidth: 200, maxWidth: 350 },
    { field: "status", headerName: "Status", minWidth: 250, maxWidth: 350 },
    { field: "channel", headerName: "Channel", minWidth: 250, maxWidth: 350 },
    { field: "edit", headerName: "Edit", minWidth: 200, maxWidth: 300 },
  ];

  const rows = [
    {
      id: 1,
      name: "Jon",
      number:  "+" + 918930113390,
      status: 4,
      channel: "WhatsApp",
      edit:"EDIT / DELETE"
    },
    {
      id: 2,
      name: "Jon",
      number:  "+" + 918930113390,
      status: 4,
      channel: "WhatsApp",
      edit:"EDIT / DELETE"
    },
    {
      id: 3,
      name: "Jon",
      number:  "+" + 918930113390,
      status: 4,
      channel: "WhatsApp",
      edit:"EDIT / DELETE"
    },
    {
      id: 4,
      name: "Jon",
      number:  "+" + 918930113390,
      status: 4,
      channel: "WhatsApp",
      edit:"EDIT / DELETE"
    },
    {
      id: 5,
      name: "Jon",
      number:  "+" + 918930113390,
      status: 4,
      channel: "WhatsApp",
      edit:"EDIT / DELETE"
    },
    {
      id: 6,
      name: "Jon",
      number:  "+" + 918930113390,
      status: 4,
      channel: "WhatsApp",
      edit:"EDIT / DELETE"
    },
    {
      id: 7,
      name: "Jon",
      number:  "+" + 918930113390,
      status: 4,
      channel: "WhatsApp",
      edit:"EDIT / DELETE"
    },
    {
      id: 8,
      name: "Jon",
      number:  "+" + 918930113390,
      status: 4,
      channel: "WhatsApp",
      edit:"EDIT / DELETE"
    },
    {
      id: 9,
      name: "Jon",
      number:  "+" + 918930113390,
      status: 4,
      channel: "WhatsApp",
      edit:"EDIT / DELETE"
    },
  ];


  return (
    <Container>
      <Wrapper>
        <Title>{"Jan-to-Feb "} {"Batch 1"}</Title>
        <Table 
          isHavingOneButton
          columns={columns}
          rows = {rows}
        />
        <ButtonContainer>
          <Button title="Go Back" />
        </ButtonContainer>
      </Wrapper>
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
  align-items: center;
  min-height: 92vh;
  height: auto;
  width: 100%;
`;

const Wrapper = styled.div`
  background: white;
  width: 100%;
  margin: 0 0.6rem;
  min-height: 80vh;
  height: auto;
  border-radius: 0.6rem;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin-left: 1.2rem;
  margin-top:0.6rem;
  padding: 0.4rem 0 0 0.4rem;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content:flex-end;
    margin:0.6rem 1.3rem;
`;

export default Cohort;