package com.example.demo.servicesImpl;

import com.example.demo.Services.SubCategoryServ;
import com.example.demo.entities.Subcategory;
import com.example.demo.repositories.SubcategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubCategoryService implements SubCategoryServ {

    @Autowired
    private SubcategoryRepository subcategoryRepository;

    public List<Subcategory> getSubCategoriesByCategoryid(int categoryid) {
        return subcategoryRepository.findByCategoryid(categoryid);
    }
}
