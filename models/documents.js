'use strict';
const Model = require('sequelize').Model;

// Documents table declaration
module.exports = (sequelize, DataTypes) => {
  class documents extends Model {
    // Zone where do association between tables
    static associate(models) { }
  };

  // Column declaration
  documents.init({
    name: { type: DataTypes.STRING },
    extension: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
    content: { type: DataTypes.BLOB },
    md5: { type: DataTypes.STRING },
    size: { type: DataTypes.STRING }
  }, {
    // Some other options for the table
    sequelize,
    modelName: 'documents',
    freezeTableName: true,
    timestamps: false
  });
  return documents;
};