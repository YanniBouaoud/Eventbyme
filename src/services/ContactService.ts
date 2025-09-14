import Contact from "../models/Contact";

class ContactService {
  static async save(newContact: Contact): Promise<Contact | null> {
    const headers = {
      "Content-Type": "application/json",
      "Content-Security-Policy": "default-src 'self'; script-src 'none'",
    };

    return fetch(`http://localhost:8080/contact/`, {
      method: "POST",
      body: JSON.stringify(newContact),
      headers: headers,
    }).then(async (response) => {
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      // si le serveur renvoie un body vide → éviter le crash
      const text = await response.text();
      return text ? JSON.parse(text) : null;
    });
  }
}

export default ContactService;
