package com.tencoding.bank.dto;

import org.springframework.stereotype.Component;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@Component
@NoArgsConstructor
@AllArgsConstructor
public class User {
	private String phone_number;
	private int age;
	
	@JsonProperty("isAgree")
    private boolean isAgree;
	
	private Account account;
}
