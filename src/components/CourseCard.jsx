import {
  EditOutlined,
  SignalCellularAltOutlined,
  Groups2Outlined,
} from "@mui/icons-material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const CourseCard = ({ src,record }) => {

  const {id, fields:{CourseName:title, Desc:desc} } = record;
  const [elipses, setElipses] = useState(desc.length > 100 ? true : false);

  return (
    <Container key={id}>
      <UpperContainer>
        <InfoContainer>
          <InfoTitle>{title}</InfoTitle>

          <InfoDesc
            elipses={{ main: elipses }}
            onClick={() => setElipses((oldValue) => !oldValue)}
          >
            {desc}
          </InfoDesc>
        </InfoContainer>
        <Image src={src} />
      </UpperContainer>

      <LowerContainer>
        <Button primary>
          <Link to={{
            pathname:`/courses/course/${id}`,
            state: JSON.stringify(record)
          }} style={{ color: "inherit", display:'flex',alignItems:'center' }}>
            <EditOutlined />
            <ButtonTitle>Edit Course</ButtonTitle>
          </Link>
        </Button>

        <Button secondary>
          <Groups2Outlined />
          <ButtonTitle>Students</ButtonTitle>
        </Button>

        <Button>
          <SignalCellularAltOutlined />
          <ButtonTitle>Analytics</ButtonTitle>
        </Button>
      </LowerContainer>
    </Container>
  );
};

const Container = styled.div`
  background: #fff;
  margin: 1rem;
  width: 29rem;
  height: 18rem;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  border-radius: 0.8rem;
  padding: 1.5rem 1rem;
`;

const UpperContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const InfoContainer = styled.div`
  /* flex: 5; */
  position: relative;
`;
const InfoTitle = styled.h4`
  font-weight: 700;
  font-size: 24px;
  margin-bottom: 0.2rem;
`;
const InfoDesc = styled.p`
  color: #939393;
  font-size: 16px;
  max-width: 17rem;
  overflow: hidden;
  display: -webkit-box !important;
  -webkit-line-clamp: 3;
  -webkit-box-orient: ${(props) => props.elipses.main && "vertical"};
  white-space: normal;
  &::before {
    content: "Read More";
    position: absolute;
    top: 89px;
    color: #227c9d;
    cursor: pointer;
    opacity: ${(props) => (props.elipses.main ? 1 : 0)};
  }
`;
const Image = styled.img`
  /* flex:3; */
  background: rgba(34, 124, 157, 0.05);
  padding: 1rem;
  border-radius: 50%;
  width: 8rem;
  height: 8rem;
`;

const LowerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  color: #227c9d;
  background-color: ${(props) =>
    props.primary
      ? "rgba(255, 203, 119, 0.2)"
      : props.secondary
      ? "rgba(23, 195, 178, 0.2)"
      : "rgba(254, 109, 115, 0.2)"};
  padding: 0.6rem;
  border-radius: 0.4rem;
  cursor: pointer;
  max-width: 30%;
`;
const ButtonTitle = styled.span``;

export default CourseCard;
