import { DataTypes } from "sequelize";
import { sequelize } from "../configs/database.js";


const User = sequelize.define(
  "User",
  {
    Id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    FirstName: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    LastName: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    DateOfBirth: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    Occupation: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    Email: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    State: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    Country: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    Number: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    Password: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "User", // Ensure Sequelize uses the correct table name
    timestamps: false, // Disable createdAt/updatedAt columns
  }
);

export default User;
