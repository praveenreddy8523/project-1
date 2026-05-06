import { DataTypes } from "sequelize";
import { sequelize } from "../configs/database.js";

const Project = sequelize.define('Project', {
    Id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: false, // Not the primary key, as Name and Tag are the composite PK
    },
    Name: {
        type: DataTypes.TEXT,
        allowNull: false,
        primaryKey: true, // Part of composite PK
    },
    Tag: {
        type: DataTypes.TEXT,
        allowNull: false,
        primaryKey: true, // Part of composite PK
    },
    Description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    SCountry: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    SPort: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    DCountry: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    DPort: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    ProductType: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
}, {
    tableName: 'Project',
    timestamps: false,
});


export default Project;