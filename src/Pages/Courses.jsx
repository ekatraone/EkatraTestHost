import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CourseCard from "../components/CourseCard";
import AddNewCard from "../components/AddNewCard";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Courses = () => {
  const [records, setRecords] = useState([]);

  const { user } = useAuth0();

  const getRecords = async () => {
    //INTEGRATED
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_BASE_URL}/courses/getCourses`,
      {
        headers: {
          user: user?.sub,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    const data = await response.json();
    
    setRecords(data);
  };

  useEffect(() => {
    user && getRecords();
  }, []);

  return (
    <Container>
      <Link to="/courses/addcourse">
        <AddNewCard src="/images/CourseCard.svg" title="Add a new course" />
      </Link>

      {records.map((record) => {
        return (
          <>
            <CourseCard
              title={record.fields.CourseName}
              desc={record.fields.Desc}
              // src={`/images/${record.fields.CourseName}.svg`}
              src="/images/Programming.svg"
              record={record}
              key={record.id}
            />
          </>
        );
      })}


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
  min-height: 92vh;
  height: auto;
  flex-wrap: wrap;
  justify-content: center;
`;

export default Courses;
