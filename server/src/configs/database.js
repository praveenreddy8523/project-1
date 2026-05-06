import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false, // Disable logging in production
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(" Database Connected");
  } catch (error) {
    console.error(" Connection Error:", error);
    process.exit(1);
  }
};

export default sequelize;
