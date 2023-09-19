$(document).ready(function() {
    // nav 자리에 ajax 해서 아래 코드들이 실행되야함.
    getRootMenus();
});

function getRootMenus(){
    $.get('/test', function (data) {
        let list = ['샘플데이터1','샘플데이터2','샘플데이터3','샘플데이터4'];
        list.forEach(e => console.log(e));
        const ele = new Ele($('#body_body'), 'nav');
        ele.rootCssPreset1();
        ele.rootInner();
    })
}

function rootInner(){
    console.log('실행됨');
    let tagHeader = $('<div id ="' + this.childTagId + '_header">')
    tagHeader.css('display','block');
    tagHeader.css('border','1px solid black');
    tagHeader.css('height','')
    this.childTag.append(tagHeader);
    
    
    tagHeader.css('display','flex');
    tagHeader.css('border','1px solid black');
    tagHeader.append($('<div id = "'+ this.childTagId +'_buttons">'));

    $('#' + this.childTagId + '_buttons').append('<div id = "'+ this.childTagId +'_addBtn">');
    $('#' + this.childTagId + '_buttons_addBtn').html('+');
    
    $('#' + this.childTagId + '_buttons').append('<div id = "'+ this.childTagId +'_deleteBtn">');
    $('#' + this.childTagId + '_buttons_deleteBtn').html('-');
}




// 제발 childTagId 에 ele 생성하지말고 Id 를 String 으로 넣어라...
class Ele {
    constructor(parentTag, childTagId) {
        this.childTagId = childTagId;
        this.childTag = $('<div id="' + childTagId + '">');
        parentTag.append(this.childTag);
    }

    appendDiv(divId){
        $('#' + this.childTagId).append($('<div id="'+ divId +'">'));
    }

    defaultCss(width, height, display) {
        this.childTag.css('display', display);
        this.childTag.css('width', width);
        this.childTag.css('height', height);
    }

    css(cssName,val){
        this.childTag.css(cssName,val);
    }

    setClass(className){
        this.childTag.attr('class',className);
    }

    html(html) {
        this.childTag.html(html);
    }

    setNewAttr(attrName,attrValue){
        this.childTag.attr('data-' + attrName,attrValue);
    }

    rootCssPreset1(){
        this.childTag.css('display', 'inline-block');
        this.childTag.css('width', '33%');
        this.childTag.css('height', '260px');
        this.childTag.css('border','1px solid black');
    }

}
