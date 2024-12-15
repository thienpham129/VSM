package com.project.vsm.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileService {

	@Value("${spring.fileUpload.rootPath}")
	private String rootPath;
	@Value("${file.upload-dir}")
	private String uploadDir;

	private Path root;

	public String saveFile(String fileName, MultipartFile multipartFile) throws IOException {
		Path uploadPath = Paths.get(uploadDir);

		if (!Files.exists(uploadPath)) {
			Files.createDirectories(uploadPath);
		}

		String fileCode = RandomStringUtils.randomAlphanumeric(8);
		Path filePath = uploadPath.resolve(fileCode + "-" + fileName);
		Files.copy(multipartFile.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

		return "http://localhost:8080/uploads/" + fileCode + "-" + fileName;
	}

	public void init() {
		try {
			root = Paths.get(rootPath);
			if (Files.notExists(root)) {
				Files.createDirectories(root);
			}
		} catch (IOException e) {
			throw new RuntimeException("Can't initialize folder" + root);
		}
	}

	public boolean uploadFile(MultipartFile file) {
		try {
			init();
			Files.copy(file.getInputStream(), this.root.resolve(file.getOriginalFilename()),
					StandardCopyOption.REPLACE_EXISTING);
			return true;
		} catch (IOException e) {
			throw new RuntimeException("Can't save file!");
		}
	}
}
