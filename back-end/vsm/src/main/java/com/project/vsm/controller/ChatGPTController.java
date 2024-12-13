package com.project.vsm.controller;

import com.project.vsm.service.ChatGPTService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ChatGPTController {

    private final ChatGPTService chatGPTService;

    public ChatGPTController(ChatGPTService chatGPTService) {
        this.chatGPTService = chatGPTService;
    }

    @PostMapping("/public/ask/gpt")
    public String askChatGPT(@RequestBody String question) {
        return chatGPTService.askQuestion(question);
    }

}
