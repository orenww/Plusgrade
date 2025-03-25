import React, { useEffect, useState } from "react";
import axios from "axios";
import ReservationRow from "./ReservationRow";
import "./ReservationTable.css";

const INIT_DATA = [
  {
    reservation_uuid: "123",
    active_count: 0,
    active_sum: 0,
    products: [],
  },
  {
    reservation_uuid: "1234",
    active_count: 2,
    active_sum: 60,
    products: [
      {
        name: "Dinner",
        status: "active",
        charge: 20,
      },
      {
        name: "Late checkout",
        status: "active",
        charge: 40,
      },
      {
        name: "parking",
        status: "cancelled",
        charge: 15,
      },
      {
        name: "test1",
        status: "new",
        charge: 30,
      },
    ],
  },
];

const ReservationTable = () => {
  const [data, setData] = useState([]);
  const [expandedRows, setExpandedRows] = useState(new Set());
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    axios.get("http://localhost:4000/api/reservations").then((res) => {
      setData(res.data);
    });
  }, []);

  const toggleRow = (uuid) => {
    const newSet = new Set(expandedRows);
    if (newSet.has(uuid)) {
      newSet.delete(uuid);
    } else {
      newSet.add(uuid);
    }
    setExpandedRows(newSet);
  };

  const filteredData = data.filter((res) =>
    res.reservation_uuid.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="reservation-container">
      <div className="filter-ui">
        <label>Filter by UUID:</label>
        <input
          type="text"
          value={filterText}
          o
          onChange={(e) => {
            setFilterText(e.target.value);
            console.log("Filter:", e.target.value);
          }}
          placeholder="Enter reservation UUID..."
        />
      </div>
      <table
        className="reservation-table"
        border={1}
        cellPadding={8}
        style={{ width: "100%", borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th>Reservation UUID</th>
            <th>Number of Active Purchases</th>
            <th>Sum of Active Charges</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((res) => (
            <ReservationRow
              key={res.reservation_uuid}
              reservation={res}
              expanded={expandedRows.has(res.reservation_uuid)}
              onToggle={toggleRow}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationTable;
