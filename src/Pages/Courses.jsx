import React from "react";
import styled from "styled-components";
import CourseCard from "../components/CourseCard";
import AddNewCard from "../components/AddNewCard";
import { Link } from "react-router-dom";

const Courses = () => {
  return (
    <Container>
      <Link to="/courses/addcourse">
        <AddNewCard src="/images/CourseCard.svg" title="Add a new course" />
      </Link>
      <CourseCard
        title="Programming"
        desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
            aliquam sunt voluptatum ut sed cupiditate. Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Ducimus aliquam sunt voluptatum
            ut sed cupiditate."
        src="/images/Programming.svg"
      />
      <CourseCard
        title="Wildlife"
        desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
            aliquam sunt voluptatum ut sed cupiditate. Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Ducimus aliquam sunt voluptatum
            ut sed cupiditate."
        src="/images/Programming.svg"
      />
      <CourseCard
        title="Web 3"
        desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
            aliquam sunt voluptatum ut sed cupiditate. Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Ducimus aliquam sunt voluptatum
            ut sed cupiditate."
        src="/images/Programming.svg"
      />
      <CourseCard
        title="Web 3"
        desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
            aliquam sunt voluptatum ut sed cupiditate. Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Ducimus aliquam sunt voluptatum
            ut sed cupiditate."
        src="/images/Programming.svg"
      />
      <CourseCard
        title="Web 3"
        desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
            aliquam sunt voluptatum ut sed cupiditate. Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Ducimus aliquam sunt voluptatum
            ut sed cupiditate."
        src="/images/Programming.svg"
      />
      <CourseCard
        title="Web 3"
        desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
            aliquam sunt voluptatum ut sed cupiditate. Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Ducimus aliquam sunt voluptatum
            ut sed cupiditate."
        src="/images/Programming.svg"
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
  min-height: 92vh;
  height: auto;
  flex-wrap: wrap;
  justify-content: center;
`;

export default Courses;
