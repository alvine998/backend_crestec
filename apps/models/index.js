const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = require("./users")(sequelize, Sequelize);
db.jobs = require("./jobs")(sequelize, Sequelize);
db.mails = require("./mails")(sequelize, Sequelize);
db.helpdesks = require("./helpdesks")(sequelize, Sequelize);
db.storages = require("./storages")(sequelize, Sequelize);
db.purchases = require("./purchases")(sequelize, Sequelize);

// db.partners.belongsTo(db.users, {foreignKey:'user_id', as:'users'})
// db.sessions.belongsTo(db.users, {foreignKey:'user_id', as:'users'})
// db.users.belongsTo(db.partners, {foreignKey:'user_id'})

module.exports = db;