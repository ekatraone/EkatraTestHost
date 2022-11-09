import React from "react";
import styled from "styled-components";

const Button = ({ type,title }) => {
  return <Container type={{ main: type }}>{title}</Container>;
};

const Container = styled.div`
  padding:10px 35px;
  /* max-width:10rem; */
  margin:0.5rem;
  border-radius:5px;
  display: flex;
  align-items: center;
  justify-content:center;
  cursor: pointer;
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
