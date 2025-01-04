package com.project.vsm.service;

import com.project.vsm.dto.request.FeedbackRequest;
import com.project.vsm.dto.response.AccountResponse;
import com.project.vsm.dto.response.FeedbackResponse;
import com.project.vsm.model.AccountEntity;
import com.project.vsm.model.FeedbackEntity;
import com.project.vsm.repository.AccountRepository;
import com.project.vsm.repository.FeedbackRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class FeedbackService {
    FeedbackRepository feedbackRepository;
    AccountRepository accountRepository;

    public List<FeedbackResponse> getAllFeedback() {
        List<FeedbackEntity> feedbacks = feedbackRepository.findAll();
        List<FeedbackResponse> responses = new ArrayList<>();
        for (FeedbackEntity feedback : feedbacks) {
            FeedbackResponse feedbackResponse = FeedbackResponse
                    .builder().feedbackId(feedback.getFeedbackId())
                    .fullName(feedback.getFullName())
                    .createAt(feedback.getCreateAt())
                    .content(feedback.getContent())
                    .email(feedback.getEmail())
                    .build();
            AccountEntity account = feedback.getAccount();
            AccountResponse accountResponse = new AccountResponse();
            if (account != null) {
                accountResponse.setId(account.getId());
                accountResponse.setEmail(account.getEmail());
                accountResponse.setUrlImage(account.getUrlImage());
                accountResponse.setPhoneNumber(account.getPhoneNumber());
            }
            feedbackResponse.setAccount(accountResponse);
            responses.add(feedbackResponse);
        }
        return responses;
    }

    public FeedbackResponse createFeedback(FeedbackRequest request) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        AccountEntity account = accountRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Not found email :" + email));

        FeedbackEntity feedback = FeedbackEntity.builder()
                .fullName(request.getFullName())
                .content(request.getContent())
                .createAt(LocalDateTime.now())
                .email(request.getEmail())
                .account(account)
                .build();
        feedbackRepository.save(feedback);
        return FeedbackResponse.fromEntity(feedback);
    }
}

