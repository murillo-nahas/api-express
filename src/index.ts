import express from "express";
import routes from "./routes/routes";
import { PORT } from "./server";

const app = express();

app.get("/", (req, res) => {
  res.send(`Working on port ${PORT}.`);
});

app.use(express.json());

// Default answer for wrong request
app.use((req, res) => {
  res.status(404);
});

// Routes
app.use(routes);

export { app };
