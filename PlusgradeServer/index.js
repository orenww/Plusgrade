const express = require("express");
const cors = require("cors");
const reservationRoute = require("./routes/reservationRoute");

const app = express();
const PORT = 4000;

app.use(cors());
app.use("/api/reservations", reservationRoute);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
