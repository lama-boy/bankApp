package com.tencoding.bank.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.tencoding.bank.repository.interfaces.MenuRepository;
import com.tencoding.bank.repository.model.Menu;
import com.tencoding.bank.service.MenuService;

@RestController
public class AdimRestController {

    @Autowired
    MenuService menuService;

    @Autowired
    MenuRepository menuRepository;


    @GetMapping("/test")
    public String data(){
        return "";
    }

    @GetMapping("/loadTagDetails/service")
    public List<String> loadServiceTags(){
        List<String> list = new ArrayList<>();
        for(int i = 0; i < 15; i ++){
            list.add("" + i);
        }
        return list;
    }

    @GetMapping("/loadTagDetails/facilities")
    public List<String> loadFacilitiesTags(){
        List<String> list = new ArrayList<>();
        for(int i = 0; i < 15; i ++){
            list.add("" + i);
        }
        return list;
    }

    /*
    @GetMapping("/loadUserDetails")
    public List<User> loadUserDetails(){
        List list = ;
        return list;
    }
    @GetMapping("/loadCompanyDetails")
    public List<Company> loadCompanyDetails(){
        List list = ;
        return list;
    }
    @GetMapping("/loadNoticeDetails")
    public List<Board> loadNoticeDetails(){
        List list = ;
        return list;
    }
    @GetMapping("/loadCSDetails")
    public List<Board> loadCSDetails(){
        List list = ;
        return list;
    }
    */


    // 데이터를 받을 때 type - data 로 받아야된다.
    @GetMapping("/saveRoot/{root}")
    public void saveRoot(@PathVariable String root){
        String[] a = root.split("-");
        String type = a[0];
        String eleName = a[1];
        System.out.println(type);
        System.out.println(eleName);
        System.out.println(type.toUpperCase());
        // if(type.toUpperCase().equals("TAG")){
        //     System.out.println("tag실행됨");
        //     System.out.println(type);
        //     TagManager tag = new TagManager();
        //     tag.setParentTag(0);
        //     tag.setTagName(eleName);
        //     tagManagerRepository.save(tag);
        // }else{
        System.out.println("menu실행됨");
        Menu menu = new Menu();
        menu.setMenuName(eleName);
        menu.setParentMenu(0);
        menuRepository.saveMenu(menu);
        // }
    }


}

