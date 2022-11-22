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

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Container>
      <Sidebar />
      <Section>
        <Navbar />

        {/* Pages */}

        {/* <Home /> */}
        {/* <Courses /> */}
        {/* <Cohorts /> */}
        {/* <AddCohort /> */}
        {/* <Cohort /> */}
        <AddCourse />
      </Section>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 100%;
  box-sizing: border-box;
`;

const Section = styled.div`
  flex:6;
`;

export default App;
