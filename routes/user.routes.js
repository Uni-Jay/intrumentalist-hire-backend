module.exports = app => {
  const user = require("../controllers/user.controller.js");
  const authenticateUser = require("../middlewares/authenticateUser.js");
  const { validate } = require("../middlewares/validators.js");
  const { register, updateUser} = require("../middlewares/validationSchema.js");

  var router = require("express").Router();
  
  router.post("/", validate(register), authenticateUser, user.createUser);

  router.get("/all", user.getUsers);
  router.get("/:id", user.getUser); 

  router.put("/:id", validate(updateUser), authenticateUser, user.updateUser);
  router.delete("/:id", authenticateUser, user.deleteUser);
  
  app.use('/api/user', router);
};
