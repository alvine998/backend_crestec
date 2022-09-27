const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('jobs', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    req_by: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    approved_by: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    work_by: {
      type: DataTypes.ENUM('EDP','SERVICE','Maintenance','Sendiri'),
      allowNull: true
    },
    accepted_by: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    result: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    dept: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    subject: {
      type: DataTypes.ENUM('Masalah Hardware','Masalah Software','Masalah Printer','Preventif','Masalah Lainnya'),
      allowNull: false
    },
    detail: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    notes: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
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
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'jobs',
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
      {
        name: "user_id",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
};
