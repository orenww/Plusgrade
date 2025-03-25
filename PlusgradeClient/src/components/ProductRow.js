import React from "react";
import "./ProductRow.css";

const getRowClass = (status) => {
  switch (status) {
    case "active":
      return "product-row active";
    case "cancelled":
      return "product-row cancelled";
    default:
      return "product-row default";
  }
};

const ProductRow = ({ product }) => {
  const { name, status, charge } = product;
  return (
    <tr className={getRowClass(status)}>
      <td className="product-name">{name}</td>
      <td>{status}</td>
      <td>{charge}</td>
    </tr>
  );
};

export default ProductRow;
