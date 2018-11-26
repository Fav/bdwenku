// ==UserScript==
// @name         百度文库打印
// @namespace    http://tampermonkey.net/
// @require      http://code.jquery.com/jquery-3.3.1.min.js
// @require      https://cdn.bootcss.com/jQuery.print/1.6.0/jQuery.print.min.js
// @version      0.1
// @description  go print
// @author       You
// @match        http://wenku.baidu.com/*
// @match        https://wenku.baidu.com/*
// @grant        none
// @note         1.点击 prepare print 按钮之后，除文档内容之外的其余元素会移除，
// @note         2.用户需要手动将滚动条从上往下缓慢拖动，保证每一个单页都加载完成(bd使用ajax动态生成的页面)，文档下会新建一个id为myprint的div来保存已加载的页面
// @note         3.点击print按钮弹出打印对话框，用户最好自己调整一下页面边距，缩放，使打印效果达到最好，此时打印的是"myprint" div
// @note         4.点击取消，然后右键打印，可以打印当前网页，此时打印的是document
// @note         现在还不是很好用，持续改进
// ==/UserScript==

$(document).ready(function(){
    'use strict';
    var content = document.getElementById('reader-container-inner-1');

    let para = document.createElement("div");
    para.innerHTML = '<div style="position:fixed;left:10px;top:80px;border:solid 2px red;padding:10px;z-index:999;" id="ddd">prepare print</div>';
    document.body.appendChild(para);


    document.getElementById("ddd").onclick = function() {
        //删除兄弟节点,删除父节点的兄弟节点
        removeBrother(content);
        //点击全屏按钮
        //document.getElementsByClassName('top-right-fullScreen')[0].click();
        //去掉浮动导航栏
        document.getElementsByClassName('fix-searchbar-wrap')[0].remove();

        //显示所有页
        $('.moreBtn').click();

        remove('wk-other-new-cntent');

        $('reader-container-inner-1').scrollTop();

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
                    }else{
                        //更新内容
                        target.html($('#reader-container-inner-1>.'+pageClsName+'>.inner>.bd').html());
                    }
                }
                //$("div").scrollTop(pageHight*i);
            }
        }

        let para = document.createElement("div");
        para.innerHTML =  '<div style="position:fixed;left:10px;top:120px;border:solid 2px red;padding:10px;z-index:999;" id="hideOrg">print</div>';
        document.body.appendChild(para);

        document.getElementById("hideOrg").onclick = function() {
            $('#reader-container-inner-1>').hide();
            $('#myprint').print();
        }

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

    function remove(className){
        var items = document.getElementsByClassName(className);
        if(items != null && items.length >0){
            var item = items[0];
            if(item != null )
            {
                item.remove();
            }
        }
    }

});