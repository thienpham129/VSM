package com.project.vsm.controller;

import java.security.Principal;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.vsm.sercurity.UserPrinciple;
import com.project.vsm.model.CarEntity;
import com.project.vsm.sercurity.UserPrinciple;
import com.project.vsm.service.CarImageService;
import com.project.vsm.service.CarService;

@RestController
@CrossOrigin(origins = "*")
public class TestController {
    @Autowired
    private CarImageService carImageService;
    @Autowired
    private CarService carService;

    @GetMapping("/public/xoaimg")
    public String delete() {
        Optional<CarEntity> carEntity = carService.getCarById(Long.valueOf(23l));
        carImageService.deleteImgCarByCar(carEntity.get());
        return "Xóa thành công";
    }

    @GetMapping("/public/test")
    public String test() {
        return "Hello";
    }

    @GetMapping("/secured")
    public String secured(@AuthenticationPrincipal UserPrinciple principle) {

        return "nếu thấy đã đăng nhập as email " + principle.getEmail() + "id: " + principle.getUserID();
    }

    @GetMapping("/admin")
    public String admin(@AuthenticationPrincipal UserPrinciple principle) {
        return "nếu thấy thì là admin";
    }

    @GetMapping("/loginSuccess")
    public String loginSuccess() {
        return "Login successful!";
    }
}
