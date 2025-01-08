const mongoose = require('mongoose');

const ClientBookingSchema = new mongoose.Schema(
  {
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client',
      required: true,
    },
    visitDate: {
      type: Date,
      required: true,
    },
    visitTime: {
      type: String,
      required: true,
    },
    serviceType: {
      type: String,
      required: true,
      enum: ['Nursing', 'Physiotherapy', 'General Care', 'Specialized Care'], // Example services
    },
    clientAddress: {
      street: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      zipCode: {
        type: String,
        required: true,
      },
      latitude: {
        type: Number,
        required: true,
      },
      longtitude: {
        type: Number,
        required: true,
      },
    },
    status: {
      type: String,
      enum: ['Pending', 'Visit Created', 'Cancelled'],
      default: 'Pending',
    },
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Paid', 'Failed'],
      default: 'Pending',
    },
    more_info: {
      type: String,
      maxlength: 500,
      required: true,
    },
  },
  {
    timestamps: true,
    required: true,
  }
);

module.exports = mongoose.model('ClientBooking', ClientBookingSchema);
