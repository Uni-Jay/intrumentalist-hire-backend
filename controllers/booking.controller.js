const db = require("../models");
const Booking = db.Bookings;
const User = db.Users;
const Event = db.Events;
const Client = db.Clients;
const sequelize = db.sequelize;

// Create a new Booking
exports.createBooking = async (req, res) => {
  try {
    const { showup_status, event_date, event_period, event_status, remark, client_id, user_id, event_id, event_from, event_to } = req.body;

    if( !event_date || !event_period || !event_status || !client_id || !user_id || !event_id || !event_from || !event_to ) {
        return res.status(400).json({error: "Incomplete params"});
    }

    // if (showup_status !== "yes" && showup_status !== "no") {
    //     return res.status(400).json({ error: "Invalid show_up status" });
    // }


    const existingUser = await User.findOne({ where: { id: user_id } });
    const existingEvent = await Event.findOne({ where: { id: event_id } });
    const existingClient = await Client.findOne({ where: { id: client_id } });

    if(!existingUser) {
        return res.status(404).json({ error: "User not found!" });
    }

    if(!existingEvent) {
        return res.status(404).json({ error: "Event not found!" });
    }
    

    if(!existingClient) {
        return res.status(404).json({ error: "Client not found!" });
    }


    const newBooking = await Booking.create({
      showup_status: showup_status,
      event_date: event_date,
      event_period: event_period,
      event_status: event_status,
      remark: remark,
      event_from: event_from, 
      event_to: event_to,
      client_id: existingClient?.id, 
      user_id: existingUser?.id,
      event_id: existingEvent?.id,
    });

    if(newBooking) {
        res.status(201).json({ message: 'Booking created successfully!'});
    }

  } catch (err) {
    console.error('Booking Add Error', err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// Read all Bookings
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      include: [
        { model: sequelize.models.clients },
        { model: sequelize.models.users },
        { model: sequelize.models.events },
      ],
    });
    res.status(200).json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// Read a single user Bookings
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({ where: { user_id: req.params.userId },
      include: [
        { model: sequelize.models.clients },
        { model: sequelize.models.users },
        { model: sequelize.models.events },
      ],
    });
    res.status(200).json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
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

// Read a single Booking by ID
exports.getBooking = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id, {
      include: [
        { model: sequelize.models.clients },
        { model: sequelize.models.users }, 
        { model: sequelize.models.events },
      ],
    });
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.status(200).json(booking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// Update a Booking by ID
exports.updateBooking = async (req, res) => {
  try {
    const { showup_status, event_date, event_period, event_status, remark, client_id, user_id, event_id, event_from, event_to } = req.body;

    if( !event_date || !event_period || !event_status || !client_id || !user_id || !event_id || !event_from || !event_to ) {
        return res.status(400).json({error: "Incomplete params"});
    }

    // if (showup_status !== "yes" && showup_status !== "no") {
    //     return res.status(400).json({ error: "Invalid show_up status" });
    // }


    const existingUser = await User.findOne({ where: { id: user_id } });
    const existingEvent = await Event.findOne({ where: { id: event_id } });
    const existingClient = await Client.findOne({ where: { id: client_id } });

    if(!existingUser) {
        return res.status(404).json({ error: "User not found!" });
    }

    if(!existingEvent) {
        return res.status(404).json({ error: "Event not found!" });
    }
    

    if(!existingClient) {
        return res.status(404).json({ error: "Client not found!" });
    }

    const existingBooking = await Booking.findByPk(req.params.id);

    if (!existingBooking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    const updateBooking = await Booking.update({
      showup_status: showup_status,
      event_date: event_date,
      event_period: event_period,
      event_status: event_status,
      remark: remark,
      event_from: event_from, 
      event_to: event_to,
      client_id: existingClient?.id, 
      user_id: existingUser?.id,
      event_id: existingEvent?.id,
    }, {
        where: {
            id: existingBooking?.id,
        }
    });

    if(updateBooking) {
        res.status(201).json({ message: 'Booking created successfully!'});
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// Delete a Booking by ID
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id);

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    await booking.destroy({ where: {
        id: req.params.id,
    }});
    res.status(200).json({ message: 'Booking deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};
