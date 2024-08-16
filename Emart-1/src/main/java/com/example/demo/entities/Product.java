package com.example.demo.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "productid")
    private int productId;

    @Column(name = "productname")
    private String productname;

    @Column(name = "price", columnDefinition = "double default 0")
    private double price;
    
    @Column(name = "subcategoryid", columnDefinition = "int default 0")
    private int subcategoryid;

    @Column(name = "brandname")
    private String brandname;

    @Column(name = "shortdesc")
    private String shortdesc;
    
    @Column(name = "longdesc")
    private String longdesc;

    @Column(name = "stockquantity", columnDefinition = "int default 0")
    private int stockquantity;

    @Column(name = "rating", columnDefinition = "int default 0")
    private int rating;

    @Column(name = "imagepath")
    private String imagepath;

    @Column(name = "isdiscounted", columnDefinition = "int default 0")
    private int isdiscounted;
    
    @Column(name = "ispromoted", columnDefinition = "int default 0")
    private int ispromoted;

    // Getters and Setters
    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

    public String getProductname() {
        return productname;
    }

    public void setProductname(String productname) {
        this.productname = productname;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getSubcategoryid() {
        return subcategoryid;
    }

    public void setSubcategoryid(int subcategoryid) {
        this.subcategoryid = subcategoryid;
    }

    public String getBrandname() {
        return brandname;
    }

    public void setBrandname(String brandname) {
        this.brandname = brandname;
    }

    public String getShortdesc() {
        return shortdesc;
    }

    public void setShortdesc(String shortdesc) {
        this.shortdesc = shortdesc;
    }

    public String getLongdesc() {
        return longdesc;
    }

    public void setLongdesc(String longdesc) {
        this.longdesc = longdesc;
    }

    public int getStockquantity() {
        return stockquantity;
    }

    public void setStockquantity(int stockquantity) {
        this.stockquantity = stockquantity;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public String getImagepath() {
        return imagepath;
    }

    public void setImagepath(String imagepath) {
        this.imagepath = imagepath;
    }

    public int getIsdiscounted() {
        return isdiscounted;
    }

    public void setIsdiscounted(int isdiscounted) {
        this.isdiscounted = isdiscounted;
    }
    
    public int getIspromoted() {
        return ispromoted;
    }

    public void setIspromoted(int ispromoted) {
        this.ispromoted = ispromoted;
    }
}
