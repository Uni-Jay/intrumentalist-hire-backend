module.exports = app => {
    const event = require("../controllers/event.controller.js");
    const authenticateUser = require("../middlewares/authenticateUser.js");
    const { validate } = require("../middlewares/validators.js");
    const { createEvent } = require("../middlewares/validationSchema.js");
  
    var router = require("express").Router();
    
    router.post("/", validate(createEvent), authenticateUser, event.createEvent);
  
    router.get("/all", event.getEvents);
    router.get("/user-events/:userId", event.getUserEvents);
    router.get("/:id", authenticateUser, event.getEvent); 
  
    router.put("/:id", validate(createEvent), authenticateUser, event.updateEvent);
    router.delete("/:id", authenticateUser, event.deleteEvent);
    
    app.use('/api/event', router);
  };
  