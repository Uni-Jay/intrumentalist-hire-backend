const db = require("../models");
const Event = db.Events;

// Create a new Event
exports.createEvent = async (req, res) => {
  const { name, description } = req.body;

  try {

    if(!name || !description) {
        return res.status(400).json({error: "Incomplete params"})
    }

    const newEvent = await Event.create({
      name,
      description,
    });

    if (newEvent) {
      return res.status(201).json({ message: "Event created successfully!" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create event" });
  }
};

// Read all Events
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.findAll();
    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Read a single Event by ID
exports.getEvent = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Read a single user Events by ID
exports.getUserEvents = async (req, res) => {
  try {
    const events = await Event.findAll({ where: { user_id: req.params.userId } });
    if (!events) {
      return res.status(404).json({ error: "Events not found" });
    }
    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Update an Event by ID
exports.updateEvent = async (req, res) => {
  const { name, description } = req.body;

  try {

    if(!name || !description) {
        return res.status(400).json({error: "Incomplete params"})
    }

    const existingEvent = await Event.findByPk(req.params.id);

    if (!existingEvent) {
      return res.status(404).json({ message: "Event not found!" });
    }

    const updatedEvent = await existingEvent.update({
      name: name || existingEvent.name,
      description: description || existingEvent.description,
    }, {
        where: {
            id: existingEvent?.id
        }
    });

    if(updatedEvent){
        return res.status(200).json({ message: "Event updated successfully!" });
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update event" });
  }
};

// Delete an Event by ID
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    await event.destroy({
        where: {
            id: req.params.id
        }
    });
    res.status(200).json({ message: "Event deleted successfully!" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
