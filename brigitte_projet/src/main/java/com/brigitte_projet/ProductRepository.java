import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ProductRepository extends JpaRepository<Product, Long> {

    // ⚡️ Trouver tous les produits dont quantity < minQuantity
    @Query("SELECT p FROM Product p WHERE p.quantity < p.minQuantity")
    List<Product> findByQuantityLessThanMinQuantity();
}
