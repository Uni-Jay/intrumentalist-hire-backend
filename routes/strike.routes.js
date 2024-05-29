module.exports = app => {
    const strike = require("../controllers/strike.controller.js");
    const authenticateUser = require("../middlewares/authenticateUser.js");
    const { validate } = require("../middlewares/validators.js");
    const { createStrike } = require("../middlewares/validationSchema.js");
  
    var router = require("express").Router();
    
    router.post("/", validate(createStrike), authenticateUser, strike.createStrike);
  
    router.get("/all", strike.getStrikes);
    router.get("/:id", authenticateUser, strike.getStrike); 
  
    router.put("/:id", validate(createStrike), authenticateUser, strike.updateStrike);
    router.delete("/:id", authenticateUser, strike.deleteStrike);
    
    app.use('/api/strike', router);
  };
  