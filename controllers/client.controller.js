const db = require("../models");
const Client = db.Clients;
const User = db.Users;
const Event = db.Events;

// Create a new Client
exports.createClient = async (req, res) => {
  const { fullname, email,  street_name, location, } = req.body;

  try {

    if(!fullname || !email || !street_name || !location) {
        return res.status(400).json({error: "Incomplete params"});
    }

    // const existingClient = await Client.findOne({ where: { email: email } });
    // // const existingEvent = await Event.findOne({ where: { id: event_id } });

    // if(existingClient) {
    //     return res.status(400).json({ error: `Client already exists!"` });
    // }

    // if(!existingEvent) {
    //     return res.status(404).json({ error: "Event not found!" });
    // }
    
    const newClient = await Client.create({
      fullname: fullname,
      email: email,
      street_name: street_name,
      location: location, 
    });

    if (newClient) {
      return res.status(201).json({ message: "Client created successfully!", clientId: newClient?.id });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create client" });
  }
};

// Read all Clients
exports.getClients = async (req, res) => {
  try {
    const clients = await Client.findAll();
    res.status(200).json(clients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Read a single Client by ID
exports.getClient = async (req, res) => {
  try {
    const client = await Client.findByPk(req.params.id);
    if (!client) {
      return res.status(404).json({ error: "Client not found" });
    }
    res.status(200).json(client);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Update a Client by ID
exports.updateClient = async (req, res) => {
  const { fullname, email,  street_name, location, } = req.body;

  try {

    if(!fullname || !email || !street_name || !location) {
        return res.status(400).json({error: "Incomplete params"});
    }

    // const existingUser = await User.findOne({ where: { id: user_id } });
    // const existingEvent = await Event.findOne({ where: { id: event_id } });

    // if(!existingUser) {
    //     return res.status(404).json({ error: "User not found!" });
    // }

    // if(!existingEvent) {
    //     return res.status(404).json({ error: "Event not found!" });
    // }
    

    const existingClient = await Client.findByPk(req.params.id);

    if (!existingClient) {
      return res.status(404).json({ message: "Client not found!" });
    }

    const updatedClient = await existingClient.update({
      fullname: fullname || existingClient.fullname,
      email: email || existingClient.email,
      street_name: street_name || existingClient.street_name,
      location: location || existingClient.location,
    });

    if(updatedClient){
        return res.status(200).json({ message: "Client updated successfully!" });
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update client" });
  }
};

// Delete a Client by ID
exports.deleteClient = async (req, res) => {
  try {
    const client = await Client.findByPk(req.params.id);

    if (!client) {
      return res.status(404).json({ error: "Client not found" });
    }

    await client.destroy();
    res.status(200).json({ message: "Client deleted successfully!" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
