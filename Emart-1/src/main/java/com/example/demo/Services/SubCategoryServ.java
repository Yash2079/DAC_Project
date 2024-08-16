package com.example.demo.Services;

import com.example.demo.entities.Subcategory;

import java.util.List;

public interface SubCategoryServ {

    // Retrieve Subcategories by Category ID
    List<Subcategory> getSubCategoriesByCategoryid(int categoryid);
}
