package com.brigitte_projet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jakarta.annotation.PostConstruct;

@Service
@Transactional
public class AdminService {
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @PostConstruct  // Cette méthode sera exécutée après l'initialisation du bean
    public void initAdmin() {
        // Vérifie si un admin existe déjà
        if (userRepository.findByUsername("admin").isEmpty()) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setName("Administrator");
            admin.setRole(Role.ADMIN);
            admin.setPhone("+25761307079");
            
            userRepository.save(admin);
            System.out.println("Admin account has been created");
        }
    }
}
