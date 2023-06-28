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
import LandingPage2 from "./Pages/LandingPage2";
import Loading from "./components/Loading";

function App() {
  const { user, isLoading } = useAuth0();

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
          <Loading />
        ) : (
          <LandingPage2 />
        //   <Container>
        //   <Sidebar />
        //   <Section>
        //     <Navbar />
        //     {/* Pages */}
        //     <Route exact path="/" component={Home} />

        //     <Route path="/courses/addcourse" component={AddCourse} />
        //     <Route exact path="/courses" component={Courses} />
        //     <Route path="/courses/course/:id" component={AddCourse} />

        //     <Route path="/cohorts/cohort/:id" component={Cohort} />
        //     <Route path="/cohorts/addcohort" component={AddCohort} />
        //     <Route exact path="/cohorts" component={Cohorts} />
        //   </Section>
        // </Container>
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
