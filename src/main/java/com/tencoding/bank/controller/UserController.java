package com.tencoding.bank.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.tencoding.bank.dto.SignUpFormDto;

@Controller
@RequestMapping("/user")
public class UserController {

	// 회원 가입 페이지 요청
	// http://localhost:80/user/sign-up
	@GetMapping("/sign-up")
	public String signUp() {
		return "user/signUp";
	}

	// 로그인 페이지 요청
	// http://localhost:80/user/sign-in
	@GetMapping("/sign-in")
	public String signIn() {
		return "user/signIn";
	}

	// 회원가입처리
	// name 속성을 이용해서
	// key=value
	// Object Mapper
	
	@PostMapping("/sign-up")
	public String signUpProc(SignUpFormDto signUpFormDto) {
		System.out.println(signUpFormDto);
		// 1. 유효성 검사
		// 2. 사용자 이미지 ..
		
		// 3. 서비스 호출
		// 4. 정상 처리가 되었다면
		return "redirect:/user/sign-in";
	}
	
}
