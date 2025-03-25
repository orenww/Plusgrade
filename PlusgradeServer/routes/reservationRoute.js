const express = require("express");
const router = express.Router();
const { fetchProductData } = require("../data/fetchDriveFiles");
const { buildReservations } = require("../services/reservationService");

router.get("/", async (req, res) => {
  try {
    const rawData = await fetchProductData();
    console.log("✅ Data fetched successfully");

    console.log("🔧 Transforming data...");
    const result = buildReservations(rawData);
    console.log("✅ Data transformed");
    res.json(result);
  } catch (err) {
    console.error("Failed to load reservation data:", err.message);
    res.status(500).json({ error: "Failed to fetch reservation data" });
  }
});

module.exports = router;
