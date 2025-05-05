const mongoose = require('mongoose');

const DoctorAppointmentSchema = new mongoose.Schema(
    {
        clientId: {
              type: mongoose.Schema.Types.ObjectId,
              default: () => new mongoose.Types.ObjectId(),
              required: true,
            },
            FullName: {
              type: String,
              required: true,
            },
            PhoneNumber: {
                type: String,
                required: true,
              },
            emailAddress: {
              type: String,
              optional: true
            },
            Gender: {
              type: String,
              required: true,
              enum:['Male','Female','Other']
            },
            DateOfBirth: {
              type: Date,
              required: true,
            },
            AppointmentDetails: {
              type: String,
              required: true,
              mandatory: true, // prefered doctor by the client
            },
            alternative:{
                type: String,
                required: true,
                enum:['Cardiology','Pediatrics','Dermatology','Neurology','Orthopedics','Psychiatry','General Medicine','Gynecology','Ophthalmology','ENT'],    
            },
            AppointmentDate: {
              type: Date,
              required: true,
            },
            TimeSlot:{
                type: String,
                required: true,
                enum:['9:00 AM - 10:00 AM','10:00 AM - 11:00 AM','11:00 AM - 12:00 PM','12:00 PM - 1:00 PM','1:00 PM - 2:00 PM','2:00 PM - 3:00 PM','3:00 PM - 4:00 PM','4:00 PM - 5:00 PM'],
            },
            ReasonForVisit: {
              type: String,
              required: true,
            },
            MedicalHistory:{
                type: String,
                required: true,
                enum:['Diabetes','Hypertension','Heart Disease','Asthma','Allergies','Cancer','Chronic Pain','Obesity','Arthritis','Other'],
            },
            InsuranceDetails:{
                type: String,
                optional:true,
            },
            PolicyNumber:{
                type: String,
                optional:true,
            }
    }
)
module.exports = mongoose.model('DoctorAppointment', DoctorAppointmentSchema);