package com.tencoding.bank.repository.model;

import lombok.Data;

@Data
public class Menu {
    private int id;
    private String menuName;
    private int parentMenu;
}
