package com.example.demo.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "category")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "categoryid")
    private int categoryid;

    @Column(name = "categoryname", unique = true)
    private String categoryname;

    @Column(name = "imagepath")
    private String imagepath;

    
	public String getImagepath() {
		return imagepath;
	}

	public void setImagepath(String imagepath) {
		this.imagepath = imagepath;
	}

	public int getCategoryId() {
		return categoryid;
	}

	public void setCategoryId(int categoryid) {
		this.categoryid = categoryid;
	}

	public String getCategoryName() {
		return categoryname;
	}

	public void setCategoryName(String categoryname) {
		this.categoryname = categoryname;
	}



    
    }
