import bodyParser from "body-parser";
import Express from "express";
import dotenv from "dotenv";
import { routerSetUp } from "./routes/router";
import { httpTypeLogMiddleware } from "./middlewares/httpTypeLogMiddleware";
import cors from "cors";

dotenv.config();

const App = Express();
App.use(cors());
App.use(bodyParser.json());
App.use(httpTypeLogMiddleware);
routerSetUp(App);

const portApp = process.env.PORT_APP || 4900;

App.listen(portApp, () => {
  console.log(`listen in http://localhost:${portApp}/ `);
});
