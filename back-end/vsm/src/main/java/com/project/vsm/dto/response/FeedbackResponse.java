package com.project.vsm.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.project.vsm.model.FeedbackEntity;
import com.project.vsm.model.TicketEntity;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class FeedbackResponse {
    long feedbackId;
    String fullName;
    String email;
    LocalDateTime createAt;
    String content;
    AccountResponse account;

    public static FeedbackResponse fromEntity (FeedbackEntity feedback) {
       return FeedbackResponse.builder()
                .feedbackId(feedback.getFeedbackId())
                .fullName(feedback.getFullName())
                .content(feedback.getContent())
                .content(feedback.getContent())
                .createAt(feedback.getCreateAt())
                .build();
    }
}
