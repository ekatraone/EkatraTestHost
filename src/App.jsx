import styled from "styled-components";
import "./App.css";
import MainSection from "./components/MainSection";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./Pages/Home";

function App() {
  return (
    <Container>
      <Sidebar />
      <Section>
        <Navbar />
        <Home />
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
