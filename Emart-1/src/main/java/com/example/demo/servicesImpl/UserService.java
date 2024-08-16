package com.example.demo.servicesImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.User;
import com.example.demo.repositories.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public String registerUser(User user) {
        if (userRepository.existsByUseremail(user.getUseremail())) {
            return "User already exists";
        }

        // Check if the user is a prime member
        if (user.getUsertype() == 1) {
            int points = user.getEpoint();
        	user.setEpoint(points); // Assign 500 ePoints to prime members
        }

        userRepository.save(user);
        return "User registered successfully";
    }

    public User findByUseremail(String useremail) {
        return userRepository.findByUseremail(useremail);
    }

    public User authenticateUser(String useremail, String password) {
        User user = findByUseremail(useremail);
        if (user == null) {
            throw new RuntimeException("User does not exist");
        }
        if (!user.getPassword().equals(password)) {
            throw new RuntimeException("Invalid password");
        }
        return user;
    }
    
    public boolean updateEpoints(int userId, int newEpoints) {
        User user = userRepository.findById(userId).orElse(null);
        if (user != null) {
            user.setEpoint(newEpoints);
            userRepository.save(user);
            return true;
        }
        return false;
    }
}
