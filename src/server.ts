import bodyParser from "body-parser";
import Express from "express";
import dotenv from "dotenv";

dotenv.config();

const App = Express();

App.use(bodyParser.json());

const portApp = process.env.PORT_APP || 4900;

App.listen(portApp, () => {
  console.log(`listen in http://localhost:${portApp}/ `);
});
