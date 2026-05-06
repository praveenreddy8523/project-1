import { DataTypes } from "sequelize";
import { sequelize } from "../configs/database.js";

const WorkFlow = sequelize.define(
  "WorkFlow",
  {
    Id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true, // Not the primary key, as Name and Tag are the composite PK
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ProjectName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Status: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    NoOfContainers:{
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    ContainerSize: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    TrackingUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    SourceActivities: {
      type: DataTypes.JSONB, // JSONB stores structured data efficiently in PostgreSQL
      allowNull: false,
      defaultValue: {},
    },
    DestinationActivities: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: {},
    },
  },
  {
    tableName: "WorkFlow",
    timestamps: false,
  }
);

export default WorkFlow;
