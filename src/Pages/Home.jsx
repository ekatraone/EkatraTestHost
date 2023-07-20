import React from "react";
import styled from "styled-components";
import Card from "../components/Card";
import Table from "../components/Table";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

const Home = () => {
  const [records, setRecords] = useState([]);
  const[data, setData]=useState({})
  const { user } = useAuth0();

  // DONE, send user sub
  const getRecords = async () => {
    try {
      const response =
        user &&
        await fetch(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/cohorts/getCohorts`,
          {
            headers: {
              user: user.sub,
            },
            mode: "cors",
          }
        );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const cohortBatches = await response?.json();
      console.log(cohortBatches);
      const counts = {};

      // Get the count of total students in a particular Batch
      for (const element of cohortBatches) {
        if (!counts[element.fields.CohortName]) {
          counts[element.fields.CohortName] = {};
          data[element.fields.CohortName] = {};
        }
        if (!counts[element.fields.CohortName][element.fields.BatchName]) {
          counts[element.fields.CohortName][element.fields.BatchName] = 0;
          data[element.fields.CohortName][element.fields.BatchName] = [];
        }
        counts[element.fields.CohortName][element.fields.BatchName] += 1;
        if(!data[element.fields.CohortName][element.fields.BatchName].includes(element.fields.Name)){
          const details={}
          details.name=element.fields.Name
          details.number=element.fields.Contact
          details.channel=element.fields.Channel
          details.batch=element.fields.BatchName
          details.cohort=element.fields.CohortName
          details.course=element.fields.Course
          data[element.fields.CohortName][element.fields.BatchName].push(details)
        }
      }
      console.log("data:",data)
      const months = Object.keys(counts);
      const monthsToFormat = months.map((month) => ({
        month: month,
        batches: counts[month],
      }));

      const formattedResult = monthsToFormat
        .map((item) => {
          return {
            month: item.month,
            batches: Object.keys(item.batches)
              .map((key) => ({
                [key]: item.batches[key],
                //Sort Batches so that the batches are is ascending order of the time they were created
              }))
              .sort((a, b) => {
                let batchA = Object.keys(a)[0];
                let batchB = Object.keys(b)[0];
                if (batchA > batchB) return 1;
                if (batchA < batchB) return -1;
                return 0;
              }),
          };
        })
        //Sort the returned array Months from first map function such that earlier batches comes on Top
        .sort((a, b) => {
          let monthA = new Date(`01 ${a.month.split("-")[0]} 2000`).getTime();
          let monthB = new Date(`01 ${b.month.split("-")[0]} 2000`).getTime();
          return monthA - monthB;
        });
        console.log(formattedResult)
      setRecords(formattedResult);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRecords();
  }, []);

  const columns = [];

  const rows = [];
  

  useEffect(() => {
     getRecords();
  }, []);
  return (
    <Container>
      <CardContainer>
        <Card
          title="Learners"
          statsNum="500"
          statsDen=""
          statsPercent="12"
          isPositive
          img="/images/Card1.svg"
        />
        <Card
          title="Completed"
          statsNum="75"
          statsDen="500"
          statsPercent="17"
          isPositive
          img="/images/Card2.svg"
        />
        <Card
          title="In Progress"
          statsNum="375"
          statsDen="500"
          statsPercent="12"
          isPositive
          img="/images/Card3.svg"
        />
        <Card
          title="In Progress"
          statsNum="50"
          statsDen="500"
          statsPercent="7"
          img="/images/Card4.svg"
        />
      </CardContainer>

      <Table isHomePage columns={columns} rows={rows} data = {data}/>
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
  flex-direction: column;
  min-height: 92vh;
  height: auto;
`;
const CardContainer = styled.div`
  margin: 2rem  0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

export default Home;
