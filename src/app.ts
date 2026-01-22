import express from "express";
import cors from "cors";
import authRoutes from "./models/auth/auth.routes";
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Supply Chain API is running");
});

app.use("/api/auth", authRoutes);

export default app;
