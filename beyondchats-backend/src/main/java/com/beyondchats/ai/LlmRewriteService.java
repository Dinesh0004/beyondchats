package com.beyondchats.ai;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class LlmRewriteService {

    @Value("${llm.api.key}")
    private String apiKey;

    @Value("${llm.api.url}")
    private String apiUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    public String rewriteArticle(
            String originalTitle,
            String originalContent,
            String referenceContent,
            List<String> referenceLinks
    ) {

        try {
            String prompt = """
You are a professional SEO content writer.

Original article title:
%s

Original article content:
%s

Reference articles content:
%s

TASK:
- Rewrite and improve the original article
- Make it professional, well structured, and SEO friendly
- Use headings and bullet points
- Do NOT copy sentences directly
- Add a section called "References" at the end
- Cite the following links in References:
%s
""".formatted(
                    originalTitle,
                    originalContent,
                    referenceContent,
                    String.join("\n", referenceLinks)
            );

            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("model", "gpt-4o-mini");
            requestBody.put("messages", List.of(
                    Map.of("role", "user", "content", prompt)
            ));
            requestBody.put("temperature", 0.7);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(apiKey);

            HttpEntity<Map<String, Object>> request =
                    new HttpEntity<>(requestBody, headers);

            ResponseEntity<String> response =
                    restTemplate.postForEntity(apiUrl, request, String.class);

            ObjectMapper mapper = new ObjectMapper();
            return mapper.readTree(response.getBody())
                    .path("choices")
                    .get(0)
                    .path("message")
                    .path("content")
                    .asText();

        } catch (Exception e) {
            System.out.println("❌ LLM rewrite failed");
            return "";
        }
    }
}
