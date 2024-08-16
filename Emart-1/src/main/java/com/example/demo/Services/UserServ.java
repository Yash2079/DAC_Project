package com.example.demo.Services;

import com.example.demo.entities.User;

public interface UserServ {

    // Register a User
    String registerUser(User user);

    // Retrieve a User by their email
    User findByUseremail(String useremail);

    // Authenticate a User
    User authenticateUser(String useremail, String password);
    
    // Update ePoints for a User
    boolean updateEpoints(int userId, int newEpoints);
}
