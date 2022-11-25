import React from "react";
import styled from "styled-components";
import { DataGrid } from "@mui/x-data-grid";
import { Download, Upload } from "@mui/icons-material";
import { useState } from "react";
import Button from "./Button";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx/xlsx.mjs";

const Table = ({ rows, columns, isHavingTwoButtons, isHavingOneButton }) => {
  const [csvFile, setCsvFile] = useState();
  const [csvData, setCsvData] = useState([]);
  // const columns = [
  //   { field: "name", headerName: "Name", minWidth: 250, maxWidth: 350 },
  //   {
  //     field: "modules",
  //     headerName: "Number Of Modules",
  //     minWidth: 200,
  //     maxWidth: 350,
  //   },
  //   { field: "tests", headerName: "Test Taken", minWidth: 200, maxWidth: 350 },
  //   {
  //     field: "avgScore",
  //     headerName: "Average Score",
  //     minWidth: 250,
  //     maxWidth: 350,
  //   },
  //   { field: "channel", headerName: "Channel", minWidth: 250, maxWidth: 350 },
  // ];

  // const rows = [
  //   {
  //     id: 1,
  //     name: "Jon",
  //     modules: 4,
  //     tests: 3,
  //     avgScore: 89,
  //     channel: "WhatsApp",
  //   },
  //   {
  //     id: 2,
  //     name: "Cersei",
  //     modules: 4,
  //     tests: 3,
  //     avgScore: 79,
  //     channel: "WhatsApp",
  //   },
  //   {
  //     id: 3,
  //     name: "Jaime",
  //     modules: 4,
  //     tests: 3,
  //     avgScore: 59,
  //     channel: "WhatsApp",
  //   },
  //   {
  //     id: 4,
  //     name: "Arya",
  //     modules: 4,
  //     tests: 3,
  //     avgScore: 69,
  //     channel: "WhatsApp",
  //   },
  //   {
  //     id: 5,
  //     name: "Daenerys",
  //     modules: 4,
  //     tests: 3,
  //     avgScore: 81,
  //     channel: "WhatsApp",
  //   },
  //   {
  //     id: 6,
  //     name: "Jammy",
  //     modules: 4,
  //     tests: 3,
  //     avgScore: 82,
  //     channel: "WhatsApp",
  //   },
  //   {
  //     id: 7,
  //     name: "Ferrara",
  //     modules: 4,
  //     tests: 3,
  //     avgScore: 80,
  //     channel: "WhatsApp",
  //   },
  //   {
  //     id: 8,
  //     name: "Rossini",
  //     modules: 4,
  //     tests: 3,
  //     avgScore: 57,
  //     channel: "WhatsApp",
  //   },
  //   {
  //     id: 9,
  //     name: "Harvey",
  //     modules: 4,
  //     tests: 3,
  //     avgScore: 75,
  //     channel: "WhatsApp",
  //   },
  // ];

  const handleUploadFile = (e) => {
    // const fileData = {};
    // const file = csvFile;
    // fileData["fileName"] = file[0].name;
    const reader = new FileReader();
    reader.readAsBinaryString(csvFile);
    reader.onload = (e) => {
      const text = e.target.result;
      let workbook = XLSX.read(text, { type: "binary" });
      console.log(workbook);
      workbook.SheetNames.forEach((sheet) => {
        let rowObject = XLSX.utils.sheet_to_row_object_array(
          workbook.Sheets[sheet]
        );
        console.table(rowObject);
        setCsvData(rowObject);
      });
    };
  };

  console.log(csvData);

  return (
    <Container
      isHavingTwoButtons={{ main: [isHavingTwoButtons, isHavingOneButton] }}
    >
      <TableHeadingContainer>
        <TableHeading>Learners</TableHeading>
        {isHavingTwoButtons && (
          <ButtonContainer>
            <CustomButton sample>
              <Download />
              <ButtonTitle>Download Sample Excel</ButtonTitle>
            </CustomButton>
            <CustomButton>
              <UploadInput
                id="file-upload"
                type="file"
                onChange={(e) => {
                  setCsvFile(e.target.files[0]);
                }}
              />

              <ButtonTitle htmlFor="file-upload">
                <Upload htmlFor="file-upload" />
                Upload CSV
              </ButtonTitle>
            </CustomButton>
          </ButtonContainer>
        )}
        {isHavingOneButton && (
          <ButtonContainer>
            <CustomButton>
              <Download />
              <ButtonTitle>Export CSV</ButtonTitle>
            </CustomButton>
          </ButtonContainer>
        )}
      </TableHeadingContainer>
      <DataGrid
        rows={ isHavingTwoButtons ? csvData: rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        autoHeight
        autoPageSize
        GridColDef="flex"
      />
      {isHavingTwoButtons && (
        <ButtonContainer>
          <Link to="/cohorts">
            <Button title="Go Back" />
          </Link>
          <Button func={handleUploadFile} title="Add Cohort" type="Primary" />
        </ButtonContainer>
      )}
    </Container>
  );
};

const Container = styled.div`
  background: #fff;
  padding: 1rem 1.3rem;
  margin: 0 28px;
  border-radius: 10px;
  ${({ isHavingTwoButtons: { main } }) =>
    main.isHavingOneButton ||
    (main.isHavingTwoButtons &&
      `
    margin-top:1rem;
    box-shadow: 0px 4px 20px #F3F3F3;
    -webkit-box-shadow: 0px 4px 20px #F3F3F3;
    -moz-box-shadow: 0px 4px 20px #F3F3F3;
  `)}
`;

const TableHeadingContainer = styled.span`
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TableHeading = styled.h2``;

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
  input[type="file"] {
    display: none;
  }
`;

const UploadInput = styled.input``;

const ButtonTitle = styled.label`
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 0.6rem 1.3rem;
`;

export default Table;
