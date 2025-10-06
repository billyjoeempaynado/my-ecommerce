// ========================== models/Supplier.js ==========================

import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Supplier = sequelize.define(
  "Supplier",
  {
    id: {                       // Primary key
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {                     // Supplier name
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {                    // Supplier email
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isEmail: true }
    },
    phone: {                    // Supplier phone
      type: DataTypes.STRING,
      allowNull: true
    },
    address: {                  // Supplier address
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    tableName: "suppliers",     // Maps to your suppliers table
    timestamps: true,           // created_at / updated_at
    underscored: true           // snake_case columns
  }
);

export default Supplier;
