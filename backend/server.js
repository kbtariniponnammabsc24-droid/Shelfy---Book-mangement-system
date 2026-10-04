// Express server: entry point of the backend.
const express = require("express");
const cors = require("cors");
const bookRoutes = require("./routes/bookRoutes");

const app = express();
const PORT = 5000;

app.use(cors());          // allow the React app (port 5173) to call this API
app.use(express.json());  // read JSON sent in request bodies

// All book routes start with /api/books
app.use("/api/books", bookRoutes);

// Unknown URL -> 404 JSON
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Basic error handler (any unexpected error ends up here)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Something went wrong on the server" });
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
