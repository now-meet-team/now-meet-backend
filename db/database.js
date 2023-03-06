import { dotconfig } from "../dotconfig.js";
import SQ from "sequelize";

const { host, user, database, password } = dotconfig.db;

export const sequelize = new SQ.Sequelize(database, user, password, {
  host,
  dialect: "mysql",
  logging: false,
});
