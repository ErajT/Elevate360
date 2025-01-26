import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Header from "./components/Header"; 
import ClientHome from "./components/ClientHome";
import ClientSprint from "./components/ClientSprint";
import Clientmanage from "./components/Clientmanage";
import ClientProp from "./components/ClientProp";
import ClientReq from "./components/ClientReq";
import BusinessDashboard from "./components/BusinessDashboard";
import BusinessReq from "./components/BusinessReq";
import Navbar from "./components/Navbar";


const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow-y: auto; /* Enable vertical scrolling */
  overflow-x: hidden; /* Disable horizontal scrolling */
  background-color: #ecf0f1;
`;


const App = () => {
  return (
    <Router>
      <AppContainer>
        <Routes>
          <Route path="/header" element={<Header />} />
          <Route path="/" element={<ClientHome />} />
          <Route path="/clientmanage" element={<Clientmanage />} />
          <Route path="/clientProp" element={<ClientProp />} />
          <Route path="/clientReq" element={<ClientReq />} />
          <Route path="/businessdashboard" element={<BusinessDashboard />} />
          <Route path="/businessreq" element={<BusinessReq />} />
          <Route path="/clientsprint" element={<ClientSprint />} />
          <Route path="/navbar" element={<Navbar />} />
          {/* Add more routes here */}
        </Routes>
      </AppContainer>
    </Router>
  );
};

export default App;
