// ========================== models/Category.js ==========================
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";



const Category = sequelize.define(
  "Category",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // ⚠️ this extra constraint might cause mismatch if duplicates exist
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "categories",  // ✅ use lowercase, matches PostgreSQL default
    timestamps: false,        // ✅ disable Sequelize’s automatic timestamps
    underscored: true,        // ✅ ensures snake_case columns (e.g. created_at)
  }
);



export default Category;

