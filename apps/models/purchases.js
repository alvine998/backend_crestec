const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('purchases', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    job_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    req_by: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    dept: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    in_kind: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    total: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    estimation_price: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    total_price: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    approved_by: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0
    },
    created_on: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
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
    tableName: 'purchases',
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
