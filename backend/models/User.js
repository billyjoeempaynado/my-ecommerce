import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const User = sequelize.define("user", {
  username: { 
      type: DataTypes.STRING, 
      unique: true, 
      allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { 
      type: DataTypes.STRING, 
      defaultValue: "user" }, // "user" or "admin"
  email: {                    // Supplier email
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isEmail: true }
    }
  },
  {
    tableName: "users",     // Maps to your suppliers table
    timestamps: true,           // created_at / updated_at
    underscored: true           // snake_case columns
  }
);

export default User;
