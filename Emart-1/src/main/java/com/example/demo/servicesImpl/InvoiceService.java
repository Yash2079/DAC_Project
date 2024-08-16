package com.example.demo.servicesImpl;

import com.example.demo.Services.InvoiceServ;
import com.example.demo.entities.Invoice;
import com.example.demo.repositories.InvoiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InvoiceService implements InvoiceServ {

    @Autowired
    private InvoiceRepository invoiceRepository;

    public List<Invoice> getAllInvoices() {
        return invoiceRepository.findAll();
    }

    public Optional<Invoice> getInvoiceById(int id) {
        return invoiceRepository.findById(id);
    }

    public Invoice saveInvoice(Invoice invoice) {
        return invoiceRepository.save(invoice);
    }

    public void deleteInvoice(int id) {
        invoiceRepository.deleteById(id);
    }

    public Invoice updateInvoice(int id, Invoice invoiceDetails) {
        Invoice invoice = invoiceRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Invoice not found for this id :: " + id));
        invoice.setInvoiceid(invoiceDetails.getInvoiceid());
        invoice.setUserid(invoiceDetails.getUserid());
        invoice.setTotalamt(invoiceDetails.getTotalamt());
        invoice.setTax(invoiceDetails.getTax());
        invoice.setDate(invoiceDetails.getDate());

        return invoiceRepository.save(invoice);
    }
}
