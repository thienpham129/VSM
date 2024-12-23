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
                    .service(feedback.getService())
                    .content(feedback.getContent())
                    .createAt(feedback.getCreateAt())
                    .rating(feedback.getRating())
                    .build();
            AccountEntity account = feedback.getAccount();
            AccountResponse accountResponse = new AccountResponse();
            if (account != null) {
                accountResponse.setId(account.getId());
                accountResponse.setEmail(account.getEmail());
                accountResponse.setFirstName(account.getFirstName());
                accountResponse.setLastName(account.getLastName());
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
                .service(request.getService())
                .content(request.getContent())
                .rating(request.getRating())
                .createAt(LocalDateTime.now())
                .account(account)
                .build();
        feedbackRepository.save(feedback);
        return FeedbackResponse.fromEntity(feedback);
    }

    public String userDeleteFeedback(long feedbackId) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        AccountEntity account = accountRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Not found email :" + email));

        FeedbackEntity feedback = feedbackRepository.findById(feedbackId)
                .orElseThrow(() -> new RuntimeException("Not found feedback :" + feedbackId));

        if (feedback.getAccount().getId() != (account.getId())) {
            throw new RuntimeException("You are not authorized to delete this feedback");
        }

        feedbackRepository.delete(feedback);
        return "Delete feedback successfully";
    }

    @Transactional
    public FeedbackResponse userUpdateFeedback(long feedbackId, FeedbackRequest request) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        AccountEntity account = accountRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Not found email :" + email));

        FeedbackEntity feedback = feedbackRepository.findById(feedbackId)
                .orElseThrow(() -> new RuntimeException("Not found feedback :" + feedbackId));

        if (feedback.getAccount().getId() == (account.getId())) {
            feedback.setService(request.getService());
            feedback.setContent(request.getContent());
            feedback.setRating(request.getRating());
            feedback.setCreateAt(LocalDateTime.now());
            feedbackRepository.save(feedback);
            return FeedbackResponse.fromEntity(feedback);
        } else {
            throw new RuntimeException("You are not authorized to update this feedback");
        }
    }
}

