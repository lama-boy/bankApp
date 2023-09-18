$(document).ready(function() {
    const ele = new Ele($('#body_body'), 'nav');
    ele.rootCssSet();
    rootInner('nav')
    






    
});


function rootInner(eleId){
    const rootBox = new Ele($('#' + eleId),$('<div id = "' + eleId + '_header"'));

    rootBox.appendDiv(eleId + '_header');
    $('#' + eleId + '_header').css('display','flex');
    $('#' + eleId + '_header').append($('<div id = "'+ eleId +'_buttons">'));

    $('#' + eleId + '_buttons').append('<div id = "'+ eleId+'_addBtn">');
    $('#' + eleId + '_buttons_addBtn').html('+');
    
    $('#' + eleId + '_buttons').append('<div id = "'+ eleId+'_deleteBtn">');
    $('#' + eleId + '_buttons_deleteBtn').html('-');

    rootBox.appendDiv(eleId + '_body');
}

class Ele {
    constructor(parentTag, childTagId) {
        this.childTag = $('<div id="' + childTagId + '">');
        parentTag.append(this.childTag);
    }

    appendDiv(divId){
        this.childTagId.append($('<div id="'+ divId +'">'));
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

    rootCssSet(){
        this.childTag.css('display', 'inline-block');
        this.childTag.css('width', '33%');
        this.childTag.css('height', '260px');
        this.childTag.css('border','1px solid black');
    }
}
