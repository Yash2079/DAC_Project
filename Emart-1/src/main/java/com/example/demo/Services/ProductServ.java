package com.example.demo.Services;

import com.example.demo.entities.Product;

import java.util.List;
import java.util.Optional;

public interface ProductServ {

    // Create or Update a Product
    // public Product saveProduct(Product product);

    // Retrieve a Product by its ID
    Optional<Product> getProductById(int productId);

    // Retrieve all Products
    List<Product> getAllProducts();

    // Update a Product
    String updateProduct(int id, Product updatedProduct);

    // Delete a Product by its ID
    void deleteProduct(int productId);

    // Add a Product
    String addProduct(Product product);
}
