package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entities.Subcategory;
import com.example.demo.servicesImpl.SubCategoryService;

import java.util.List;

@RestController
@RequestMapping("/subcategory")
public class SubCategoryController {

    @Autowired
    private SubCategoryService subCategoryService;

    @GetMapping("/category/{categoryid}")
    public ResponseEntity<List<Subcategory>> getSubCategoriesByCategoryid(@PathVariable int categoryid) {
        List<Subcategory> subcategories = subCategoryService.getSubCategoriesByCategoryid(categoryid);
        return ResponseEntity.ok(subcategories);
    }
}
