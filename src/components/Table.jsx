import React from "react";
import styled from "styled-components";
import { DataGrid } from "@mui/x-data-grid";

const Table = () => {
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
    <Container>
      <TableHeading>Learners</TableHeading>
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
`;

const TableHeading = styled.h3`
  margin-bottom: 1rem;
`;

export default Table;
