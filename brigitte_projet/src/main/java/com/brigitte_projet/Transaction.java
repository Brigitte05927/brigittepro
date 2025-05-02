package com.brigitte_projet;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long productId;
    private String type; // "IN" ou "OUT"
    private int quantity;
    private LocalDateTime date;

    public Transaction() {
        this.date = LocalDateTime.now();
    }

    // Getters et Setters
}
