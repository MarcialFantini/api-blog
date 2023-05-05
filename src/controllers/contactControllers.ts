import { Request, Response } from "express";
import ContactService from "../services/ContactService";

const contactService = new ContactService();

// Controlador para crear un nuevo registro de Contact
export const createContact = async (req: Request, res: Response) => {
  try {
    const contact = await contactService.create({
      ...req.body,
    });

    if (!contact) {
      return res.status(500).json({ message: "not created", status: 500 });
    }

    res.status(201).json({ message: "created contactad", status: 201 });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// Controlador para obtener todos los registros de Contact
export const getAllContacts = async (req: Request, res: Response) => {
  try {
    const page: number = Number(req.params.page);
    const contacts = await contactService.getAll(page);
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// Controlador para obtener un registro de Contact por su ID
export const getContactById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const contact = await contactService.getById(id);
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
