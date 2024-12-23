package com.project.vsm.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.checkerframework.checker.units.qual.A;

import java.time.LocalDateTime;

@Entity
@Table(name = "feedback")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class FeedbackEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "feedback_id")
    long feedbackId;

    @Column(name = "service")
    String service;

    @Column(name = "content")
    String content;

    @Column(name = "createAt")
    LocalDateTime createAt;

    @Column(name = "rating")
    double rating;

    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST,
            CascadeType.DETACH, CascadeType.MERGE, CascadeType.REFRESH}, optional = false)
    @JoinColumn(name = "account_id")
    AccountEntity account;
}
