package com.brigitte_projet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/export")
public class ExportController {

    @Autowired
    private ProductRepository productRepository;

    @GetMapping("/products")
    public void exportProductsToCSV(HttpServletResponse response) throws IOException {
        String date = LocalDate.now().toString(); // format: yyyy-MM-dd
        String filename = "products_" + date + ".csv";

        response.setContentType("text/csv");
        response.setHeader("Content-Disposition", "attachment; filename=\"" + filename + "\"");

        List<Product> products = productRepository.findAll();

        PrintWriter writer = response.getWriter();
        writer.println("ID,Nom,Quantité,Prix");

        for (Product p : products) {
            writer.println(p.getId() + "," + p.getName() + "," + p.getQuantity() + "," + p.getPrice());
        }

        writer.flush();
        writer.close();
    }
}
