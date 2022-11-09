import React from "react";
import styled from "styled-components";
import { DataGrid } from "@mui/x-data-grid";
import { Download, Upload } from "@mui/icons-material";

const Table = ({ isHavingButton }) => {
  const columns = [
    { field: "name", headerName: "Name", minWidth: 250, maxWidth: 350 },
    {
      field: "modules",
      headerName: "Number Of Modules",
      minWidth: 200,
      maxWidth: 350,
    },
    { field: "tests", headerName: "Test Taken", minWidth: 200, maxWidth: 350 },
    {
      field: "avgScore",
      headerName: "Average Score",
      minWidth: 250,
      maxWidth: 350,
    },
    { field: "channel", headerName: "Channel", minWidth: 250, maxWidth: 350 },
  ];

  const rows = [
    {
      id: 1,
      name: "Jon",
      modules: 4,
      tests: 3,
      avgScore: 89,
      channel: "WhatsApp",
    },
    {
      id: 2,
      name: "Cersei",
      modules: 4,
      tests: 3,
      avgScore: 79,
      channel: "WhatsApp",
    },
    {
      id: 3,
      name: "Jaime",
      modules: 4,
      tests: 3,
      avgScore: 59,
      channel: "WhatsApp",
    },
    {
      id: 4,
      name: "Arya",
      modules: 4,
      tests: 3,
      avgScore: 69,
      channel: "WhatsApp",
    },
    {
      id: 5,
      name: "Daenerys",
      modules: 4,
      tests: 3,
      avgScore: 81,
      channel: "WhatsApp",
    },
    {
      id: 6,
      name: "Jammy",
      modules: 4,
      tests: 3,
      avgScore: 82,
      channel: "WhatsApp",
    },
    {
      id: 7,
      name: "Ferrara",
      modules: 4,
      tests: 3,
      avgScore: 80,
      channel: "WhatsApp",
    },
    {
      id: 8,
      name: "Rossini",
      modules: 4,
      tests: 3,
      avgScore: 57,
      channel: "WhatsApp",
    },
    {
      id: 9,
      name: "Harvey",
      modules: 4,
      tests: 3,
      avgScore: 75,
      channel: "WhatsApp",
    },
  ];

  return (
    <Container isHavingButton={{main:isHavingButton}}>
      <TableHeadingContainer>
        <TableHeading>Learners</TableHeading>
        {isHavingButton && (
          <ButtonContainer>
            <CustomButton sample>
              <Download />
              <ButtonTitle>Download Sample Excel</ButtonTitle>
            </CustomButton>
            <CustomButton>
              <Upload />
              <ButtonTitle>Upload CSV</ButtonTitle>
            </CustomButton>
          </ButtonContainer>
        )}
      </TableHeadingContainer>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        autoHeight
        autoPageSize
        GridColDef="flex"
      />
    </Container>
  );
};

const Container = styled.div`
  background: #fff;
  padding: 1rem 1.3rem;
  margin: 0 28px;
  border-radius: 10px;
  ${({isHavingButton}) =>  isHavingButton.main && `
    box-shadow: 0px 4px 20px #F3F3F3;
    -webkit-box-shadow: 0px 4px 20px #F3F3F3;
    -moz-box-shadow: 0px 4px 20px #F3F3F3;
    margin-top: 1rem;
  `}
  /* box-shadow: 0px 4px 20px #F3F3F3;
  -webkit-box-shadow: 0px 4px 20px #F3F3F3;
  -moz-box-shadow: 0px 4px 20px #F3F3F3;
  margin-top: 1rem; */
`;

const TableHeadingContainer = styled.span`
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TableHeading = styled.h2``;
const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;
const CustomButton = styled.div`
  display: flex;
  align-items: center;
  margin-right: 0.5rem;
  background-color: ${({ sample }) => (sample ? "#FFCB77" : "#17C3B2")};
  padding: 0.3rem 0.5rem;
  border-radius: 5px;
  cursor: pointer;
  svg {
    color: white;
  }
`;

const ButtonTitle = styled.span`
  color: white;
`;

export default Table;
