package com.project.vsm.config;

import com.project.vsm.model.AccountEntity;
import com.project.vsm.repository.AccountRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class ApplicationConfig {
    PasswordEncoder passwordEncoder;

    @Bean
    public ApplicationRunner applicationRunner(AccountRepository accountRepository) {
        return args -> {
            if (accountRepository.findByEmail("admin@gmail.com").isEmpty()) {
                try {
                    AccountEntity account = new AccountEntity();
                    account.setEmail("admin@gmail.com");
                    account.setPassword(passwordEncoder.encode("admin"));
                    account.setRole("ROLE_ADMIN");
                    account.setEnabled(true);

                    accountRepository.save(account);
                    log.info("Admin user has been created with default password: admin, please change it!");
                } catch (Exception e) {
                    log.error("Error occurred while creating admin user: ", e);
                    throw new RuntimeException("Failed to create admin user", e);
                }
            }
        };
    }
}
