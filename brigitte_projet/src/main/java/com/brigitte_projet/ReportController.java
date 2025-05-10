package com.brigitte_projet;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin
public class ReportController {

    private static final Logger logger = LoggerFactory.getLogger(ReportController.class);

    @Autowired
    private ProductRepository productRepo;

    @Autowired
    private TransactionRepository transactionRepo;

    // Route de base : http://localhost:8080/api/reports
    @GetMapping
    public String reportHome() {
        logger.info("Requête reçue sur /api/reports");
        return "Bienvenue dans l'API des rapports. Utilisez :\n" +
               "- /low-stock pour les produits en stock faible\n" +
               "- /sales?from=YYYY-MM-DDTHH:mm:ss&to=YYYY-MM-DDTHH:mm:ss pour les ventes";
    }

    // Route : /api/reports/low-stock
    @GetMapping("/low-stock")
    public List<Product> getLowStockProducts() {
        logger.info("Requête reçue sur /api/reports/low-stock");
        return productRepo.findAll().stream()
                .filter(p -> p.getQuantity() < p.getMinQuantity())
                .collect(Collectors.toList());
    }

    // Route : /api/reports/sales?from=2025-05-01T00:00:00&to=2025-05-10T23:59:59
    @GetMapping("/sales")
    public List<Transaction> getSalesBetween(
            @RequestParam("from") String from,
            @RequestParam("to") String to) {

        logger.info("Requête reçue sur /api/reports/sales avec from={} et to={}", from, to);

        try {
            LocalDateTime fromDate = LocalDateTime.parse(from);
            LocalDateTime toDate = LocalDateTime.parse(to);

            return transactionRepo.findAll().stream()
                    .filter(t -> t.getType().equalsIgnoreCase("OUT"))
                    .filter(t -> !t.getDate().isBefore(fromDate) && !t.getDate().isAfter(toDate))
                    .collect(Collectors.toList());

        } catch (Exception e) {
            logger.error("Erreur de parsing des dates : {}", e.getMessage());
            throw new RuntimeException("Format de date invalide. Utilise : YYYY-MM-DDTHH:mm:ss");
        }
    }
}
