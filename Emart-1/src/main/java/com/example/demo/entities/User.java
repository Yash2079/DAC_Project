package com.example.demo.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "userid")
    private int userId;

    @Column(name = "username")
    private String username;

    @Column(name = "useremail", unique = true)
    private String useremail;

    @Column(name = "password")
    private String password;

    @Column(name = "usertype", columnDefinition = "int default 0")
    private int usertype;

    @Column(name = "epoint", columnDefinition = "int default 0")
    private int epoint = 0;

    // Getters and Setters

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getUseremail() {
        return useremail;
    }

    public void setUseremail(String useremail) {
        this.useremail = useremail;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getUsertype() {
        return usertype;
    }

    public void setUsertype(byte usertype) {
        this.usertype = usertype;
    }

    public int getEpoint() {
        return epoint;
    }

    public void setEpoint(int epoint) {
        this.epoint = epoint;
    }
}
