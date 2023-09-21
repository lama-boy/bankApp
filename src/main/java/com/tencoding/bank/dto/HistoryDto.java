package com.tencoding.bank.dto;
import java.sql.Timestamp;

import com.tencoding.bank.utils.TimestampUtil;

import lombok.Data;

@Data
public class HistoryDto {
    private Integer id;
    private Long amount;
    private Long balance;
    private String sender;
    private String receiver;
    private Timestamp createdAt;
    
    // 시간 가공
    public String formatCreatedAt(){
        return TimestampUtil.timestampToString(createdAt);
    }
    // 금액 , 처리
}