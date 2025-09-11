'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Doctor extends Model {
    
    static associate(models) {
       
      this.belongsToMany(models.Patient, {
        through: 'PatientDoctorMappings',  
        as: 'patients',
      });
    }
  }
  Doctor.init({
    name: DataTypes.STRING,
    specialization: DataTypes.STRING,
    contactInfo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Doctor',
  });
  return Doctor;
};