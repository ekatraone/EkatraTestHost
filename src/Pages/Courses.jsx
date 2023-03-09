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
    const data = await fetch(
      `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${
        import.meta.env.VITE_AIRTABLE_COURSE_TABLE_ID
      }?filterByFormula=User%3D'${user?.sub}'`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_KEY}`,
        },
        mode: "cors",
      }
    );
    const res = await data?.json();

    setRecords(res.records);
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

      {/* <CourseCard
        title="Programming"
        desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
            aliquam sunt voluptatum ut sed cupiditate. Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Ducimus aliquam sunt voluptatum
            ut sed cupiditate."
        src="/images/Programming.svg"
      /> */}
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
