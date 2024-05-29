module.exports = app => {
    const booking = require("../controllers/booking.controller.js");
    const authenticateUser = require("../middlewares/authenticateUser.js");
    const { validate } = require("../middlewares/validators.js");
    const { createBooking } = require("../middlewares/validationSchema.js");
  
    var router = require("express").Router();
    
    router.post("/", validate(createBooking), booking.createBooking);
  
    router.get("/all", booking.getBookings);
    router.get("/user-booking/:userId", booking.getUserBookings);
    router.get("/:id", booking.getBooking); 
  
    router.put("/:id", validate(createBooking), authenticateUser, booking.updateBooking);
    router.delete("/:id", authenticateUser, booking.deleteBooking);
    
    app.use('/api/booking', router);
  };
  