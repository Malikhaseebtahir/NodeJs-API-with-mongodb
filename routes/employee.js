const express = require("express");

const  employees = require("../controllers/employeeController"); 

const router = express.Router();

router.get('/', employees.getEmployees);
router.get('/:id', employees.getEmployee);
router.post('/', employees.createEmployeeMongo);
router.put('/:id', employees.updateEmployee);
router.delete('/:id', employees.deleteEmployee);

module.exports=router;