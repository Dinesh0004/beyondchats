package com.beyondchats.ai;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.stereotype.Service;

@Service
public class WebArticleScraper {

    public String scrapeMainContent(String url) {

        try {
            Document doc = Jsoup.connect(url)
                    .userAgent("Mozilla/5.0")
                    .timeout(15000)
                    .get();

            // Priority-based extraction
            String content = doc.select("article").text();

            if (content == null || content.isBlank()) {
                content = doc.select("main").text();
            }

            if (content == null || content.isBlank()) {
                content = doc.select("p").text();
            }

            return content;

        } catch (Exception e) {
            System.out.println("❌ Failed to scrape: " + url);
            return "";
        }
    }
}
