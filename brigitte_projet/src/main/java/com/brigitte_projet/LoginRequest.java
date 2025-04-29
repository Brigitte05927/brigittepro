package com.brigitte_projet;

public class LoginRequest {
    private String username;
    private String password;

    // Constructeur par défaut
    public LoginRequest() {}

    // Getters et Setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}