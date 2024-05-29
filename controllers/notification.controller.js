const Notifications = require("../models/notifications.model");

// Create a new Notification
exports.createNotification = async (req, res) => {
  try {
    const newNotification = await Notifications.create({});

    if (newNotification) {
      return res.status(201).json({ message: "Notification created successfully!" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create notification" });
  }
};

// Read all Notifications
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notifications.findAll();
    res.status(200).json(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Read a single Notification by ID
exports.getNotification = async (req, res) => {
  try {
    const notification = await Notifications.findByPk(req.params.id);
    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }
    res.status(200).json(notification);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Update a Notification by ID
exports.updateNotification = async (req, res) => {
  try {
    const existingNotification = await Notifications.findByPk(req.params.id);

    if (!existingNotification) {
      return res.status(404).json({ message: "Notification not found!" });
    }

    return res.status(200).json({ message: "Notification updated successfully!" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update notification" });
  }
};

// Delete a Notification by ID
exports.deleteNotification = async (req, res) => {
  try {
    const notification = await Notifications.findByPk(req.params.id);

    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }

    await notification.destroy();
    res.status(200).json({ message: "Notification deleted successfully!" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
