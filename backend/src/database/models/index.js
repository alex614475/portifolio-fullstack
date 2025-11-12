import { sequelize } from "../../config/database.js";
import User from "./userModel.js";

User.initModel(sequelize);

export { sequelize, User };
