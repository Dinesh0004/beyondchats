package com.beyondchats.ai;

import com.beyondchats.model.Article;
import com.beyondchats.service.ArticleService;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ArticlePhase2Processor {

    private final ArticleService articleService;
    private final GoogleSearchService googleSearchService;
    private final WebArticleScraper webScraper;
    private final LlmRewriteService llmService;

    public ArticlePhase2Processor(
            ArticleService articleService,
            GoogleSearchService googleSearchService,
            WebArticleScraper webScraper,
            LlmRewriteService llmService
    ) {
        this.articleService = articleService;
        this.googleSearchService = googleSearchService;
        this.webScraper = webScraper;
        this.llmService = llmService;
    }

    public void processOriginalArticles() {

        List<Article> originals = articleService.getOriginalArticles();

        for (Article article : originals) {

            System.out.println("\n🧠 Rewriting:");
            System.out.println(article.getTitle());

            List<String> links =
                    googleSearchService.searchTopArticles(article.getTitle());

            StringBuilder combinedContent = new StringBuilder();
            List<String> validLinks = new ArrayList<>();

            for (String link : links) {
                String content = webScraper.scrapeMainContent(link);

                if (content.length() < 500) continue;

                combinedContent.append(content).append("\n\n");
                validLinks.add(link);
            }

            if (combinedContent.length() < 1000) {
                System.out.println("⚠ Not enough reference content, skipping");
                continue;
            }

            String rewrittenContent = llmService.rewriteArticle(
                    article.getTitle(),
                    article.getContent(),
                    combinedContent.toString(),
                    validLinks
            );

            if (rewrittenContent.isBlank()) continue;

            // NEXT STEP: save updated article
            saveUpdatedArticle(article, rewrittenContent, validLinks);
        }
    }

    private void saveUpdatedArticle(
            Article original,
            String newContent,
            List<String> references
    ) {
        Article updated = new Article();
        updated.setTitle(original.getTitle());
        updated.setContent(newContent);
        updated.setSource("AI-Rewritten");
        updated.setVersion("updated");
        updated.setReferenceLinks(references);

        articleService.save(updated);

        System.out.println("✅ Updated article saved");
    }
}
