package com.example.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entities.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> 

{
	  List<Product> findBySubcategoryid(int subcategoryid);
}
