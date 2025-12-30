package com.beyondchats.ai;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

@Service
public class GoogleSearchService {

    @Value("${serpapi.key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    public List<String> searchTopArticles(String title) {

        List<String> links = new ArrayList<>();

        try {
            String query = URLEncoder.encode(title, StandardCharsets.UTF_8);
            String url =
                "https://serpapi.com/search.json?q=" + query +
                "&engine=google&num=5&api_key=" + apiKey;

            String response = restTemplate.getForObject(url, String.class);

            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(response);
            JsonNode results = root.path("organic_results");

            for (JsonNode result : results) {
                String link = result.path("link").asText();

                if (!link.contains("beyondchats.com")) {
                    links.add(link);
                }

                if (links.size() == 2) break;
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return links;
    }
}
