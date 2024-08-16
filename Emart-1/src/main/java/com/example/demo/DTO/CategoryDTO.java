package com.example.demo.DTO;

public class CategoryDTO {
    private int categoryid;
    private String categoryname;
    private String imageUrl;

    public CategoryDTO(int categoryid, String categoryname, String imageUrl) {
        this.categoryid = categoryid;
        this.categoryname = categoryname;
        this.imageUrl = imageUrl;
    }

    // Getters and setters
    public int getCategoryid() {
        return categoryid;
    }

    public void setCategoryid(int categoryid) {
        this.categoryid = categoryid;
    }

    public String getCategoryname() {
        return categoryname;
    }

    public void setCategoryname(String categoryname) {
        this.categoryname = categoryname;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}