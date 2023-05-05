import express from "express";
import {
  createContact,
  getAllContacts,
  getContactById,
} from "../controllers/contactControllers";
import { authUser } from "../middlewares/autUser";
import { authMiddlewareAdmin } from "../middlewares/autAdmin";

const routerContact = express.Router();

routerContact.post("/", createContact);
routerContact.get("/page/:page", authMiddlewareAdmin, getAllContacts);
routerContact.get("/:id", authMiddlewareAdmin, getContactById);

export { routerContact };
