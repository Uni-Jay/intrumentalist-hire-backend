module.exports = app => {
    const plan = require("../controllers/plan.controller.js");
    const authenticateUser = require("../middlewares/authenticateUser.js");
    const { validate } = require("../middlewares/validators.js");
    const { createPlan } = require("../middlewares/validationSchema.js");
  
    var router = require("express").Router();
    
    router.post("/", validate(createPlan), authenticateUser, plan.createPlan);
  
    router.get("/all", plan.getPlans);
    router.get("/user-plans/:userId", plan.getUserPlans);
    router.get("/:id", authenticateUser, plan.getPlan); 
  
    router.put("/:id", validate(createPlan), authenticateUser, plan.updatePlan);
    router.delete("/:id", authenticateUser, plan.deletePlan);
    
    app.use('/api/plan', router);
  };
  