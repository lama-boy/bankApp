package com.tencoding.bank.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tencoding.bank.repository.interfaces.MenuRepository;

@Service
public class MenuService {
    
    @Autowired
    MenuRepository menuRepository;

}
