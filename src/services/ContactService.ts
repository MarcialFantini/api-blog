import { sequelize } from "../libs/sequelize";

const Contact = sequelize.models.Contact;

interface oneContact {
  id: number;
  id_user: number;
  message: string;
}

class ContactService {
  // Crear un nuevo registro de Contact
  async create(data: any) {
    const contact = await Contact.create(data);
    return contact;
  }

  // Obtener todos los registros de Contact
  async getAll(page: number) {
    const contacts = await Contact.findAll({
      attributes: ["id", "id_user", "message"],
      limit: 20,
      offset: (page - 1) * 20,
    });
    return contacts;
  }

  // Obtener un registro de Contact por su ID
  async getById(id: number) {
    const contact = (await Contact.findByPk(id)) as oneContact | null;
    if (!contact) {
      throw new Error("Contact not found");
    }
    return {
      id: contact.id,
      id_user: contact.id_user,
      message: contact.message,
    };
  }
}

export default ContactService;
