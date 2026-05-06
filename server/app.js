import express, { json } from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { connectDB, sequelize } from "./src/configs/database.js";
import userRoutes from "./src/routes/userRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import projectRoutes from "./src/routes/projectRoutes.js";
import investmentRoutes from "./src/routes/investmentRoutes.js";
import verifyToken from "./src/middlewares/authMiddleware.js";

dotenv.config();

const app = express();

// Enable __dirname with ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cors({
  origin: '*', // You can restrict this to your frontend domain if needed
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(json());

// API Routes
app.use("/api/users", verifyToken, userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/project", verifyToken, projectRoutes);
app.use("/api/investment", verifyToken, investmentRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  await connectDB();
  await sequelize.sync();
  console.log(`Server running on port ${PORT}`);
});
