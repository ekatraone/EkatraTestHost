import styled from "styled-components";
import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import AddCohort from "./Pages/AddCohort";
import AddCourse from "./Pages/AddCourse";
import Cohort from "./Pages/Cohort";
import Cohorts from "./Pages/Cohorts";
import Courses from "./Pages/Courses";
import Home from "./Pages/Home";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

import base from "./api/base";

const KEY = import.meta.env.VITE_AIRTABLE_API_KEY;

function App() {
  const [records, setRecords] = useState([]);

  const getRecords = async () => {
    const data = await fetch(`https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_AIRTABLE_TABLE_NAME}`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_KEY}`,
        },
        mode: "cors",
      }
    );
    const res = await data.json()
    console.log(res)
    setRecords(res.records)
  };

  useEffect(() => {

    // Normal API

    // base('Sheet1').select({
    //   view:"Grid view"
    // }).eachPage((records,fetchNextPage) =>{
    //   console.log(records)
    //   records.forEach((record)=>{
    //     // console.log(record.fields)
    //     console.log(record.fields)
    //     setData((prev)=>[...prev,record.fields])
    //   })
    //   fetchNextPage()
    // })

    // Using WEB API
    getRecords();
  }, []);

  console.log(records)

  return (
    <Router>
      <Switch>
        <Container>
          <Sidebar />
          <Section>
            <Navbar />
            {/* Pages */}
            <Route exact path="/" component={Home} />

            <Route path="/courses/addcourse" component={AddCourse} />
            <Route exact path="/courses" component={Courses} />

            <Route path="/cohorts/cohort/:id" component={Cohort} />
            <Route path="/cohorts/addcohort" component={AddCohort} />
            <Route exact path="/cohorts" component={Cohorts} />
          </Section>
        </Container>
      </Switch>
    </Router>
  );
}

const Container = styled.div`
  display: flex;
  width: 100%;
  box-sizing: border-box;
`;

const Section = styled.div`
  flex: 6;
`;

export default App;
