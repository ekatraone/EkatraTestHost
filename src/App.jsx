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
import { useAuth0 } from "@auth0/auth0-react";

const KEY = import.meta.env.VITE_AIRTABLE_API_KEY;

function App() {
  const [records, setRecords] = useState([]);
  const { loginWithRedirect, logout, isAuthenticated, user, isLoading } =
    useAuth0();
  const getRecords = async () => {
    const data = await fetch(
      `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${
        import.meta.env.VITE_AIRTABLE_TABLE_NAME_TRY
      }`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_KEY}`,
        },
        mode: "cors",
      }
    );
    const res = await data.json();
    // console.log(res);
    setRecords(res.records);
  };

  const getUsersFromAuth0 = async () => {
    const res = await fetch("https://dev-uuiq5z2b4mju62wb.us.auth0.com/api/v2/users", {
      method: "GET",
      headers: {
        authorization: `Bearer ${
          import.meta.env.VITE_AUTH0_MGMT_API_ACCESS_TOKEN
        }`,
      },
    })
    const data = await res.json();
    console.log(data)
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
    // isAuthenticated && getUsersFromAuth0();
  }, [user]);

  //:TODO
  // If user is there then we will redirect to a particular page else we will redirect to the Landing Page

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
            <Route path="/courses/course/:id" component={AddCourse} />

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
