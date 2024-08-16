package com.example.demo.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Category;
import com.example.demo.entities.Product;
import com.example.demo.servicesImpl.CategoryService;

@RestController		
@RequestMapping("/category")
public class CategoryController {
	@Autowired
	private CategoryService categoryservice; 
	
	@GetMapping("/{id}")
    public ResponseEntity<?> getCategoryid(@PathVariable int id) {
        Optional<Category> category = categoryservice.getCategoryById(id);
        return category.isPresent() ? ResponseEntity.ok(category.get()) : ResponseEntity.notFound().build();
    }
	 
	 @PostMapping
	    public ResponseEntity<String> addCategory(@RequestBody Category category) {
		 //System.out.println(category);
	        String result = categoryservice.addCategory(category);
	        return ResponseEntity.ok(result);
	    }
	 
	 @DeleteMapping("/{id}")
	    public ResponseEntity<String> deleteCategory(@PathVariable int id) {
	        try {
	        	categoryservice.deleteCategory(id);
	            return ResponseEntity.ok("Category deleted successfully");
	        } catch (Exception e) {
	            return ResponseEntity.status(500).body("Error deleting category: " + e.getMessage());
	        }
	    }
	 
	 @GetMapping
	 public ResponseEntity<List<Category>> getAllCategories() {
	     List<Category> categories = categoryservice.getAllCategories();
	     return ResponseEntity.ok(categories);
	 }

}