package com.tencoding.bank.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class adimRestController {
    @GetMapping("/test")
    public String data(){
        return "";
    }

    //adminpage
    @GetMapping("/loadRootMenus")
    public List<Object> loadRootMenus(){
        List<Object> list = new ArrayList<Object>();
        return list;
    }
    @GetMapping("/loadRootTags")
    public List<Object> loadRootTags(){
        List<Object> list = new ArrayList<Object>();
        return list;
    }
    
    @GetMapping("/loadMenus")
    public List<Object> loadMenus(){
        List<Object> list = new ArrayList<Object>();
        return list;
    }

    @GetMapping("/loadTags/{parentTag}")
    public List<Object> loadTags(@PathVariable String parentTag){
        List<Object> list = new ArrayList<Object>();
        return list;
    }

    @GetMapping("/pop-up-page")
    public String popUpPage(){
        return "html/popUpPage.html";
    }


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
        //     System.out.println("menu실행됨");
        //     Menu menu = new Menu();
        //     menu.setMenuName(eleName);
        //     menu.setParentMenu(0);
        //     menuRepository.save(menu);
        // }
    }


}


