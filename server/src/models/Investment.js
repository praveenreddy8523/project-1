import { DataTypes } from "sequelize";
import { sequelize } from "../configs/database.js";

const Investment = sequelize.define('Investment', {
    Id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: false, // Not the primary key, as Name and Tag are the composite PK
    },
    UserId: {
        type: DataTypes.TEXT,
        allowNull: false,
        primaryKey: false, // Part of composite PK
    },
    Ammount: {
        type: DataTypes.TEXT,
        allowNull: false,
        primaryKey: true, // Part of composite PK
    },
    Date: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    Intrest: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    Tags: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
        allowNull: false,
    },
    TypeOfReturn: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    tableName: 'Investment',
    timestamps: false,
});


export default Investment;