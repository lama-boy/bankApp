package com.tencoding.bank.dto;

import lombok.Data;

@Data
public class WithdrawFormDto {
	
	private Long amount;  
	private String wAccountNumber;
	private String wAccountPassword;
	
	// TODO - 추후 추가 예정
}
