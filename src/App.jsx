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

import { useAuth0 } from "@auth0/auth0-react";
import LandingPage from "./Pages/LandingPage";

function App() {
  const { user, isLoading, isAuthenticated } = useAuth0();
  // :TODO
  // If user is there then we will redirect to a home page else we will redirect to the Landing Page

  console.log(isAuthenticated);

  return (
    <Router>
      <Switch>
        {user ? (
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
        ) : isLoading ? (
          // :TODO add a Loading Component
          <div>...Loading</div>
        ) : (
          <LandingPage />
        )}
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
