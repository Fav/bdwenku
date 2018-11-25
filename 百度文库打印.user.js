// ==UserScript==
// @name         打印
// @namespace    http://tampermonkey.net/
// @require      http://code.jquery.com/jquery-3.3.1.min.js
// @require      https://cdn.bootcss.com/jQuery.print/1.6.0/jQuery.print.min.js
// @version      0.1
// @description  go print
// @author       You
// @match        http://wenku.baidu.com/*
// @match        https://wenku.baidu.com/*
// @grant        none
// ==/UserScript==

$(document).ready(function(){
    'use strict';
    var content = document.getElementById('reader-container-inner-1');

    var para = document.createElement("div");
    para.innerHTML = '<div style="position:fixed;left:10px;top:80px;border:solid 2px red;padding:10px;z-index:999;" id="ddd">print</div>';
    document.body.appendChild(para);

    document.getElementById("hideOrg").onclick = function() {
        $('#reader-container-inner-1>').hide();
    }
    document.getElementById("ddd").onclick = function() {
        //删除兄弟节点,删除父节点的兄弟节点
        removeBrother(content);
        //点击全屏按钮
        //document.getElementsByClassName('top-right-fullScreen')[0].click();
        //去掉浮动导航栏
        document.getElementsByClassName('fix-searchbar-wrap')[0].remove();

        createPrintDom();
        let page = getPageCount();
        let pageHight = 1343.66;

        window.onscroll = function doCopy(){
            for(let i = 1; i< page+1;i++){
                let pageClsName = 'reader-page-'+i;
                //页面内容是否为空
                let contentPage = $('#reader-container-inner-1>.'+pageClsName+'>.inner>.bd').html();
                if(contentPage != '' ){
                    //查找目标地方是否为空
                    let target = $('#myprint>.'+pageClsName+'>.inner>.bd')
                    if(target[0]==undefined || target[0] == null){
                        //创建节点，并填内容
                        $('#myprint').append($('#reader-container-inner-1>.'+pageClsName).prop("outerHTML"));
                    }
                }
                $("div").scrollTop(pageHight*i);
            }
        }
        $('#ddd').after( '<div style="position:fixed;left:10px;top:120px;border:solid 2px red;padding:10px;z-index:999;" id="hideOrg">hide</div>')
        //doCopy();
        //$('#myprint').print();
        //$("#reader-container-inner-1").scroll(doCopy);
    };

    function removeBrother(elm) {
        if (elm === null || elm.parentNode === null || elm === document.body) {
            return;
        }
        var p = elm.parentNode.children;
        for (var i = 0, pl = p.length; i < pl; i++) {
            if(p[i] !== elm && p[i].tagName.toLowerCase() !== "script"){
                p[i].innerHTML = "";
            }
        }
        removeBrother(elm.parentNode);
    }

    function getPageCount(){
        return $('#reader-container-inner-1>.reader-page').length;
    }

    function createPrintDom(){
        $('#reader-container-inner-1').after('<div class="reader-container-inner" id="myprint"><div>');
    }



});