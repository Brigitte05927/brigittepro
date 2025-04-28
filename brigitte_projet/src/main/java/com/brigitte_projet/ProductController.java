package com.brigitte_projet;

import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductRepository repo;

    public ProductController(ProductRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Product> getAll() {
        return repo.findAll();
    }

    @PostMapping
    public Product create(@RequestBody Product product) {
        return repo.save(product);
    }

    @PutMapping("/{id}")
    public Product update(@PathVariable Long id, @RequestBody Product updated) {
        Product product = repo.findById(id).orElseThrow();
        product.setName(updated.getName());
        product.setQuantity(updated.getQuantity());
        product.setMinQuantity(updated.getMinQuantity());
        product.setPrice(updated.getPrice());
        return repo.save(product);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repo.deleteById(id);
    }
    @GetMapping("/low-stock")
    public List<Product> getLowStockProducts() {
    return repo.findByQuantityLessThan(10);
    } // ou utiliser une logique plus dynamique

    @GetMapping("/api/export/csv")
    public void exportCSV(HttpServletResponse response) throws IOException {
    response.setContentType("text/csv");
    response.setHeader("Content-Disposition", "attachment; filename=products.csv");

    // Simule le CSV
    PrintWriter writer = response.getWriter();
    writer.println("ID,Nom,Prix");
    writer.println("1,Produit A,1000");
    writer.println("2,Produit B,2000");
    writer.flush();
    writer.close();
    }
}


        






