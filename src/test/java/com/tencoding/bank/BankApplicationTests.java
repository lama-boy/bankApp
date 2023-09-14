package com.tencoding.bank;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tencoding.bank.dto.Account;
import com.tencoding.bank.dto.User;
import com.tencoding.bank.repository.interfaces.AccountRepository;
import com.tencoding.bank.repository.interfaces.HistoryRepository;
import com.tencoding.bank.repository.interfaces.UserRepository;

@SpringBootTest
class BankApplicationTests {

	@Autowired
	HistoryRepository historyRepository;
	@Autowired
	UserRepository userRepository;
	@Autowired
	AccountRepository accountRepository;
	
	
	@Test
	@DisplayName("repository Test")
	void repositoryTest() {
	}
	
//	@Test
//	@DisplayName("jsonParsing Test")
//	void jsonParse() {
//		User user = User.builder()
//	            .phone_number("11")
//	            .age(1)
//	            .isIsAgree(false)
//	            .account(Account.builder()
//	                    .email("aa@a.a")
//	                    .userId("abc")
//	                    .build())
//	            .build();
//		
//		ObjectMapper objectMapper = new ObjectMapper();
//        try {
//            String json = objectMapper.writeValueAsString(user);
//            System.out.println(json);
//        } catch (JsonProcessingException e) {
//            e.printStackTrace();
//        }
//	}

}


