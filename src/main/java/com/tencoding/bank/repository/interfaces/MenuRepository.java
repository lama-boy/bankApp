package com.tencoding.bank.repository.interfaces;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.tencoding.bank.repository.model.Menu;

@Mapper
public interface MenuRepository {
    
    public int saveMenu(Menu menu);
    public int updateById(String id);
    public int deleteById(String id);
    public List<Menu> findAllMenuNames();

}
