import Item from "./Item.js";
import Category from "./Category.js";
import Supplier from "./Supplier.js";


// Category ↔ Item
Category.hasMany(Item, { foreignKey: "category_id", as: "items" });
Item.belongsTo(Category, { foreignKey: "category_id", as: "category" });

// Supplier ↔ Item
Supplier.hasMany(Item, { foreignKey: "supplier_id", as: "items" });
Item.belongsTo(Supplier, { foreignKey: "supplier_id", as: "supplier" });

export { Item, Category, Supplier };
