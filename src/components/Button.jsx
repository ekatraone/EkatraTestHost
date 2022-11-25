import React from "react";
import styled from "styled-components";

const Button = ({ type, title,func }) => {
  return <Container onClick={func} type={{ main: type }}>{title}</Container>;
};

const Container = styled.button`
  padding: 10px 35px;
  /* max-width:10rem; */
  margin: 0.5rem;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border:none;
  ${({ type }) =>
    type.main === "Primary"
      ? `
    background:#17C3B2;
    color:white;
  `
      : `
    background:rgba(254, 109, 115, 0.1);
    color:rgba(254, 109, 115, 1);
    `}
`;

export default Button;
