package com.beyondchats.service;

import com.beyondchats.model.Article;
import com.beyondchats.repository.ArticleRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ArticleService {

    private final ArticleRepository repo;

    public ArticleService(ArticleRepository repo) {
        this.repo = repo;
    }

    public Article save(Article article) {
        article.setCreatedAt(LocalDateTime.now());
        return repo.save(article);
    }

    public List<Article> getAll() {
        return repo.findAll();
    }

    public List<Article> getByVersion(String version) {
        return repo.findByVersion(version);
    }

    public Article getById(Long id) {
        return repo.findById(id).orElseThrow();
    }
    public List<Article> getOriginalArticles() {
        return repo.findByVersion("original");
    }
    public void delete(Long id) {
        repo.deleteById(id);
    }
}
