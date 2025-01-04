package com.project.vsm.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class ChatGPTService {

    private final WebClient webClient;

    @Value("${openai.api-key}")
    private String API_KEY;

    public ChatGPTService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("https://api.openai.com/v1/completions").build();
    }

    public String askQuestion(String question) {
        // Tùy chỉnh model và các tham số khác theo nhu cầu
        String model = "text-davinci-003";

        // Tạo request để gửi đến OpenAI
        ChatGPTRequest request = new ChatGPTRequest(model, question, 150, 0.7);

        // Gửi request tới OpenAI API
        ChatGPTResponse response = webClient.post()
                .uri("") // Base URL đã được cấu hình, nên không cần thêm path
                .header("Authorization", "Bearer " + API_KEY)
                .bodyValue(request)
                .retrieve()
                .bodyToMono(ChatGPTResponse.class)
                .block();

        // Trả về câu trả lời từ ChatGPT
        return response != null && response.getAnswer() != null ? response.getAnswer() : "No response from ChatGPT.";
    }

    // DTO cho request
    record ChatGPTRequest(String model, String prompt, int max_tokens, double temperature) {}

    // DTO cho response
    record ChatGPTResponse(String id, String object, String created, Usage usage, Choice[] choices) {
        public String getAnswer() {
            return choices != null && choices.length > 0 ? choices[0].text : null;
        }

        record Usage(int prompt_tokens, int completion_tokens, int total_tokens) {}
        record Choice(String text, String finish_reason, int index) {}
    }
}
