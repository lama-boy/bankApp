package com.tencoding.bank.repository.model;

import java.sql.Timestamp;

import org.springframework.http.HttpStatus;

import com.tencoding.bank.handler.exception.CustomRestfullException;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Account {
	private Integer id;
	private String number;
	private String password;
	private Long balance;
	private Integer userId;
	private Timestamp createdAt;

	// 출금 기능
	public void withdraw(Long amount) {
		if (this.balance > amount)
			this.balance -= amount;
	}

	// 입금 기능
	public void deposit(Long amount) {
		this.balance += amount;
	}
	
	// TODO
	// 패스워드 체크
	public void passwordCheck(String principalPassword) {
		if(!this.password.equals(principalPassword)){
			throw new CustomRestfullException("계좌 비밀번호가 틀렸습니다.", HttpStatus.BAD_REQUEST);
		}
	}
	// 잔액 여부 확인
	public void balanceCheck(Long amount) {
		if(this.balance < amount){
			throw new CustomRestfullException("계좌잔액이 부족합니다.", HttpStatus.BAD_REQUEST);
		}
	}
	// 계좌 소유자 확인
	public void accountOwnerCheck(Integer principal) {
		if(this.userId != principal){
			throw new CustomRestfullException("계좌 소유자가 아닙니다.", HttpStatus.FORBIDDEN);
		}
	}

}