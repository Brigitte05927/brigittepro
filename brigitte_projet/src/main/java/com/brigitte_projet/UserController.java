package com.brigitte_projet;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
// @CrossOrigin(origins = "http://localhost:5173")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<User> registerDonor(@RequestBody User user) {
        return ResponseEntity.ok(userService.CreateDonor(user));
    }

    @GetMapping("/admin/donors")
    public ResponseEntity<List<User>> getAllDonors() {
        return ResponseEntity.ok(userService.getAllDonors());
    }
    
}
