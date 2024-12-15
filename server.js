const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const clientRouter = require('./router/clientRouter.js'); // Adjust the path as per your project structure
const familyMembeRouter = require('./router/familyMemberRouter.js'); // Adjust the path as per your project structure
const employeeRouter = require('./router/employeeRouter.js'); // Adjust the path as per your project structure
const adminRouter = require('./router/adminRouter.js'); // Adjust the path as per your project structure
const visitRouter = require('./router/visitRouter.js'); // Adjust the path as per your project structure
const taskRouter = require('./router/taskRouter.js'); 
const medicineRouter = require('./router/medicineRouter.js'); 
const observationRouter = require('./router/observationRouter.js'); 
const invoiceRouter = require('./router/invoiceRouter.js'); 

const url = "mongodb://localhost:27017/Care_Profsional_App";

const app = express();

// MongoDB Connection
mongoose.connect(url)
    .then(() => {
        console.log('The MongoDB has connected successfully');
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Register routes
app.use('/api/v1/clients', clientRouter);
app.use('/api/v1/family_member', familyMembeRouter);
app.use('/api/v1/employee', employeeRouter);
app.use('/api/v1/admin_route', adminRouter);
app.use('/api/v1/visit_route', visitRouter);
app.use('/api/v1/task_route', taskRouter);
app.use('/api/v1/medication_route', medicineRouter);
app.use('/api/v1/observation_route', observationRouter);
app.use('/api/v1/invoice_route', invoiceRouter);

const Port = 4071;
app.listen(Port, () => {
    console.log("The server is running at port:", Port);
});
