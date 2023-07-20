import React from "react";
import styled from "styled-components";
import { DataGrid } from "@mui/x-data-grid";
import { Download, Upload } from "@mui/icons-material";
import { useState } from "react";
import Button from "./Button";
import { Link, useHistory } from "react-router-dom";
import * as XLSX from "xlsx/xlsx.mjs";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

const Table = ({ rows, columns,data, isHavingTwoButtons, isHavingOneButton, isHomePage }) => {
  const { user } = useAuth0();
  const history = useHistory();
  // console.log("data table",data)
  const [csvData, setCsvData] = useState([]);
  const [csvFileName, setCsvFileName] = useState("");
  const [coursesName, setCoursesName] = useState([]);
  const [courseSelected, setCourseSelected] = useState("");
  const [monthsCount, setMonthsCount] = useState({
    Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0, Jun: 0, Jul: 0, Aug: 0, Sep: 0, Oct: 0, Nov: 0, Dec: 0,
  });
  const [SelectedRows, setSelectedRows] = useState([]);
  console.log('data',data)
  const [selectMonth,setMonth]=useState("");
  const handleExcelFile = (e) => {
    const reader = new FileReader();
    let fileName = e.target.files[0].name;
    setCsvFileName(fileName);
    let allowedExtensions =
      /(\.xlsx|\.xlsm|\.xlsb|\.xltx|\.xltm|\.xls|\.xlt)$/i;
    if (!allowedExtensions.exec(fileName)) {
      alert("Please upload file having extensions .xlsx/.xls only.");
      e.target.value = "";
      return false;
    }

    reader.readAsBinaryString(e.target.files[0]);
    reader.onload = (e) => {
      const text = e.target.result;
      let workbook = XLSX.read(text, { type: "binary" });
      if (workbook.SheetNames.length > 1) {
        alert("Please upload the file provided in the sample format");
        setCsvFileName("");
        return;
      }
      workbook.SheetNames.forEach((sheet) => {
        let rowObject = XLSX.utils.sheet_to_row_object_array(
          workbook.Sheets[sheet]
        );
        console.log(rowObject)
        if (
          rowObject[0].id &&
          rowObject[0].name &&
          rowObject[0].number &&
          rowObject[0].channel
        ) {
          const uniqueRows = rowObject.filter(
            (item, index, self) =>
              index === self.findIndex((t) => t.number === item.number)
          );
          console.log(uniqueRows)
          setCsvData(uniqueRows);
        } else {
          alert("Please upload the file provided in the sample format");
          setCsvFileName("");
          return;
        }
      });
    };
  };

    if(isHomePage){
      columns = [
        { field: "id", headerName: "ID", width: 70 },
        { field: "name", headerName: "Name", width:250  },
        { field: "number", headerName: "Contact", width: 130 },
        { field: "channel", headerName: "Channel", width: 130 },
        { field: "Batch", headerName: "Batch", width: 130 },
        { field: "Cohort", headerName: "Cohort", width: 130 },
        { field: "Course", headerName: "Course", width: 130 },
    ];
      rows = [
        {id:1,channel :"WhatsApp", name: "It's good!", number: "917559331576", Batch: "Batch1", Cohort: "Jan-to-Feb"},
      ];
    }
  
  const handleRowSelection = (e) => {
    console.log(e.target.value);
    let selectedRow = data[selectMonth][e.target.value];

    selectedRow.map((item,index)=>{
      item.id=index+1;
      item.Batch=e.target.value;
      item.Cohort=selectMonth;
      item.Course=item.course;
    })
    console.log("98",selectedRow)
    setSelectedRows(selectedRow);
  };


  const handleDownloadExcel = () => {
    const downloadableData = rows.map((row) => ({
      name: row.name,
      number: row.number,
      status: row.status,
      channel: row.channel,
    }));
    let binartWorkSheet = XLSX.utils.json_to_sheet(downloadableData);
    let cohortWorkbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      cohortWorkbook,
      binartWorkSheet,
      "Binary values"
    );

    // export your excel
    XLSX.writeFile(cohortWorkbook, "Cohort.xlsx");
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
      cohortBatchNumber: `Batch${monthsCount[currentMonth] + 1}`,
    };
  };

  const handleUploadCohortFile = async (e) => {
    const { cohortName, cohortBatchNumber } = handleCohortName();
    const records = csvData.map((item) => ({
      fields: {
        User: user.sub,
        Name: item.name,
        Contact: String(item.number),
        Channel: item.channel,
        CohortName: cohortName,
        BatchName: cohortBatchNumber,
        Course: courseSelected,
      },
    }));

    try {
      const data = await fetch(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/cohorts/createCohort`,
        {
          method: "POST",
          body: JSON.stringify(records),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (data.ok) {
        const res = await data.json();
        // console.log(res);
        console.log(res)
        alert("Cohort created successfully");
        history.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCoursesName = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/courses/getCoursesName`,
        {
          headers: {
            user: user?.sub,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      console.log(data)
      setCoursesName(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCoursesName();
  }, []);

  useEffect(() => {
    window.localStorage.getItem("monthsCount")
      ? setMonthsCount(JSON.parse(window.localStorage.getItem("monthsCount")))
      : setMonthsCount(monthsCount);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("monthsCount", JSON.stringify(monthsCount));
  }, [monthsCount]);

 

  return (
    <Container
      isHavingTwoButtons={{ main: [isHavingTwoButtons, isHavingOneButton] }}
    >
      <TableHeadingContainer>
        <TableHeading>Learners</TableHeading>
        {isHavingTwoButtons && (
          <ButtonContainer>
            <SingleFilterContainer>
              <Select
                name="language"
                required
                onChange={(e) => setCourseSelected(e.target.value)}
                defaultValue="disabled"
              >
                <Option disabled value="disabled">
                  {"Select a Course for this Cohort"}
                </Option>
                {coursesName.length > 0 &&
                  coursesName.map((course, index) => (
                    <Option value={course} key={index}>
                      {course}
                    </Option>
                  ))}
              </Select>
            </SingleFilterContainer>
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
            {
              csvFileName && <div style={{"position":"absolute","top":"40px","right":"50px"}} >{csvFileName}</div>
            }
          </ButtonContainer>
        )}
        {isHavingOneButton && (
          <ButtonContainer>
            <CustomButton>
              <Download />
              <ButtonTitle onClick={handleDownloadExcel}>
                Export CSV
              </ButtonTitle>
            </CustomButton>
          </ButtonContainer>
        )}
        {isHomePage && (
          <>
          <div style={{display:"flex"}}>
          <div >
            <Select onChange={(e)=>{setMonth(e.target.value);}}>
              <Option value="-1"> Select any one</Option>
            {
              data&&Object.keys(data).map((month,index)=>(
                <Option value={month} key={index}>{month}</Option>
              ))
            }
            </Select>
          </div>
          <div style={{marginLeft:"10px"}}>
          <Select onChange={(e)=>{handleRowSelection(e)}}>
            <Option value="-1"> Select any one</Option>
            {
              data[selectMonth] && Object.keys(data[selectMonth]).map((info,index)=>{
                return <Option value={info} key={index}>{info}</Option>
              })
            }
            </Select>
          </div>
          </div>
         </>
        )}
      </TableHeadingContainer>
      <DataGrid
        rows={isHavingTwoButtons ? csvData : isHomePage?SelectedRows:rows}
        columns={columns}
        pageSize={10}
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
            disabled={
              csvData.length > 0 ? (courseSelected ? false : true) : true
            }
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
  align-items: center;
  position: relative;
`;

const SingleFilterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: 0.5rem;
`;

const Select = styled.select`
  padding: 8px;
  width: 15rem;
  border: 1px solid #17c3b2;
  border-radius: 5px;
`;
const Option = styled.option`
  // color:#C4C4C4; 

`;

export default Table;
