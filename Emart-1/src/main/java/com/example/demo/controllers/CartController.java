//package com.example.demo.controllers;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import com.example.demo.entities.Cart;
//import com.example.demo.servicesImpl.CartService;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/orders")
//public class CartController {
//
//    @Autowired
//    private CartService orderService;
//
//    @PostMapping
//    public ResponseEntity<Cart> createOrder(@RequestBody Cart order) {
//        try {
//            Cart savedOrder = orderService.saveOrder(order);
//            return new ResponseEntity<>(savedOrder, HttpStatus.CREATED);
//        } catch (Exception e) {
//            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
//
//    @GetMapping("/{id}")
//    public ResponseEntity<Cart> getOrderById(@PathVariable("id") Integer id) {
//        Cart order = orderService.getOrderById(id);
//        if (order != null) {
//            return new ResponseEntity<>(order, HttpStatus.OK);
//        } else {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
//    }
//
//    @DeleteMapping("/{id}")
//    public ResponseEntity<HttpStatus> deleteOrder(@PathVariable("id") Integer id) {
//        try {
//            orderService.deleteOrder(id);
//            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//        } catch (Exception e) {
//            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
//
//    @GetMapping
//    public ResponseEntity<List<Cart>> getAllOrders() {
//        try {
//            List<Cart> orders = orderService.getAllOrders();
//            return new ResponseEntity<>(orders, HttpStatus.OK);
//        } catch (Exception e) {
//            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
//}
