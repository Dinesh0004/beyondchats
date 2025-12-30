package com.beyondchats.controller;

import com.beyondchats.model.Article;
import com.beyondchats.scraper.BeyondChatsScraper;
import com.beyondchats.service.ArticleService;
import org.springframework.web.bind.annotation.*;
import com.beyondchats.ai.ArticlePhase2Processor;

import java.util.List;

@RestController
@RequestMapping("/api/articles")
@CrossOrigin("*")
public class ArticleController {

    private final ArticleService service;
    private final BeyondChatsScraper scraper;
    private final ArticlePhase2Processor phase2Processor;

    // ✅ Constructor injection MUST include scraper
    public ArticleController(
            ArticleService service,
            BeyondChatsScraper scraper,
            ArticlePhase2Processor phase2Processor
    ) {
        this.service = service;
        this.scraper = scraper;
        this.phase2Processor = phase2Processor;
    }
    @PostMapping
    public Article create(@RequestBody Article article) {
        return service.save(article);
    }

    @GetMapping
    public List<Article> getAll(@RequestParam(required = false) String version) {
        return version == null
                ? service.getAll()
                : service.getByVersion(version);
    }

    @GetMapping("/{id}")
    public Article getOne(@PathVariable Long id) {
        return service.getById(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
    @GetMapping("/original")
    public List<Article> getOriginalArticles() {
        return service.getOriginalArticles();
    }

    // ✅ SCRAPER ENDPOINT (NO PARAMS, NO BODY)
    @GetMapping("/scrape")
    public String scrapeBeyondChats() {
        scraper.scrapeOldestArticles();
        return "Scraping completed";
    }
    
    @GetMapping("/phase2/start")
    public String startPhase2() {
        phase2Processor.processOriginalArticles();
        return "Phase 2 started";
    }
}
