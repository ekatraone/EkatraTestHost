import { useAuth0, User } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import AddNewCard from "../components/AddNewCard";
import CohortCard from "../components/CohortCard";

const Cohorts = () => {
  const [records, setRecords] = useState([]);

  const { user } = useAuth0();

  const getRecords = async () => {
    const data =
      user &&
      (await fetch(
        `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${
          import.meta.env.VITE_AIRTABLE_TABLE_NAME_COHORT
        }?filterByFormula=User%3D'${user?.sub}'`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_KEY}`,
          },
          mode: "cors",
        }
      ));
    const res = await data?.json();
    const cohortBatches = res.records;

    const counts = {};

    //Get the count of total students in a particular Batch
    for (const element of cohortBatches) {
      counts[element.fields.BatchName] =
        (counts[element.fields.BatchName] || 0) + 1;
    }

    // Manipulating the array and sorting it to get the required format
    const formattedCohortBatches = cohortBatches.map((element) => ({
      month: element.fields.CohortName,
      batches: Object.entries(counts)
        .map(([key, value]) => ({ [key]: value }))
        .sort((a, b) => {
          let keyA = Object.keys(a)[0];
          let keyB = Object.keys(b)[0];
          if (keyA < keyB) return -1;
          if (keyA > keyB) return 1;
          return 0;
        }),
    }));

    // Converting the array into a unique array
    const uniqueCohortBatches = formattedCohortBatches.filter(
      (element, index, self) =>
        self.map((i) => i.month).indexOf(element.month) === index
    );
    setRecords(uniqueCohortBatches);
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
              pathname: `/cohorts/cohort/${index}`,
              state: {
                data: JSON.stringify({
                  batch: "Batch"+`${index + 1}`,
                  month: record.month,
                  user: user.sub,
                }),
              },
            }}
            key={index}
          >
            <CohortCard
              cohortName={record.month}
              batchName={"Batch " + `${index + 1}`}
              totalUsers={batch[Object.keys(batch)[0]]}
              activeUsers={batch[Object.keys(batch)[0]]}
              openQueries="20"
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
