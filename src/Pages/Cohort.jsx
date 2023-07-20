import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../components/Button";
import Table from "../components/Table";
import { useHistory, useLocation } from "react-router-dom";

const Cohort = () => {
  const location = useLocation();
  const { batch, month, user,EnrolledData } = JSON.parse(location.state?.data);
  console.log("dataEnrolled",EnrolledData)
  const [records, setRecords] = useState([]);

  const history = useHistory();

  const columns = [
    { field: "name", headerName: "Name", minWidth: 250, maxWidth: 350 },
    {
      field: "number",
      headerName: "Contact Number",
      minWidth: 200,
      maxWidth: 350,
    },
    { field: "status", headerName: "Status", minWidth: 300, maxWidth: 350 },
    { field: "channel", headerName: "Channel", minWidth: 350, maxWidth: 350 },
  ];

  //DONE
  const getRecords = async () => {
    const data = EnrolledData;
    const rows = data.map((record,index) => ({
      id: index+1,
      name: record.name,  
      number: record.number,
      // Change Status from here
      status: 4,
      channel: record.channel,
    }));
    setRecords(rows);
  };
  console.log("records",records)
  useEffect(() => {
    getRecords();
  }, []);

  const handleNavigation = () => {
    history.goBack();
  };

  return (
    <Container>
      <Wrapper>
        <Title>
          {month + " "}
          {batch}
        </Title>
        <Table isHavingOneButton columns={columns} rows={records} />
        <ButtonContainer>
          <Button title="Go Back" func={handleNavigation} />
        </ButtonContainer>
      </Wrapper>
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
  align-items: center;
  min-height: 92vh;
  height: auto;
  width: 100%;
`;

const Wrapper = styled.div`
  background: white;
  width: 100%;
  margin: 0 0.6rem;
  min-height: 80vh;
  height: auto;
  border-radius: 0.6rem;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin-left: 1.2rem;
  margin-top: 0.6rem;
  padding: 0.4rem 0 0 0.4rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 0.6rem 1.3rem;
`;

export default Cohort;
