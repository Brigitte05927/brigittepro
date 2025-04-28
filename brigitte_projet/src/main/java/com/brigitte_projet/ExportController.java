package com.brigitte_projet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@RestController
@RequestMapping("/api/export")
public class ExportController {

    @Autowired
    private ProductRepository productRepository; // Remplacer ProductService par ProductRepository

    @GetMapping("/csv")
    public void exportToCSV(HttpServletResponse response) throws IOException {
        response.setContentType("text/csv");
        response.setHeader("Content-Disposition", "attachment; filename=products.csv");

        List<Product> products = productRepository.findAll(); // Utiliser le repo directement

        PrintWriter writer = response.getWriter();
        writer.println("ID,Nom,Quantité,Prix");

        for (Product p : products) {
            writer.println(p.getId() + "," + p.getName() + "," + p.getQuantity() + "," + p.getPrice());
        }

        writer.flush();
        writer.close();
    }
}
