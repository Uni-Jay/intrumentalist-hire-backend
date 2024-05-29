module.exports = app => {
    const client = require("../controllers/client.controller.js");
    const authenticateUser = require("../middlewares/authenticateUser.js");
    const { validate } = require("../middlewares/validators.js");
    const { createClient } = require("../middlewares/validationSchema.js");
  
    var router = require("express").Router();
    
    router.post("/", validate(createClient),  client.createClient);
  
    router.get("/all", client.getClients);
    router.get("/:id", authenticateUser, client.getClient); 
  
    router.put("/:id", validate(createClient), client.updateClient);
    router.delete("/:id", authenticateUser, client.deleteClient);
    
    app.use('/api/client', router);
  };
  