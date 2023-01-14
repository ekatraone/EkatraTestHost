import React from "react";
import styled from "styled-components";
import { DataGrid } from "@mui/x-data-grid";
import { Download, Upload } from "@mui/icons-material";
import { useState } from "react";
import Button from "./Button";
import { Link, useHistory, useLocation } from "react-router-dom";
import * as XLSX from "xlsx/xlsx.mjs";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

const Table = ({ rows, columns, isHavingTwoButtons, isHavingOneButton }) => {
  const { user } = useAuth0();
  const history = useHistory();

  const [csvFile, setCsvFile] = useState();
  const [csvData, setCsvData] = useState([]);

  const [monthsCount, setMonthsCount] = useState({
    Jan: 0,
    Feb: 0,
    Mar: 0,
    Apr: 0,
    May: 0,
    Jun: 0,
    Jul: 0,
    Aug: 0,
    Sep: 0,
    Oct: 0,
    Nov: 0,
    Dec: 0,
  });

  const handleExcelFile = (e) => {
    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    reader.onload = (e) => {
      const text = e.target.result;
      let workbook = XLSX.read(text, { type: "binary" });
      workbook.SheetNames.forEach((sheet) => {
        let rowObject = XLSX.utils.sheet_to_row_object_array(
          workbook.Sheets[sheet]
        );
        // console.table(rowObject);
        setCsvData(rowObject);
      });
    };
  };

  const handleCohortName = () => {
    const formatter = new Intl.DateTimeFormat("us", { month: "short" });
    const months = Object.keys(monthsCount);
    const currentMonth = formatter.format();
    const nextMonth =
      months[
        months.indexOf(currentMonth) + 1 > 11
          ? 0
          : months.indexOf(currentMonth) + 1
      ];
    setMonthsCount((prev) => ({
      ...prev,
      [currentMonth]: prev[currentMonth] + 1,
    }));

    return {
      cohortName: `${currentMonth}-to-${nextMonth}`,
      cohortBatchNumber: `Batch ${monthsCount[currentMonth] + 1}`,
    };
  };

  const handleUploadCohortFile = async (e) => {
    const { cohortName, cohortBatchNumber } = handleCohortName();
    console.log(cohortName, cohortBatchNumber);
    const records = csvData.map((item) => ({
      fields: {
        User: user.sub,
        Name: item.name,
        Contact: String(item.number),
        Channel: item.channel,
        CohortName:cohortName,
        BatchName:cohortBatchNumber
      },
    }));

    const data = await fetch(`https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_AIRTABLE_TABLE_NAME_COHORT}`,
      {
        method: "POST",
        body: JSON.stringify({records}),
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if(data.ok){
      const res = await data.json();
      console.log(res);
      history.push("/")
    }
  };

  useEffect(()=>{
    isHavingTwoButtons && setMonthsCount(JSON.parse(window.localStorage.getItem("monthsCount")) || monthsCount)
  },[])

  useEffect(()=>{
    window.localStorage.setItem("monthsCount",JSON.stringify(monthsCount))
  },[monthsCount])



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
              <ButtonTitleDownload
                href="/assets/sampleCohort.xlsx"
                target="_blank"
                download
              >
                Download Sample Excel
              </ButtonTitleDownload>
            </CustomButton>
            <CustomButton>
              <UploadInput
                id="file-upload"
                type="file"
                onChange={handleExcelFile}
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
        rows={isHavingTwoButtons ? csvData : rows}
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
          <Button
            func={handleUploadCohortFile}
            title="Add Cohort"
            type="Primary"
            disabled={csvData.length > 0 ? false : true}
          />
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

const ButtonTitleDownload = styled.a`
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
