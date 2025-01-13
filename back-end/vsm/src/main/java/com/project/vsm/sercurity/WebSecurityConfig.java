//package com.project.vsm.sercurity;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
//import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
//import org.springframework.security.config.http.SessionCreationPolicy;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
//
//import lombok.RequiredArgsConstructor;
//
//@Configuration
//@EnableWebSecurity
//@RequiredArgsConstructor
//@EnableMethodSecurity
//public class WebSecurityConfig {
//	
//	@Autowired
//	private JwtAuthenticationFilter jwtAuthenticationFilter;
//	@Autowired
//	private CustomUserDetailService customUserDetailService;
//	
//	@Bean
//    SecurityFilterChain applicationSecurity(HttpSecurity http) throws Exception {
//		
//		http.addFilterBefore(jwtAuthenticationFilter,UsernamePasswordAuthenticationFilter.class);
//		
//        http
//            .cors(AbstractHttpConfigurer::disable)
//            .csrf(AbstractHttpConfigurer::disable)
//            .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
//            .formLogin(AbstractHttpConfigurer::disable)
//            .securityMatcher("/**")
//            .authorizeHttpRequests(registry -> registry
//                    .requestMatchers("/").permitAll()
//                    .requestMatchers("/public/**").permitAll()
//                    .requestMatchers("/auth/**").permitAll()
//                    .requestMatchers("/user").hasRole("USER")
//                    .requestMatchers("/admin/**").hasRole("ADMIN")
//                    .anyRequest().authenticated()
//            );
//        return http.build();
//    }
//	
//	@Bean
//	PasswordEncoder passwordEncoder() {
//		return new BCryptPasswordEncoder();
//	}
//	
//	 @Bean
//	     AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
//	        var builder = http.getSharedObject(AuthenticationManagerBuilder.class);
//	        builder
//	                .userDetailsService(customUserDetailService)
//	                .passwordEncoder(passwordEncoder());
//	        return builder.build();
//	
//	 }
//}

package com.project.vsm.sercurity;

import com.project.vsm.model.AccountEntity;
import com.project.vsm.repository.AccountRepository;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import lombok.RequiredArgsConstructor;

import java.util.List;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class WebSecurityConfig {

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Autowired
    private CustomUserDetailService customUserDetailService;

    @Bean
    SecurityFilterChain applicationSecurity(HttpSecurity http) throws Exception {

        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        http.csrf(AbstractHttpConfigurer::disable) // Disable CSRF if it’s not needed
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .formLogin(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(
                        registry ->
                                registry.requestMatchers("/", "/public/**", "/auth/**", "/uploads/**").permitAll()
                                        .requestMatchers("/user").hasRole("USER")
                                        .requestMatchers("/admin/**").hasRole("ADMIN")
                                        .requestMatchers("/", "/public/**", "/auth/**", "/assets/**").permitAll()
                                        .requestMatchers("/admin/**").hasRole("ADMIN")
                                        .requestMatchers("/driver/**")
                                        .hasAnyRole("DRIVER", "ADMIN").requestMatchers("/api/v1/payment/**").permitAll().anyRequest()
                                        .authenticated())
                .cors(cors -> cors.configurationSource(corsConfigurationSource())); // Apply custom CORS configuration

        return http.build();
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
        var builder = http.getSharedObject(AuthenticationManagerBuilder.class);
        builder.userDetailsService(customUserDetailService).passwordEncoder(passwordEncoder());
        return builder.build();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:3000", "http://127.0.0.1:5500")); // Set your frontend
        // origin
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE"));
        configuration.setAllowedHeaders(List.of("*")); // Adjust headers as needed
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
