package com.tencoding.bank.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tencoding.bank.dto.DepositFormDto;
import com.tencoding.bank.dto.HistoryDto;
import com.tencoding.bank.dto.SaveFormDto;
import com.tencoding.bank.dto.TransferFormDto;
import com.tencoding.bank.dto.WithdrawFormDto;
import com.tencoding.bank.handler.exception.CustomRestfullException;
import com.tencoding.bank.repository.interfaces.AccountRepository;
import com.tencoding.bank.repository.interfaces.HistoryRepository;
import com.tencoding.bank.repository.model.Account;
import com.tencoding.bank.repository.model.History;
import com.tencoding.bank.utils.Define;

@Service // IoC 대상 + 싱글톤패턴 -> 스프링 컨테이너 메모리에 객체가 생성.
public class AccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private HistoryRepository historyRepository;

    @Transactional
    public void createAccount(SaveFormDto saveFormDto, Integer principalId) {
        // 등록 처리 - insert
        Account account = new Account();
        account.setNumber(saveFormDto.getNumber());
        account.setPassword(saveFormDto.getPassword());
        account.setBalance(saveFormDto.getBalance());
        account.setUserId(principalId);
        int resultRowCount = accountRepository.insert(account);
        if (resultRowCount != 1) {
            throw new CustomRestfullException("계좌 생성 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /*
     * 계좌 목록 보기
     * 
     * @param userid
     * 
     * @return List<Account>
     */
    @Transactional
    public List<Account> readAccountList(Integer userId) {
        List<Account> list = accountRepository.findByUserId(userId);
        return list;
    }

    /*
     * 출금 기능 로직 고민해보기.
     * 1. 계좌 존재 여부 확인. -- select query
     * 2. 본인 계좌 여부 확인. -- same as prev
     * 3. 계좌 비밀번호 확인. -- same as prev
     * 4. 잔액이 남아있는지. -- same as prev
     * 5. 출금 처리 --> update query
     * 6. 거래 내역 등록 --> insert query
     * 7. 트랜잭션 처리
     * 
     */
    @Transactional
    public void updateAccountWithdraw(WithdrawFormDto withdrawFormDto, Integer id) {
        Account accountEntity = accountRepository.findByNumber(withdrawFormDto.getWAccountNumber());
        // 1
        if (accountEntity == null) {
            throw new CustomRestfullException("해당 계좌가 없습니다.", HttpStatus.BAD_REQUEST);
        }
        // 2
        if (accountEntity.getUserId() != id) {
            throw new CustomRestfullException("본인 소유 계좌가 아닙니다.", HttpStatus.BAD_REQUEST);
        }
        // 3
        if (!accountEntity.getPassword().equals(withdrawFormDto.getWAccountPassword())) {
            throw new CustomRestfullException("출금 계좌 비밀번호가 틀렸습니다.", HttpStatus.BAD_REQUEST);
        }
        // 4
        if (accountEntity.getBalance() < withdrawFormDto.getAmount()) {
            throw new CustomRestfullException("잔액 부족.", HttpStatus.BAD_REQUEST);
        }

        // 5 -> update query
        accountEntity.withdraw(withdrawFormDto.getAmount());
        accountRepository.updateById(accountEntity);

        // 6 - 거래내역 등록 History 객체 생성
        History history = new History();
        history.setAmount(withdrawFormDto.getAmount());
        // 출금 시점에 해당 계좌의 잔액 입력
        history.setWBalance(accountEntity.getBalance());
        history.setWAccountId(accountEntity.getId());
        history.setDBalance(null);
        history.setDAccountId(null);

        int resultRowCount = historyRepository.insert(history);
        if (resultRowCount != 1) {
            throw new CustomRestfullException("정상 처리 되지 않았습니다.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Transactional
    public void updateAccountDeposit(DepositFormDto depositFormDto, Integer id) {
        Account accountEntity = accountRepository.findByNumber(depositFormDto.getDAccountNumber());
        // 1
        if (accountEntity == null) {
            throw new CustomRestfullException("해당 계좌가 없습니다.", HttpStatus.BAD_REQUEST);
        }

        accountEntity.deposit(depositFormDto.getAmount());
        accountRepository.updateById(accountEntity);

        // 거래내역 등록 History 객체 생성
        History history = new History();
        history.setAmount(depositFormDto.getAmount());
        // 입금 시점에 해당 계좌의 잔액 입력
        history.setDBalance(accountEntity.getBalance());
        history.setDAccountId(accountEntity.getId());
        history.setWBalance(null);
        history.setWAccountId(null);

        int resultRowCount = historyRepository.insert(history);
        if (resultRowCount != 1) {
            throw new CustomRestfullException("정상 처리 되지 않았습니다.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 이체 로직 고민해보기
    // 1. 출금할 계좌 존재 여부 확인 - select
    // 2. 입금 계좌 존재 여부 확인 - select
    // 3. 출금 계좌 본인 소유 확인 - 객체 상태값 확인 (id) 객체( 1 - select)
    // 4. 출금 계좌 비번 확인 - TransferFormDto(비번) / 모델 (비번)
    // 5. 출금 계좌 잔액 여부 확인 - DTO / 모델 객체
    // 6. 출금 계좌 잔액 update - update
    // 7. 입금 계좌 잔액 update - update
    // 8. 거래 내역 등록 update - update
    // 8. Transaction 처리
    @Transactional
    public void updateAccountTransfer(TransferFormDto transferFormDto,Integer id) {
        // 1
        Account withdrawAccountEntity = accountRepository.findByNumber(transferFormDto.getWAccountNumber());
        if(withdrawAccountEntity == null){
            throw new CustomRestfullException("출금 계좌가 존재하지 않습니다.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        // 2
        Account depositAccountEntity = accountRepository.findByNumber(transferFormDto.getDAccountNumber());
        if(depositAccountEntity == null){
            throw new CustomRestfullException("입금 계좌가 존재하지 않습니다.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        // 3. 출금 계좌 본인 소유 확인.
        withdrawAccountEntity.accountOwnerCheck(id);

        // 4. 출금 계좌 비밀번호 확인
        withdrawAccountEntity.passwordCheck(transferFormDto.getWAccountPassword());

        // 5. 출금 계좌 잔액 여부 확인.
        withdrawAccountEntity.balanceCheck(transferFormDto.getAmount());

        // 6. 출금 계좌 잔액 상태 값 변경 처리.
        withdrawAccountEntity.withdraw(transferFormDto.getAmount());

        // update 처리
        accountRepository.updateById(withdrawAccountEntity);

        // 7. 입금 계좌 잔액 상태 값 변경 처리
        depositAccountEntity.deposit(transferFormDto.getAmount());

        //update처리
        accountRepository.updateById(depositAccountEntity);
        
        // 8. 거래 내역 등록
        History history = new History();
        history.setAmount(transferFormDto.getAmount());
        history.setWAccountId(withdrawAccountEntity.getId());
        history.setWBalance(withdrawAccountEntity.getBalance());
        history.setDAccountId(depositAccountEntity.getId());
        history.setDBalance(depositAccountEntity.getBalance());

        int resultRowCount = historyRepository.insert(history);
        if(resultRowCount != 1){
            throw new CustomRestfullException("정상 처리 되지 않았습니다.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /*
     * 단일 계좌 정보 검색
     * @param id (계좌의 pk)
     * @return AccountEntity
     * 
     */
    
    public Account readAccount(Integer id) {
        // 계좌 존재 여부 확인
        Account accountEntity = accountRepository.findById(id);
        if(accountEntity == null){
            throw new CustomRestfullException("해당 계좌를 찾을 수 없습니다.", HttpStatus.BAD_REQUEST);
        }
        return accountEntity;
    }

    /*
     * 단일 계좌에 대한 거래 내역 검색
     * @param type = [all, deposit, withdraw]
     * @param id(account pk)
     * @return History Entity 거래내역 (DTO)
     */
    public List<HistoryDto> readHistoryListByAccount(Integer id,String type) {
        List<HistoryDto> list = historyRepository.findByHistoryType(id,type);
        return list;
    }

}
