package com.beyondchats.repository;



import com.beyondchats.model.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ArticleRepository extends JpaRepository<Article, Long> {
    List<Article> findByVersion(String version);
    
    boolean existsByTitle(String title);
}
