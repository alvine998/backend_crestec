const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('mails', {
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
    dept: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    subject: {
      type: DataTypes.ENUM('email','ftp'),
      allowNull: false
    },
    mail_status: {
      type: DataTypes.ENUM('Baru','Diubah','Dihapus','Auto Forward'),
      allowNull: false
    },
    detail: {
      type: DataTypes.JSON,
      allowNull: false
    },
    notes: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    approved_by: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0
    },
    work_by: {
      type: DataTypes.STRING(100),
      allowNull: true
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
    tableName: 'mails',
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
