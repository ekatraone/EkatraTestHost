import { TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import styled from "styled-components";

const AddCourse = () => {
  const [filters, setFilter] = useState({});

  const handleFilters = (e) => {
    const valueF = e.target.value;
    const name = e.target.name;
    setFilter(
      (value) =>
        (value = {
          ...value,
          [name]: valueF,
        })
    );
  };

  console.log(filters);

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
            <FilterContainer>
              <Filter>
                <SingleFilterContainer>
                  <FilterText>Category</FilterText>
                  {/* <Select name="color" onChange={handleFilters}> */}
                  <Select name="category" onChange={handleFilters} required>
                    <Option disabled selected>
                      Select Category
                    </Option>
                    <Option>Programming</Option>
                    <Option>WildLife</Option>
                    <Option>green</Option>
                  </Select>
                </SingleFilterContainer>

                <SingleFilterContainer>
                  <FilterText>Language</FilterText>
                  <Select name="language" onChange={handleFilters} required>
                    <Option disabled selected>
                      Language
                    </Option>
                    <Option>Hindi</Option>
                    <Option>English</Option>
                    <Option>Marathi</Option>
                  </Select>
                </SingleFilterContainer>

                {/* <Select name="size" onChange={handleFilters}> */}
              </Filter>
            </FilterContainer>
          </RightContainer>
        </Form>
        <h3>JAHHJSJH</h3>
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
  min-height: 83vh;
  height: auto;
  border-radius: 0.6rem;
`;

const Title = styled.h3`
  /* font-weight: 700; */
  font-size: 24px;
  color: #1e1e1e;
  padding:1rem 2rem 1rem 2rem;
`;
const Form = styled.form`
  display: flex;
  justify-content: space-between;
  margin: 0 2rem;
`;
const LeftContainer = styled.div`
  flex: 1;
  margin-right: 6rem;
`;
const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const FilterContainer = styled.div``;
const SingleFilterContainer = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Filter = styled.div`
  margin-top: 20px;
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  /* width:200px; */
  font-size: 18px;
  font-weight: 700;
  line-height: 17px;
`;

const Select = styled.select`
  padding: 10px;
  width: 20rem;
  border: 1px solid #c4c4c4;
  border-radius: 0.3rem;
`;
const Option = styled.option`
  /* color:#C4C4C4; */
`;

export default AddCourse;
