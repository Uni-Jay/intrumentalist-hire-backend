const ClientNotifications = require("../models/client_notifications.model");

// Create a new ClientNotification
exports.createClientNotification = async (req, res) => {
  try {
    const newClientNotification = await ClientNotifications.create({});

    if (newClientNotification) {
      return res.status(201).json({ message: "Client Notification created successfully!" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create client notification" });
  }
};

// Read all ClientClientNotifications
exports.getClientNotifications = async (req, res) => {
  try {
    const clientNotifications = await ClientNotifications.findAll();
    res.status(200).json(clientNotifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Read a single ClientNotification by ID
exports.getClientNotification = async (req, res) => {
  try {
    const clientNotification = await ClientNotifications.findByPk(req.params.id);
    if (!clientNotification) {
      return res.status(404).json({ error: "Client Notification not found" });
    }
    res.status(200).json(clientNotification);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Update a ClientNotification by ID
exports.updateClientNotification = async (req, res) => {
  try {
    const existingClientNotification = await ClientNotifications.findByPk(req.params.id);

    if (!existingClientNotification) {
      return res.status(404).json({ message: "Client Notification not found!" });
    }

    return res.status(200).json({ message: "Client Notification updated successfully!" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update client notification" });
  }
};

// Delete a ClientNotification by ID
exports.deleteClientNotification = async (req, res) => {
  try {
    const Clientnotification = await ClientNotifications.findByPk(req.params.id);

    if (!Clientnotification) {
      return res.status(404).json({ error: "Client Notification not found" });
    }

    await Clientnotification.destroy();
    res.status(200).json({ message: "Client Notification deleted successfully!" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
