package com.example.demo.entities;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "invoice")
public class Invoice {

    @Id
    //@GeneratedValue(strategy = GenerationType.IDENTITY)
    
    @Column(name = "invoiceid")
    private String invoiceid;
    
    @Column(name = "date")
    private String date;

	@Column(name = "userid")
    private int userid;

    @Column(name = "totalamt", precision = 10, scale = 2, columnDefinition = "double default 0")
    private BigDecimal totalamt;

    @Column(name = "tax", precision = 10, scale = 2, columnDefinition = "double default 0")
    private BigDecimal tax;

    // Getters and Setters
    public String getInvoiceid() {
        return invoiceid;
    }

    public void setInvoiceid(String invoiceid) {
        this.invoiceid = invoiceid;
    }
    
    public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

    public int getUserid() {
        return userid;
    }

    public void setUserid(int userid) {
        this.userid = userid;
    }

    public BigDecimal getTotalamt() {
        return totalamt;
    }

    public void setTotalamt(BigDecimal totalamt) {
        this.totalamt = totalamt;
    }

    public BigDecimal getTax() {
        return tax;
    }

    public void setTax(BigDecimal tax) {
        this.tax = tax;
    }
}
