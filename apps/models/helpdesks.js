const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('helpdesks', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    created_by: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    category: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    body: {
      type: DataTypes.JSON,
      allowNull: false
    },
    created_on: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    },
    modified_on: {
      type: DataTypes.DATE,
      allowNull: true
    },
    deleted: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'helpdesks',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
