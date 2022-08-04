import express from "express";

const PORT = 3000;

const app = express();

app.get("/", (req, res) => {
  res.send(`Working on port ${PORT}.`);
});

// Default answer for wrong request
app.use((req, res) => {
  res.status(404);
});

export { app };
