'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
   
    
    static associate(models) {
       
      this.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });
 
      this.belongsToMany(models.Doctor, {
        through: 'PatientDoctorMappings',  
        as: 'doctors',
      });
    }
  }
  Patient.init({
    name: DataTypes.STRING,
    dateOfBirth: DataTypes.DATE,
    gender: DataTypes.STRING,
    contactInfo: DataTypes.STRING,
    
  }, {
    sequelize,
    modelName: 'Patient',
  });
  return Patient;
};