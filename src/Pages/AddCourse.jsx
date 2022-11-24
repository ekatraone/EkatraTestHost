import {
  AddCircleOutlineOutlined,
  KeyboardArrowLeftSharp,
  KeyboardArrowRightSharp,
  UploadOutlined,
} from "@mui/icons-material";
import { TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";

const AddCourse = () => {
  const [filters, setFilter] = useState({});
  const [days, setDays] = useState(7);
  let daysArr = new Array(days).fill("").map((val, idx) => idx + 1);
  useEffect(() => {
    console.log("rendered");
  });

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

  const handleAddDay = (e) => {
    setDays((previouVal) => previouVal + 1);
  };

  // console.log(filters);

  return (
    <Container>
      <Wrapper>
        <Title>New Course</Title>
        <Form noValidate autoComplete="off">
          <TopContainer>
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
                </Filter>
              </FilterContainer>
            </RightContainer>
          </TopContainer>
          <BottomContainer>
            <Carousel>
              <KeyboardArrowLeftSharp />
              <CarouselDayContainer>
                {daysArr.map((day) => (
                  <CarouselDay key={day}>Day {day}</CarouselDay>
                ))}
              </CarouselDayContainer>
              <KeyboardArrowRightSharp right />
              <ActionButton onClick={handleAddDay}>
                <AddCircleOutlineOutlined />
                <ActionButtonTitle>Add Day</ActionButtonTitle>
              </ActionButton>
            </Carousel>
            <CourseContentContainer>
              <CourseContentWrapper>
                <ParagraphContainer>
                  <TextField
                    label="Paragraph"
                    variant="outlined"
                    required
                    color="primary"
                    multiline
                    fullWidth
                    rows={4}
                    margin="normal"
                  />
                </ParagraphContainer>
                <MediaContainer>
                  <TextField
                    label="Media"
                    variant="outlined"
                    required
                    color="primary"
                    fullWidth
                    margin="normal"
                  />
                  <UploadOutlined />
                </MediaContainer>
              </CourseContentWrapper>
              <ActionButton two>
                <AddCircleOutlineOutlined />
                <ActionButtonTitle>Add Paragraph</ActionButtonTitle>
              </ActionButton>
            </CourseContentContainer>
          </BottomContainer>
          <ButtonContainer>
            <Link to="/courses">
              <Button title="Cancel" />
            </Link>
            <Button title="Add Course" type="Primary" />
          </ButtonContainer>
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
  max-width: 100%;
`;

const Wrapper = styled.div`
  background: white;
  width: 100%;
  margin: 0 0.6rem;
  min-height: 84vh;
  height: auto;
  border-radius: 0.6rem;
`;

const Title = styled.h3`
  font-size: 24px;
  color: #1e1e1e;
  padding: 1rem 2rem 1rem 2rem;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 2rem;
`;

const TopContainer = styled.div`
  display: flex;
  flex: 1;
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
  border-radius: 0.4rem;
`;
const Option = styled.option`
  /* color:#C4C4C4; */
`;

const BottomContainer = styled.div``;

const Carousel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  /* max-width:100vw; */
  svg {
    color: rgba(34, 124, 157, 1);
    background: rgba(34, 124, 157, 0.05);
    padding: 0.1rem;
    border-radius: 50%;
    margin: 0 20px;
    cursor: pointer;
  }
`;

const CarouselDayContainer = styled.div`
  display: flex;
  overflow: scroll;
  scroll-snap-type: x mandatory;
  width: 62%;
  max-width: 65vw;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const CarouselDay = styled.span`
  background: rgba(34, 124, 157, 0.05);
  border-radius: 5px 5px 0px 0px;
  padding: 0.6rem;
  text-align: center;
  min-width: 6rem;
  max-width: 6rem;
  cursor: pointer;

  :not(:last-child) {
    margin-right: 10px;
  }
`;

const ActionButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #227c9d;
  border-radius: 0.3rem;
  color: white;
  ${({ two }) =>
    two &&
    `
    margin-top:1rem;
    display: flex;
    width:150px;
  `}
  padding: 0.3rem 0.5rem;

  cursor: pointer;
  /* margin-bottom:10px; */
  svg {
    margin-left: 0;
    margin-right: 0.3rem;
    color: #fff;
  }
`;
const ActionButtonTitle = styled.span``;
const CourseContentContainer = styled.div`
  width: 100%;
  height: 250px;
  background: rgba(34, 124, 157, 0.05);
  display: flex;
  padding: 1rem;
  flex-direction: column;
  height: max-content;
`;

const CourseContentWrapper = styled.div`
  display: flex;
  flex: 1;
  height: max-content;
`;

const ParagraphContainer = styled.div`
  flex: 1;
  margin-right: 6rem;
`;
const MediaContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  svg {
    color: #545353;
    background: white;
    padding: 0.2rem;
    border-radius: 0.3rem;
    width: 35px;
    height: 35px;
    cursor: pointer;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export default AddCourse;
