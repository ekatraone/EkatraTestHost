import {
  AddCircleOutlineOutlined,
  KeyboardArrowLeftSharp,
  KeyboardArrowRightSharp,
  UploadOutlined,
} from "@mui/icons-material";
import { TextField } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";

import { useAuth0 } from "@auth0/auth0-react";

const AddCourse = () => {
  const [formContent, setFormContent] = useState({});
  const [days, setDays] = useState(7);

  const [currentDay, setCurrentDay] = useState(1);

  const location = useLocation();
  const id = location.pathname.split("/")[3];
  let courseContent = "";

  typeof location.state === "string" &&
    (courseContent = JSON.parse(location.state));

  const [daysContent, setDaysContent] = useState({
    day1: [{ paragraph: "", media: "" }],
    day2: [{ paragraph: "", media: "" }],
    day3: [{ paragraph: "", media: "" }],
    day4: [{ paragraph: "", media: "" }],
    day5: [{ paragraph: "", media: "" }],
    day6: [{ paragraph: "", media: "" }],
    day7: [{ paragraph: "", media: "" }],
  });

  const { user } = useAuth0();
  const history = useHistory();

  let daysArr = new Array(days).fill("").map((val, idx) => idx + 1);

  const handleForm = (e) => {
    const valueF = e.target.value;
    const name = e.target.name;
    setFormContent(
      (value) =>
        (value = {
          ...value,
          [name]: valueF,
        })
    );
  };

  const categoryOptions = useMemo(() => {
    return [
      { value: "Selected", label: "Select a Category" },
      { value: "Programming", label: "Programming" },
      { value: "WildLife", label: "WildLife" },
      { value: "Environment", label: "Environment" },
    ];
  }, []);

  const LanguageOptions = useMemo(() => {
    return [
      { value: "Selected", label: "Select a Language" },
      { value: "English", label: "English" },
      { value: "Hindi", label: "Hindi" },
      { value: "Marathi", label: "Marathi" },
    ];
  }, []);

  const handleDaysData = (index, e) => {
    const value = e.target.value;
    const name = e.target.name;

    setDaysContent((previousVal) => {
      return {
        ...previousVal,
        ["day" + currentDay]: previousVal["day" + currentDay].map(
          (item, idx) => {
            if (idx === index) {
              return {
                ...item,
                [name]: value,
              };
            } else {
              return item;
            }
          }
        ),
      };
    });
  };

  const handleAddDay = () => {
    setDays((previouVal) => previouVal + 1);
  };

  const handleAddParagraph = () => {
    setDaysContent((previousVal) => {
      return {
        ...previousVal,
        ["day" + currentDay]: [
          ...previousVal["day" + currentDay],
          { media: "", paragraph: "" },
        ],
      };
    });
  };

  const handleSingleDay = (day) => {
    setCurrentDay(day);
    !daysContent.hasOwnProperty("day" + day) &&
      setDaysContent((previousVal) => {
        return {
          ...previousVal,
          ["day" + day]: [{ media: "", paragraph: "" }],
        };
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //TODO: Make a POST request to the server

    const records = {
      fields: {
        CourseName: formContent.courseName,
        InstructorName: formContent.instructorName,
        Desc: formContent.desc,
        Category: formContent.category,
        Language: formContent.language,
        Days: JSON.stringify(daysContent),
        User: user.sub,
      },
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/courses/createCourse`,
        {
          method: "POST",
          body: JSON.stringify(records),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // console.log(response);
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      alert("Course Added Successfully");
      // console.log(data);
      history.push("/courses");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const records = {
      fields: {
        CourseName: formContent.courseName,
        InstructorName: formContent.instructorName,
        Desc: formContent.desc,
        Category: formContent.category,
        Language: formContent.language,
        Days: JSON.stringify(daysContent),
        User: user.sub,
      },
    };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/courses/updateCourse`,
        {
          method: "PATCH",
          body: JSON.stringify(records),
          headers: {
            id: id,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        alert("Course Updated Successfully");
        // console.log(data);
        history.push("/courses");
      }
    } catch (error) {
      console.log(error);
    }
  };



  useEffect(() => {
    if (id) {
      let daysData;
      typeof courseContent?.fields?.Days === "string" &&
        (daysData = JSON.parse(courseContent?.fields?.Days));
      // console.log(daysData);
      setDaysContent(daysData);
      setFormContent({
        courseName: courseContent?.fields.CourseName,
        instructorName: courseContent?.fields.InstructorName,
        desc: courseContent?.fields.Desc,
        category: courseContent?.fields.Category,
        language: courseContent?.fields.Language,
      });
    }
  }, []);

  return (
    <Container>
      <Wrapper>
        <Title>{id ? "Update Course" : "New Course"}</Title>
        <Form noValidate autoComplete="off">
          <TopContainer>
            <LeftContainer>
              <TextField
                label="Course Name"
                variant="outlined"
                required
                name="courseName"
                // color="primary"
                fullWidth
                margin="normal"
                onChange={handleForm}
                value={formContent.courseName ? formContent.courseName : ""}
              />
              <TextField
                label="Brief Description"
                variant="outlined"
                name="desc"
                required
                color="primary"
                fullWidth
                multiline
                rows={4}
                onChange={handleForm}
                value={formContent.desc ? formContent.desc : ""}
              />
            </LeftContainer>
            <RightContainer>
              <TextField
                label="Course Instructor Name"
                required
                name="instructorName"
                color="primary"
                fullWidth
                margin="normal"
                onChange={handleForm}
                value={
                  formContent.instructorName ? formContent.instructorName : ""
                }
              />
              <FilterContainer>
                <Filter>
                  <SingleFilterContainer>
                    <FilterText>Category</FilterText>
                    <Select name="category" onChange={handleForm} required>
                      {categoryOptions.map((option, index) => (
                        <Option
                          key={index}
                          selected={
                            id
                              ? formContent.category === option.value
                              : option.value === "Selected"
                          }
                        >
                          {option.label}
                        </Option>
                      ))}
                    </Select>
                  </SingleFilterContainer>

                  <SingleFilterContainer>
                    <FilterText>Language</FilterText>
                    <Select name="language" onChange={handleForm} required>
                      {LanguageOptions.map((option, index) => (
                        <Option
                          key={index}
                          selected={
                            id
                              ? formContent.language === option.value
                              : option.value === "Selected"
                          }
                        >
                          {option.label}
                        </Option>
                      ))}
                    </Select>
                  </SingleFilterContainer>
                </Filter>
              </FilterContainer>
            </RightContainer>
          </TopContainer>
          {/* make the BottomContainer in such a way that each CarouselDay has its
          own CourseContentContainer and on click of each day the
          CourseContentContainer becomes active for each CarouselDay */}

          <BottomContainer>
            <Carousel>
              <KeyboardArrowLeftSharp />
              <CarouselDayContainer>
                {daysArr.map((day) => (
                  <CarouselDay
                    key={day}
                    onClick={() => handleSingleDay(day)}
                    main={{ active: currentDay === day ? "active" : "" }}
                  >
                    Day {day}
                  </CarouselDay>
                ))}
              </CarouselDayContainer>
              <KeyboardArrowRightSharp right />
              <ActionButton onClick={handleAddDay}>
                <AddCircleOutlineOutlined />
                <ActionButtonTitle>Add Day</ActionButtonTitle>
              </ActionButton>
            </Carousel>
            <CourseContentContainer>
              {daysContent["day" + currentDay]?.map((dayContent, index) => (
                <CourseContentWrapper key={index}>
                  <ParagraphContainer>
                    <TextField
                      label="Paragraph"
                      variant="outlined"
                      required
                      color="primary"
                      value={dayContent.paragraph}
                      multiline
                      fullWidth
                      name={`paragraph`}
                      rows={4}
                      margin="normal"
                      onChange={(event) => handleDaysData(index, event)}
                    />
                  </ParagraphContainer>
                  <MediaContainer>
                    <TextField
                      label="Media"
                      variant="outlined"
                      required
                      color="primary"
                      fullWidth
                      value={dayContent.media}
                      margin="normal"
                      name={`media`}
                      onChange={(event) => handleDaysData(index, event)}
                    />
                    <UploadOutlined />
                  </MediaContainer>
                </CourseContentWrapper>
              ))}
              <ActionButton two onClick={handleAddParagraph}>
                <AddCircleOutlineOutlined />
                <ActionButtonTitle>Add Paragraph</ActionButtonTitle>
              </ActionButton>
            </CourseContentContainer>
          </BottomContainer>
          <ButtonContainer>
            <Link to="/courses">
              <Button title="Cancel" />
            </Link>
            {id ? (
              <Button
                func={handleUpdate}
                title="Update Course"
                type="Primary"
              />
            ) : (
              <Button func={handleSubmit} title="Add Course" type="Primary" />
            )}
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
  background: ${({ main }) => (main.active ? "rgba(34, 124, 157, 0.05)" : "")};

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
  height: 30vh;
  max-height: 30vh;
  overflow: scroll;
  scroll-snap-type: y mandatory;
  &::-webkit-scrollbar {
    display: none;
  }
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
