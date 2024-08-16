package com.example.demo.repositories;

import com.example.demo.entities.Subcategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubcategoryRepository extends JpaRepository<Subcategory, Integer> {
    // Use the correct field name from the entity
    List<Subcategory> findByCategoryid(int categoryid);
}
