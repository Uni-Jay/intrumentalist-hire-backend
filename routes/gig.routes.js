module.exports = app => {
    const gig = require("../controllers/gig.controller.js");
    const authenticateUser = require("../middlewares/authenticateUser.js");
    const { validate } = require("../middlewares/validators.js");
    const { createGig } = require("../middlewares/validationSchema.js");
  
    var router = require("express").Router();
    
    router.post("/", validate(createGig), authenticateUser, gig.createGig);
  
    router.get("/all", gig.getGigs);
    router.get("/user-gigs/:userId",  gig.getUserGigs);
    router.get("/:id",  gig.getGig); 
  
    router.put("/:id", validate(createGig), authenticateUser, gig.updateGig);
    router.delete("/:id", authenticateUser, gig.deleteGig);
    
    app.use('/api/gig', router);
  };
  