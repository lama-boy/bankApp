package com.tencoding.bank.controller;

import javax.websocket.server.PathParam;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/account")
public class AccountController {
	
	// 계좌 목록 페이
	// http://localhost:0/account/list
	@GetMapping({"/list","","/"})
	public String list() {
		return "account/list";
	}
	
	// 계좌 생성 페이지
	// http://localhost:0/account/save
	@GetMapping("/save")
	public String save() {
		return "account/save";
	}
	
	// 출금 페이지
	// http://localhost:0/account/withdraw
	@GetMapping("/withdraw")
	public String withdraw() {
		return "account/withdraw";
	}
	
	// 입금 페이지
	// http://localhost:0/account/deposit
	@GetMapping("/deposit")
	public String deposit() {
		return "account/deposit";
	}
	
	// 이체 페이지
	// http://localhost:0/account/transfer
	@GetMapping("/transfer")
	public String transfer() {
		return "account/transfer";
	}
	
	// TODO - 수정하기
	// 상세보기 페이지
	// http://localhost:0/account/detail
	@GetMapping("/detail")
	public String detail() {
		return "account/detail";
	}
	
	
}