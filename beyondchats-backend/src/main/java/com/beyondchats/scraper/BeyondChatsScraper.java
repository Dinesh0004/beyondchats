package com.beyondchats.scraper;

import com.beyondchats.model.Article;
import com.beyondchats.service.ArticleService;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Component;

@Component
public class BeyondChatsScraper {

    private final ArticleService service;

    public BeyondChatsScraper(ArticleService service) {
        this.service = service;
    }

    public void scrapeOldestArticles() {

        try {
            String url = "https://beyondchats.com/blogs/page/10";
            Document doc = Jsoup.connect(url).get();
            Elements posts = doc.select("article");

            posts.stream().limit(5).forEach(post -> {
                try {
                    String title = post.select("h2").text();
                    String link = post.select("a").attr("href");

                    Document articleDoc = Jsoup.connect(link).get();
                    String content = articleDoc.select("main p").text();

                    Article article = new Article();
                    article.setTitle(title);
                    article.setContent(content);
                    article.setSource("BeyondChats");
                    article.setVersion("original");

                    service.save(article);

                } catch (Exception e) {
                    e.printStackTrace();
                }
            });

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
