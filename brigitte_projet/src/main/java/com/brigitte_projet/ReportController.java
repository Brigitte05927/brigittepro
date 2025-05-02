package com.brigitte_projet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin
public class ReportController {

    @Autowired
    private ProductRepository productRepo;

    @Autowired
    private TransactionRepository transactionRepo;

    @GetMapping("/low-stock")
    public List<Product> getLowStockProducts() {
        return productRepo.findAll().stream()
                .filter(p -> p.getQuantity() < p.getMinQuantity())
                .collect(Collectors.toList());
    }

    @GetMapping("/sales")
    public List<Transaction> getSalesBetween(
            @RequestParam("from") String from,
            @RequestParam("to") String to) {

        LocalDateTime fromDate = LocalDateTime.parse(from);
        LocalDateTime toDate = LocalDateTime.parse(to);

        return transactionRepo.findAll().stream()
                .filter(t -> t.getType().equals("OUT"))
                .filter(t -> t.getDate().isAfter(fromDate) && t.getDate().isBefore(toDate))
                .collect(Collectors.toList());
    }
}

