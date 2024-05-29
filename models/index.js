const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.Users = require("./users.model.js")(sequelize, Sequelize);
db.Strikes = require("./strikes.model.js")(sequelize, Sequelize);
db.Events = require("./events.model.js")(sequelize, Sequelize);
db.Clients = require("./clients.model.js")(sequelize, Sequelize);
db.Gigs = require("./gigs.model.js")(sequelize, Sequelize);
db.Plans = require("./plans.model.js")(sequelize, Sequelize);
db.Bookings = require("./bookings.model.js")(sequelize, Sequelize);


module.exports = db;
