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
const assessmentRouter = require('./router/assessmentRouter.js'); 
const runnerRouter = require('./router/runnnerRouter.js'); 
const patientVitalsRouter = require('./router/patientVitalRouter.js'); 
const concernRouter = require('./router/concernRoute.js'); 
const bookingRouter = require('./router/bookingRoute.js'); 

const url = "mongodb+srv://ashmaptech:Eav74UplzNppU6zs@healthcarebackend.t6vwc.mongodb.net/?retryWrites=true&w=majority&appName=HealthCareBackend";
const app = express();
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
app.use('/api/v1/asessment_route', assessmentRouter);
app.use('/api/v1/runner_route', runnerRouter);
app.use('/api/v1/patient_vitals_route', patientVitalsRouter);
app.use('/api/v1/concern_route', concernRouter);
app.use('/api/v1/booking_route', bookingRouter);
const Port = 4071;
app.listen(Port, () => {
    console.log("The server is running at port:", Port);
});