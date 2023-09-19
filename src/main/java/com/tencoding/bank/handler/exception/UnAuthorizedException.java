package com.tencoding.bank.handler.exception;

import org.springframework.http.HttpStatus;

import lombok.Getter;

@Getter
public class UnAuthorizedException extends RuntimeException{
    
    private HttpStatus status;
    private String message;

    public UnAuthorizedException(String message, HttpStatus status){
        super(message);
        this.message = message;
    }
    

}
