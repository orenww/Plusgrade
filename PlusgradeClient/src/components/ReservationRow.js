import React from "react";
import ProductRow from "./ProductRow";

import "./ReservationRow.css";

const ReservationRow = ({ reservation, expanded, onToggle }) => {
  const { reservation_uuid, active_count, active_sum, products } = reservation;

  return (
    <>
      <tr
        className="reservation-row"
        onClick={() => onToggle(reservation_uuid)}
        style={{ cursor: "pointer" }}
      >
        <td className="reservation-cell">
          {expanded ? "▼" : "▶"} {reservation_uuid}
        </td>
        <td>{active_count}</td>
        <td>{active_sum}</td>
      </tr>
      {expanded &&
        products.map((product, index) => (
          <ProductRow key={index} product={product} />
        ))}
    </>
  );
};

export default ReservationRow;
