var DataTypes = require("sequelize").DataTypes;
var _mails = require("./mails");

function initModels(sequelize) {
  var mails = _mails(sequelize, DataTypes);

  mails.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(mails, { as: "mails", foreignKey: "user_id"});

  return {
    mails,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
