package com.project.vsm.controller;

import com.project.vsm.dto.request.FeedbackRequest;
import com.project.vsm.dto.response.FeedbackResponse;
import com.project.vsm.dto.response.ResponseObject;
import com.project.vsm.service.FeedbackService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    @GetMapping("/public/view-feedback")
    public ResponseObject<List<FeedbackResponse>> getAllFeedback() {
        return ResponseObject.<List<FeedbackResponse>>builder()
                .code(200)
                .data(feedbackService.getAllFeedback())
                .build();
    }

    @PostMapping("/user/create-feedback")
    public ResponseObject<FeedbackResponse> createFeedback(@RequestBody FeedbackRequest request) {
        return ResponseObject.<FeedbackResponse>builder()
                .code(200)
                .data(feedbackService.createFeedback(request))
                .build();
    }

    @DeleteMapping("/user/delete-feedback/{feedbackId}")
    public ResponseObject<String> userDeleteFeedback(@PathVariable long feedbackId) {
        return ResponseObject.<String>builder()
                .code(200)
                .data(feedbackService.userDeleteFeedback(feedbackId))
                .build();
    }

    @PutMapping("/user/update-feedback/{feedbackId}")
    public ResponseObject<FeedbackResponse> userUpdateFeedback(@PathVariable long feedbackId , @RequestBody FeedbackRequest request) {
        return ResponseObject.<FeedbackResponse>builder()
                .code(200)
                .data(feedbackService.userUpdateFeedback(feedbackId , request))
                .build();
    }

}
