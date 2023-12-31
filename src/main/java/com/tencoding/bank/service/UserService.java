package com.tencoding.bank.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tencoding.bank.dto.SignInFormDto;
import com.tencoding.bank.dto.SignUpFormDto;
import com.tencoding.bank.handler.exception.CustomRestfullException;
import com.tencoding.bank.repository.interfaces.UserRepository;
import com.tencoding.bank.repository.model.User;

@Service // IoC 대상 - 싱글톤 패턴
public class UserService{
	
	// DAO (Data Acess Object)
	@Autowired
	private UserRepository userRepository;
	
	// DI (Dependancy Injection) - 가지고 오다.
//	public UserService(UserRepository userRepository) {
//		this.userRepository = userRepository;
//	}
	
	// 로그인 서비스 처리
	@Transactional
	public void signUp(SignUpFormDto signUpFormDto) {
		int result = userRepository.insert(signUpFormDto);
		if(result != 1) {
			throw new CustomRestfullException("회원가입실패", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	// 로그인 서비스 처리
	@Transactional
	public User signIn(SignInFormDto signInFormDto){

		User userEntity = userRepository.findByUsernameAndPassword(signInFormDto);
		if(userEntity == null){
			throw new CustomRestfullException("아이디 혹은 비번이 틀렸습니다.", 
				HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return userEntity;
	}
}


