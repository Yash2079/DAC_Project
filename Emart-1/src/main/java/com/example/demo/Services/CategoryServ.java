package com.example.demo.Services;

import com.example.demo.entities.Category;

import java.util.List;
import java.util.Optional;

public interface CategoryServ {

    // Retrieve a Category by its ID
    Optional<Category> getCategoryById(int categoryid);

    // Add a Category
    String addCategory(Category category);

    // Delete a Category by its ID
    void deleteCategory(int categoryid);

    // Retrieve all Categories
    List<Category> getAllCategories();
}
