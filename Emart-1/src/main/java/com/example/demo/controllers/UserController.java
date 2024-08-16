package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entities.User;
import com.example.demo.servicesImpl.UserService;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        String response = userService.registerUser(user);
        if (response.equals("User already exists")) {
            return ResponseEntity.status(409).body(response);
        }
        return ResponseEntity.ok(response);
    }

    @PostMapping("/signin")
    public ResponseEntity<User> signInUser(@RequestBody User user) {
        try {
            User authenticatedUser = userService.authenticateUser(user.getUseremail(), user.getPassword());
            return ResponseEntity.ok(authenticatedUser);
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).body(null);
        }
    }
    
    @PutMapping("/{id}/updateEpoints")
    public ResponseEntity<String> updateEpoints(@PathVariable int id, @RequestBody User updatedUser) {
        try {
            boolean success = userService.updateEpoints(id, updatedUser.getEpoint());
            if (success) {
                return ResponseEntity.ok("ePoints updated successfully");
            } else {
                return ResponseEntity.status(404).body("User not found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error updating ePoints: " + e.getMessage());
        }
    }
}
