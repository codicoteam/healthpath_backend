const express = require('express');
const router = express.Router();
const invoiceService = require('../services/invoiceService'); // Adjust the path as per your project structure
const { authenticateToken } = require('../middleware/auth');

// Route to create a new invoice
router.post('/create', authenticateToken, async (req, res) => {
  try {
    const invoiceData = req.body;
    const newInvoice = await invoiceService.createInvoice(invoiceData);
    res.status(201).json({
      message: 'Invoice created successfully',
      data: newInvoice,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating invoice',
      error: error.message,
    });
  }
});

// Route to get all invoices
router.get('/getall', authenticateToken, async (req, res) => {
  try {
    const invoices = await invoiceService.getAllInvoices();
    res.status(200).json({
      message: 'Invoices retrieved successfully',
      data: invoices,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving invoices',
      error: error.message,
    });
  }
});

// Route to fetch an invoice by ID
router.get('/get/:id', authenticateToken, async (req, res) => {
  try {
    const invoiceId = req.params.id;
    const invoice = await invoiceService.getInvoiceById(invoiceId);
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    res.status(200).json({
      message: 'Invoice retrieved successfully',
      data: invoice,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving invoice',
      error: error.message,
    });
  }
});

// Route to fetch invoices by client ID
router.get('/client/:clientId', authenticateToken, async (req, res) => {
  try {
    const clientId = req.params.clientId;
    const invoices = await invoiceService.getInvoicesByClientId(clientId);
    res.status(200).json({
      message: 'Invoices for client retrieved successfully',
      data: invoices,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving invoices for client',
      error: error.message,
    });
  }
});

// Route to update an invoice
router.put('/update/:id', authenticateToken, async (req, res) => {
  try {
    const invoiceId = req.params.id;
    const updateData = req.body;
    const updatedInvoice = await invoiceService.updateInvoice(invoiceId, updateData);
    if (!updatedInvoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    res.status(200).json({
      message: 'Invoice updated successfully',
      data: updatedInvoice,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating invoice',
      error: error.message,
    });
  }
});

// Route to delete an invoice
router.delete('/delete/:id', authenticateToken, async (req, res) => {
  try {
    const invoiceId = req.params.id;
    const deletedInvoice = await invoiceService.deleteInvoice(invoiceId);
    if (!deletedInvoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    res.status(200).json({
      message: 'Invoice deleted successfully',
      data: deletedInvoice,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting invoice',
      error: error.message,
    });
  }
});

module.exports = router;
