import {
  ArrowDownwardSharp,
  ArrowUpwardSharp,
} from "@mui/icons-material";
import React from "react";
import styled from "styled-components";

const Card = ({ title, statsNum, statsDen, statsPercent, isPositive,img }) => {
  return (
    <Container>
      <CardTitle>{title}</CardTitle>
      <CardStatsContainer>
        <CardStats color={!isPositive ? "#FE6D73" :null }>{statsDen ? statsNum + "/" + statsDen : statsNum}</CardStats>
        <CardPercentChange color={!isPositive ? "#FE6D73" : null}>
          {statsPercent + "%"}
          {isPositive ? <ArrowUpwardSharp /> : <ArrowDownwardSharp />}
        </CardPercentChange>
      </CardStatsContainer>
      <Image src={img} />

    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: white;
  max-width: 20%;
  flex: 1 0 21%;
  height: 9rem;
  justify-content: space-between;
  padding: 0.8rem;
  border-radius: 0.5rem;
`;
const CardTitle = styled.h4``;
const CardStatsContainer = styled.div``;
const CardStats = styled.p`
  font-size: 36px;
  font-weight: 700;
  color: #3dbc8d;
  color: ${({ color }) => color};

`;
const CardPercentChange = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: #3dbc8d;
  display: flex;
  align-items: center;
  color: ${({ color }) => color};

  svg {
    font-size: 16px;
    margin-right: 0.2rem;
    fill: ${({ color }) => color};
  }
  &::after {
    content: "than last month";
    font-weight: 300;
    color: #c4c4c4;
  }
`;

const Image = styled.img`
    position:absolute;
    width: 16%;
    height: 25%;
    position: absolute;
    top: 6px;
    right: 11px;
    background: rgba(34, 124, 157, 0.05);
    border-radius: 50%;
    padding: 6px;
`;

export default Card;
