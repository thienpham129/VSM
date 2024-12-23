package com.project.vsm.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.cloudinary.Cloudinary;

@Configuration
public class CloudinaryConfig {
	private final String CLOUD_NAME = "dlx95hcda";
	private final String API_KEY = "146391975359696";
	private final String API_SECRET = "cHS6R7hE64QvdrC-3kcrjUtlzNY";

	@Bean
	public Cloudinary cloudinary() {
		Map<String, String> config = new HashMap<>();
		config.put("cloud_name", CLOUD_NAME);
		config.put("api_key", API_KEY);
		config.put("api_secret", API_SECRET);

		return new Cloudinary(config);
	}
}