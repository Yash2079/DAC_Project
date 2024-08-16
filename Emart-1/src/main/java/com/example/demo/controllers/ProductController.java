package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entities.Product;
import com.example.demo.repositories.ProductRepository;
import com.example.demo.servicesImpl.ProductService;

import java.util.List;
import java.util.Optional;

@RestController		//controller+responseBody
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private ProductRepository productRepository;
    
    // Retrieve all Products
    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    // Retrieve a Product by its ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getProductById(@PathVariable int id) {
        Optional<Product> product = productService.getProductById(id);
        return product.isPresent() ? ResponseEntity.ok(product.get()) : ResponseEntity.notFound().build();
    }

    // Retrieve Products by Subcategory ID
    @GetMapping("/subcategory/{subcategoryid}")
    public List<Product> getProductsBySubcategory(@PathVariable int subcategoryid) {
        return productRepository.findBySubcategoryid(subcategoryid);
    }

    // Add a new Product
    @PostMapping
    public ResponseEntity<String> addProduct(@RequestBody Product product) {
        try {
            String result = productService.addProduct(product);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("An error occurred: " + e.getMessage());
        }
    }

    // Update an existing Product by its ID
    @PutMapping("/{id}")
    public ResponseEntity<String> updateProduct(@PathVariable int id, @RequestBody Product product) {
        String result = productService.updateProduct(id, product);
        return ResponseEntity.ok(result);
    }

    // Delete a Product by its ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable int id) {
        try {
            productService.deleteProduct(id);
            return ResponseEntity.ok("Product deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error deleting product: " + e.getMessage());
        }
    }
}
