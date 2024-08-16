package com.example.demo.servicesImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.Services.ProductServ;
import com.example.demo.entities.Product;
import com.example.demo.repositories.ProductRepository;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
//The @Transactional annotation in Spring is used to manage transactions declaratively. 
//Transactions are a mechanism to ensure that a series of operations either all succeed or all fail,
//maintaining the consistency and integrity of the database

public class ProductService implements ProductServ {

    @Autowired
    private ProductRepository productRepository;

    // Create or Update a Product
//    public Product saveProduct(Product product) {
//        return productRepository.save(product);
//    }

    // Retrieve a Product by its ID
    public Optional<Product> getProductById(int productId) {
        return productRepository.findById(productId);
    }

    // Retrieve all Products
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
    
    public String updateProduct(int id, Product updatedProduct) {
        Optional<Product> existingProductOpt = productRepository.findById(id);
        if (existingProductOpt.isPresent()) {
            Product existingProduct = existingProductOpt.get();
            existingProduct.setProductname(updatedProduct.getProductname());
            existingProduct.setPrice(updatedProduct.getPrice());
            existingProduct.setSubcategoryid(updatedProduct.getSubcategoryid());
            existingProduct.setBrandname(updatedProduct.getBrandname());
            existingProduct.setShortdesc(updatedProduct.getShortdesc());
            existingProduct.setLongdesc(updatedProduct.getLongdesc());
            existingProduct.setStockquantity(updatedProduct.getStockquantity());
            existingProduct.setRating(updatedProduct.getRating());
            existingProduct.setImagepath(updatedProduct.getImagepath());
            existingProduct.setIspromoted(updatedProduct.getIspromoted());
            existingProduct.setIsdiscounted(updatedProduct.getIsdiscounted());
            productRepository.save(existingProduct);
            return "Product updated successfully";
        } else {
            return "Product not found";
        }
    }
    // Delete a Product by its ID
    public void deleteProduct(int productId) {
        productRepository.deleteById(productId);
    }

    public String addProduct(Product product) {
        try {
            productRepository.save(product);
            return "Product added successfully";
        } catch (DataIntegrityViolationException e) {
            // Handle specific exceptions like constraint violations
            throw new RuntimeException("Data integrity violation: " + e.getMessage(), e);
        } catch (Exception e) {
            // Handle other exceptions
            throw new RuntimeException("Failed to add product: " + e.getMessage(), e);
        }
    }
}
