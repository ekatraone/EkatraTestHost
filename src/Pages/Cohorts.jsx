import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import AddNewCard from "../components/AddNewCard";
import CohortCard from "../components/CohortCard";

const Cohorts = () => {
  const [records, setRecords] = useState([]);

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
      const batches = {};
      const counts = {};
      const data={};
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
          const user={}
          user.name=element.fields.Name
          user.number=element.fields.Contact
          user.channel=element.fields.Channel
          data[element.fields.CohortName][element.fields.BatchName].push(user)
        }
      }
      console.log(data)
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

  return (
    <Container>
      <Link to="/cohorts/addcohort">
        <AddNewCard src="/images/NewCohortCard.svg" title="Add a new cohort" />
      </Link>

      {records.map((record) =>
        record.batches.map((batch, index) => (
          <Link
            style={{ color: "inherit" }}
            to={{
              pathname: `/cohorts/cohort/${index+1}`,
              state: {
                data: JSON.stringify({
                  batch: `Batch ${index + 1}`,
                  month: record.month,
                  user: user.sub,
                }),
              },
            }}
            key={index}
          >
            <CohortCard
              cohortName={record.month}
              courseName={record.Course}
              batchName={`Batch ${index + 1}`}
              totalUsers={batch[Object.keys(batch)[0]]}
              activeUsers={batch[Object.keys(batch)[0]]}
              openQueries="20"
              record={data}
            />
          </Link>
        ))
      )}
    </Container>
  );
};

const Container = styled.div`
  padding: 0.5rem;
  background: rgb(115, 216, 206);
  background: linear-gradient(
    223deg,
    rgba(115, 216, 206, 0.5) 0%,
    rgba(255, 211, 140, 0.3) 100%
  );
  display: flex;
  min-height: 92vh;
  height: auto;
  flex-wrap: wrap;
  justify-content: center;
`;

export default Cohorts;
