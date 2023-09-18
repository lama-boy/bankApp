package com.tencoding.bank.handler.exception;

import org.springframework.http.HttpStatus;

import lombok.Getter;

// 클래스를 정의한다.
@Getter // IoC 대상이 아니다. ( 필요할 떄 직접 new 할 예정 )
public class CustomRestfullException extends RuntimeException {

	private HttpStatus status;
	
	public CustomRestfullException(String message, HttpStatus status) {
		super(message);
		//?
		this.status = status;
	}
}

