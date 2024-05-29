
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const http = require("http");
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const config = require("./config");
const uploadImage = require("./middlewares/uploadimage");
const sendMail = require("./middlewares/sendMail");


const app = express();
const { port, allowedDomains } = config;


app.use(cors({ 
  origin: allowedDomains, 
  // origin: "*", 
  credentials: true 
}));
app.use(helmet());
app.use(compression());
app.use(cookieParser());



// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true, limit: "25mb" }));
// parse requests of content-type - application/json
app.use(express.json({ limit: "25mb" }));


app.post("/api/uploadImage", (req, res) => {
  uploadImage(req.body.image)
    .then((url) => res.status(200).json({ message: url }))
    .catch((err) => res.status(500).json({ error: err }))
});

app.post("/api/sendMail", sendMail);
 
const db = require("./models");

db.sequelize.sync()
  .then(() => {
    console.log("Synced database.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });




//Setting the routes
app.get("/", (req, res) => {
    res.json("Its Working!");
});

require("./routes/auth.routes.js")(app);
require("./routes/user.routes.js")(app);
require("./routes/plan.routes.js")(app);
require("./routes/event.routes.js")(app);
require("./routes/gig.routes.js")(app);
require("./routes/booking.routes.js")(app);
require("./routes/client.routes.js")(app);
require("./routes/strike.routes.js")(app);



//Error Handling 
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";

    return res.status(errorStatus).json({
        success: false,
        status:  errorStatus,
        message: errorMessage,
    });

})

app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
})
