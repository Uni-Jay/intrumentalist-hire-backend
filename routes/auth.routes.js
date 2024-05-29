module.exports = app => {
    const auth = require("../controllers/auth.controller.js");
    const { validate } = require("../middlewares/validators.js");
    const { register, login } = require("../middlewares/validationSchema.js");
  
    var router = require("express").Router();
    
       router.post("/register", validate(register), auth.register);
       router.post("/login", validate(login), auth.login);
       router.post("/forgot-password", auth.forgotPassword);
       router.post("/verify-otp", auth.verifyOTP);
       router.post("/reset-password", auth.resetPassword);
       router.get("/logout", auth.logout);

    
    app.use('/api/auth', router);
  };
  