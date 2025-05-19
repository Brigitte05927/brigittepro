// TransactionService.java
package com.brigitte_projet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private ProductRepository productRepository;

    public List<Transaction> getAll() {
        return transactionRepository.findAll();
    }

    public Transaction getById(Long id) {
        return transactionRepository.findById(id).orElse(null);
    }

    public Transaction save(Transaction t) {
        Product product = productRepository.findById(t.getProduct().getId())
                .orElseThrow(() -> new RuntimeException("Produit introuvable"));

        if (t.getType().equalsIgnoreCase("OUT")) {
            if (product.getQuantity() < t.getQuantity()) {
                throw new RuntimeException("Stock insuffisant !");
            }
            product.setQuantity(product.getQuantity() - t.getQuantity());
        } else if (t.getType().equalsIgnoreCase("IN")) {
            product.setQuantity(product.getQuantity() + t.getQuantity());
        } else {
            throw new RuntimeException("Type de transaction invalide !");
        }

        productRepository.save(product);
        t.setProduct(product); // liaison correcte
        return transactionRepository.save(t);
    }
}
