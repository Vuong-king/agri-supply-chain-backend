import express from "express";
import cors from "cors";
import authRoutes from "./models/auth/auth.routes";
import adminRoutes from "./models/admin/admin.route";
import warehouseRoute from "./modules/warehouse/warehouse.route";
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Supply Chain API is running");
});

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/warehouses", warehouseRoute);

export default app;
