package com.example.demo.servicesImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Services.CategoryServ;
import com.example.demo.entities.Category;
import com.example.demo.entities.Product;
import com.example.demo.repositories.CategoryRepository;
import com.example.demo.repositories.ProductRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class CategoryService implements CategoryServ {
	@Autowired
    private CategoryRepository categoryrepository;
	
	  public Optional<Category> getCategoryById(int categoryid) {
	        return categoryrepository.findById(categoryid);
	    }

	  public String addCategory(Category category) {
	        try {
	        	categoryrepository.save(category);
	            return "Category added successfully";
	        } catch (Exception e) {
	            return "Error adding Category: " + e.getMessage();
	        }
	    }
	  
	  public void deleteCategory(int categoryid) {
		  categoryrepository.deleteById(categoryid);
	    }
	  
	  public List<Category> getAllCategories() {
		    return categoryrepository.findAll();
		}
}