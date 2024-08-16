package com.example.demo.Services;

import com.example.demo.entities.Invoice;

import java.util.List;
import java.util.Optional;

public interface InvoiceServ {

    // Retrieve all Invoices
    List<Invoice> getAllInvoices();

    // Retrieve an Invoice by its ID
    Optional<Invoice> getInvoiceById(int id);

    // Save an Invoice
    Invoice saveInvoice(Invoice invoice);

    // Delete an Invoice by its ID
    void deleteInvoice(int id);

    // Update an Invoice
    Invoice updateInvoice(int id, Invoice invoiceDetails);
}
