var DataTypes = require("sequelize").DataTypes;
var _purchases = require("./purchases");

function initModels(sequelize) {
  var purchases = _purchases(sequelize, DataTypes);


  return {
    purchases,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
