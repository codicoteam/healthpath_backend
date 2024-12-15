const Invoice = require("../models/invoices/invoice_schema"); // Adjust the path as per your project structure

// Service to create a new invoice
const createInvoice = async (invoiceData) => {
  try {
    const newInvoice = new Invoice(invoiceData);
    await newInvoice.save();
    return newInvoice;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Service to get all invoices
const getAllInvoices = async () => {
  try {
    const invoices = await Invoice.find()
      .populate("clientId", "name email") // Adjust fields as per your Client schema
      .populate("familyMemberId", "name relationship"); // Adjust fields as per your FamilyMember schema
    return invoices;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Service to fetch an invoice by ID
const getInvoiceById = async (id) => {
  try {
    const invoice = await Invoice.findById(id)
      .populate("clientId", "name email") // Adjust fields as per your Client schema
      .populate("familyMemberId", "name relationship"); // Adjust fields as per your FamilyMember schema
    if (!invoice) {
      throw new Error("Invoice not found");
    }
    return invoice;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Service to fetch invoices by client ID
const getInvoicesByClientId = async (clientId) => {
  try {
    const invoices = await Invoice.find({ clientId })
      .populate("clientId", "name email") // Adjust fields as per your Client schema
      .populate("familyMemberId", "name relationship"); // Adjust fields as per your FamilyMember schema
    return invoices;
  } catch (error) {
    throw new Error(error.message);
  }
};


// Service to update an invoice
const updateInvoice = async (id, updateData) => {
  try {
    const updatedInvoice = await Invoice.findByIdAndUpdate(id, updateData, {
      new: true,
    })
      .populate("clientId", "name email") // Adjust fields as per your Client schema
      .populate("familyMemberId", "name relationship"); // Adjust fields as per your FamilyMember schema
    if (!updatedInvoice) {
      throw new Error("Invoice not found");
    }
    return updatedInvoice;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Service to delete an invoice
const deleteInvoice = async (id) => {
  try {
    const deletedInvoice = await Invoice.findByIdAndDelete(id);
    if (!deletedInvoice) {
      throw new Error("Invoice not found");
    }
    return deletedInvoice;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createInvoice,
  getAllInvoices,
  getInvoiceById,
  getInvoicesByClientId,
  updateInvoice,
  deleteInvoice,
};
