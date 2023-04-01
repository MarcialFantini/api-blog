import { Sequelize } from "sequelize";
import { setUpModels } from "../db/setUpDb";
import dotEnv from "dotenv";

dotEnv.config();

// console.log(
//   process.env.NAME_DB,
//   process.env.USER_DB,
//   process.env.PASSWORD_DB,
//   process.env.HOST_DB
// );

const sequelize = new Sequelize(
  process.env.NAME_DB || "nameDB",
  process.env.USER_DB || "user",
  process.env.PASSWORD_DB || "password",
  {
    dialect: "postgres",
    host: process.env.HOST_DB || "localhost",
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection complete");
    await sequelize.sync({ alter: true });
  } catch (error) {
    console.log("error with connect");
    console.log(error);
  }
})();

setUpModels(sequelize);

export { sequelize };
