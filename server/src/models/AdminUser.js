import { DataTypes } from "sequelize";
import { sequelize } from "../configs/database.js";


const AdminUser = sequelize.define(
  "AdminUser",
  {
    Id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    Name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    Email: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    Occupation: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    Number: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    Password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "AdminUser", // Ensure Sequelize uses the correct table name
    timestamps: false, // Disable createdAt/updatedAt columns
  }
);

export default AdminUser;
