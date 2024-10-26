package com.project.vsm.config;

import com.project.vsm.model.AccountEntity;
import com.project.vsm.model.UserEntity;
import com.project.vsm.repository.AccountRepository;
import com.project.vsm.repository.UserRepository;
import com.project.vsm.service.AuthService;
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
    UserRepository userRepository;


    @Bean
    public ApplicationRunner applicationRunner(AccountRepository accountRepository, UserRepository userRepository) {
        return args -> {
            if (accountRepository.findByEmail("admin").isEmpty()) {
                try {
                    AccountEntity account = new AccountEntity();
                    account.setEmail("admin");
                    account.setPassword(passwordEncoder.encode("admin"));
                    account.setRole("ROLE_ADMIN");
                    account.setEnabled(true);

                    account = accountRepository.save(account);

                    UserEntity user = new UserEntity();
                    user.setAccount(account);

                    userRepository.save(user);

                    log.info("Admin user has been created with default password: admin, please change it!");

                } catch (Exception e) {
                    log.error("Error occurred while creating admin user: ", e);
                    throw new RuntimeException("Failed to create admin user", e);
                }
            }
        };
    }
}
