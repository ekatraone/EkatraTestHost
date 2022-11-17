import { TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import styled from "styled-components";

const AddCourse = () => {
  return (
    <Container>
      <Wrapper>
        <Title>New Course</Title>
        <Form noValidate autoComplete="off">
          <LeftContainer>
            <TextField
              label="Course Name"
              variant="outlined"
              required
              // color="primary"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Brief Description"
              variant="outlined"
              required
              color="primary"
              fullWidth
              multiline
              rows={4}
            />
          </LeftContainer>
          <RightContainer>
            <TextField
              label="Course Instructor Name"
              required
              color="primary"
              fullWidth
              margin="normal"
            />
          </RightContainer>
        </Form>
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

const Title = styled.h3``;
const Form = styled.form`
  display: flex;
  justify-content: space-between;
  margin: 0 2rem;
`;
const LeftContainer = styled.div`
  flex: 1;
  margin-right:6rem;
`;
const RightContainer = styled.div`
  display: flex;
  justify-content:flex-end;
  flex:1
`;

export default AddCourse;
