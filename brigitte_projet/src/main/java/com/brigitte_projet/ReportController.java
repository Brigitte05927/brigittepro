package com.brigitte_projet;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = "*")
public class ReportController {

    private static final Logger logger = LoggerFactory.getLogger(ReportController.class);

    @Autowired
    private ProductRepository productRepo;

    @Autowired
    private TransactionRepository transactionRepo;

    // Route de base
    @GetMapping
    public String reportHome() {
        logger.info("GET /api/reports appelé");
        return "Bienvenue dans l'API des rapports.\n" +
                "- /low-stock : produits à stock faible\n" +
                "- /sales?from=YYYY-MM-DDTHH:mm:ss&to=YYYY-MM-DDTHH:mm:ss : ventes entre deux dates";
    }

    // Liste des produits à stock faible
    @GetMapping("/low-stock")
    public List<Product> getLowStockProducts() {
        logger.info("GET /api/reports/low-stock appelé");
        return productRepo.findAll().stream()
                .filter(p -> p.getQuantity() < p.getMinQuantity())
                .collect(Collectors.toList());
    }

    // Liste des ventes "OUT" entre deux dates
    @GetMapping("/sales")
    public List<Transaction> getSalesBetween(
            @RequestParam String from,
            @RequestParam String to) {

        logger.info("GET /api/reports/sales avec from={} et to={}", from, to);

        try {
            // Parsing avec un format plus robuste si tu veux personnaliser
            DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;
            LocalDateTime fromDate = LocalDateTime.parse(from, formatter);
            LocalDateTime toDate = LocalDateTime.parse(to, formatter);

            return transactionRepo.findAll().stream()
                    .filter(t -> "OUT".equalsIgnoreCase(t.getType()))
                    .filter(t -> !t.getDate().isBefore(fromDate) && !t.getDate().isAfter(toDate))
                    .collect(Collectors.toList());

        } catch (Exception e) {
            logger.error("Erreur parsing date: {}", e.getMessage());
            throw new RuntimeException("Format invalide. Utilisez : YYYY-MM-DDTHH:mm:ss");
        }
    }
}
