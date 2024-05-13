const express= require('express');
const mongoose= require('mongoose');
const cors = require('cors'); // Import cors module

const app=express();
app.use(cors());

const port=9000;

app.use(express.json());

const studentrouter= require("./routes/employee");
app.use('/employees',studentrouter)



app.listen(port, () =>{
    console.log('Server started');
})

