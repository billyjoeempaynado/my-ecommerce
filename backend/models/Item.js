// ========================== models/Item.js ==========================

import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

// Define Item model (maps to 'items' table in DB)
const Item = sequelize.define(
  "Item",
  {
    id: {                       // Primary key
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {                     // Item name
      type: DataTypes.STRING,
      allowNull: false
    },
    code: {                     // Unique item code
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    price: {                    // Price of the item
      type: DataTypes.FLOAT,
      allowNull: false
    },
    stock: {                    // Quantity in stock
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    category_id: {              // Foreign key → categories.id
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "categories",    // Must match table name in DB
        key: "id"
      }
    },
     supplier_id: {              // Foreign key → supplier.id
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "suppliers",    // Must match table name in DB
        key: "id"
      }
    }

    
  },
  {
    tableName: "items",         // Explicit table name
    timestamps: true,           // Adds created_at / updated_at automatically
    underscored: true           // Uses snake_case instead of camelCase
  }
);

export default Item;
