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

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import base from "./api/base";
import { useState } from "react";
import { useEffect } from "react";

const KEY = import.meta.env.VITE_AIRTABLE_API_KEY;

function App() {
  console.log(KEY);

  const [data,setData] = useState([])

  useEffect(()=>{
    base('Sheet1').select({
      view:"Grid view"
    }).eachPage((records,fetchNextPage) =>{
      records.forEach((record)=>{
        // console.log(record.fields)
        console.log(record)
      })
      fetchNextPage()
    })
  },[])

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
