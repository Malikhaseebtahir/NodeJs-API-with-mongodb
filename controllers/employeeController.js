const express= require('express');
const Employee = require('../models/EmployeeSchema');
const mongoose= require('mongoose');

mongoose.connect("mongodb+srv://malikhaseeb1935:peLQk4szRxN3tZS9@cluster0.9mdnjei.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false, // To address the warning about deprecated findOneAndUpdate
  useCreateIndex: true // To address the warning about deprecated ensureIndex
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
    console.log("Connected to MongoDB");
});

const getEmployees = async (req, res) => {
  try {
      const employees = await Employee.find();
      res.json(employees);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};

const createEmployee = async (req, res) => {
  const employee = new Employee({
      name: req.body.name,
      salary: req.body.salary,
      deductions: req.body.deductions
  });
  try {
      const newEmployee = await employee.save();
      res.status(201).json(newEmployee);
  } catch (err) {
      res.status(400).json({ message: err.message });
  }
};
  
const getEmployee = async (req, res) => {
  try {
      const employee = await Employee.findById(req.params.id);
      if (employee) {
          res.json(employee);
      } else {
          res.status(404).json({ message: 'Employee not found' });
      }
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};
  
const updateEmployee = async (req, res) => {
  try {
      const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (employee) {
          res.json(employee);
      } else {
          res.status(404).json({ message: 'Employee not found' });
      }
  } catch (err) {
      res.status(400).json({ message: err.message });
  }
};

// Delete an employee
const deleteEmployee = async (req, res) => {
  try {
      const employee = await Employee.findByIdAndDelete(req.params.id);
      if (employee) {
          res.json({ message: 'Employee deleted' });
      } else {
          res.status(404).json({ message: 'Employee not found' });
      }
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};

module.exports.getEmployees= getEmployees;
module.exports.createEmployeeMongo= createEmployee;
module.exports.getEmployee= getEmployee;
module.exports.updateEmployee= updateEmployee;
module.exports.deleteEmployee= deleteEmployee;