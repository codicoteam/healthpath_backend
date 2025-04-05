const express = require("express");
const router = express.Router();
const { Paynow } = require("paynow");
const MedicalReceipt = require("../models/medical_receipts/medical_receipts");
const { authenticateToken } = require("../middleware/auth");

const paynow = new Paynow("20035", "57832f6f-bd15-4877-81be-c8e30e390a88");
paynow.resultUrl = "http://example.com/gateways/paynow/update";
paynow.returnUrl =
  "http://example.com/return?gateway=paynow&merchantReference=1234";

router.post("/web-paynow-me", authenticateToken, async (req, res) => {
  try {
    const {
      customerName,
      customerEmail,
      customerPhoneNumber,
      currency,
      price,
      title,
      showPayment,
      isPaid,
      paymentStatus,
      pharmacyId,
      medicineId,
    } = req.body;

    const receiptNumber = `REC-${Math.floor(100000 + Math.random() * 900000)}`;
    let payment = paynow.createPayment(receiptNumber, customerEmail);
    payment.add(title, price);

    const response = await paynow.send(payment);

    if (response.success) {
      const newPayment = new MedicalReceipt({
        customerName,
        customerEmail,
        customerPhoneNumber,
        currency,
        price,
        title,
        showPayment,
        isPaid,
        paymentStatus,
        pharmacyId,
        medicineId,
        receiptNumber,
        pollUrl: response.pollUrl,
      });
      await newPayment.save();

      res.json({
        redirectURL: response.redirectUrl,
        pollUrl: response.pollUrl,
      });
    } else {
      res.status(500).json({ error: response.errors });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const processMobilePayment = async (req, res, method) => {
  try {
    const {
      customerName,
      customerEmail,
      customerPhoneNumber,
      currency,
      price,
      title,
      showPayment,
      isPaid,
      paymentStatus,
      pharmacyId,
      medicineId,
    } = req.body;

    const receiptNumber = `REC-${Math.floor(100000 + Math.random() * 900000)}`;
    let payment = paynow.createPayment(receiptNumber, customerEmail);
    payment.add(title, price);

    const response = await paynow.sendMobile(
      payment,
      customerPhoneNumber,
      method
    );

    if (response.success) {
      const newPayment = new MedicalReceipt({
        customerName,
        customerEmail,
        customerPhoneNumber,
        currency,
        price,
        title,
        showPayment,
        isPaid,
        paymentStatus,
        pharmacyId,
        medicineId,
        receiptNumber,
        pollUrl: response.pollUrl,
      });
      await newPayment.save();

      res.json({ pollUrl: response.pollUrl, receiptNumber });
    } else {
      res.status(500).json({ error: response.errors });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

router.post("/mobile-ecocash-paynow-me", authenticateToken, (req, res) =>
  processMobilePayment(req, res, "ecocash")
);
router.post("/mobile-netone-paynow-me", authenticateToken, (req, res) =>
  processMobilePayment(req, res, Paynow.Methods.ONEMONEY)
);
router.post("/mobile-telone-paynow-me", authenticateToken, (req, res) =>
  processMobilePayment(req, res, Paynow.Methods.TELECASH)
);

router.post("/check-status", authenticateToken, async (req, res) => {
  try {
    const { pollUrl } = req.body;
    const status = await paynow.pollTransaction(pollUrl);

    if (status.status === "paid") {
      await MedicalReceipt.findOneAndUpdate(
        { pollUrl },
        { paymentStatus: "Paid", isPaid: true }
      );
      return res
        .status(200)
        .json({ status: status.status, message: "Transaction successful." });
    } else if (status.status === "created") {
      return res.status(202).json({
        status: status.status,
        message: "Transaction initiated but no payment has been made.",
      });
    } else if (status.status === "cancelled") {
      return res
        .status(202)
        .json({ status: status.status, message: "Transaction cancelled." });
    } else if (status.status === "sent") {
      return res.status(202).json({
        status: status.status,
        message: "Transaction sent to client for payment.",
      });
    } else {
      return res.status(400).json({
        status: status.status,
        message: "Transaction status unknown or failed.",
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get(
  "/medical-receipts/:customerEmail",
  authenticateToken,
  async (req, res) => {
    try {
      const { customerEmail } = req.params;
      const receipts = await MedicalReceipt.find({ customerEmail });

      if (receipts.length === 0) {
        return res
          .status(404)
          .json({ message: "No payment history found for this user." });
      }

      res.status(200).json(receipts);
    } catch (error) {
      res.status(500).json({
        error: "An error occurred while retrieving payment history.",
        details: error.message,
      });
    }
  }
);

module.exports = router;
