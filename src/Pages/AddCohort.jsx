import React from "react";
import styled from "styled-components";
import Button from "../components/Button";
import Table from "../components/Table";

const AddCohort = () => {
  return (
    <Container>
      <Wrapper>
        <Title>Add Cohort</Title>
        <Table isHavingButton />
        <ButtonContainer>
          <Button title="Cancel" />
          <Button type="Primary" title="Add Cohort" />
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

export default AddCohort;
