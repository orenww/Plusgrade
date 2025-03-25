import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Test from "./components/Test";
import ReservationTable from "./components/ReservationTable";

const App = () => {
  return (
    <div>
      <h1>Reservation Overview</h1>
      <ReservationTable />
    </div>
  );
};

export default App;
