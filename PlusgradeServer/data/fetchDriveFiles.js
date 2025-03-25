const fs = require("fs");
const path = require("path");

const readJsonFile = (filename) => {
  const filePath = path.join(__dirname, filename);
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw);
};

const fetchProductData = async () => {
  const assignments = readJsonFile("product_assignment.json");
  const charges = readJsonFile("product_charges.json");
  return { assignments, charges };
};

module.exports = { fetchProductData };
