// ==UserScript==
// @name         百度文库打印
// @namespace    http://cesium.xin/
// @version      0.1.3
// @description  打印时，文档被最大化(右上方最大按钮点击)，此时需要调整一下打印参数，更多>>边距>>自定义,调整一下上下左右距离，以达到最好的效果
// @author       You
// @match        http://wenku.baidu.com/*
// @match        https://wenku.baidu.com/*
// @grant        none
// @icon         https://www.baidu.com/cache/icon/favicon.ico
// @note         1.点击 prepare print 按钮之后，除文档内容之外的其余元素会移除，
// @note         2.打印时，文档被最大化(右上方最大按钮点击)，此时需要调整一下打印参数，更多>>边距>>自定义,调整一下上下左右距离，以达到最好的效果
// @note         参考了 詹eko 百度文库（wenku）在线下载PDF格式文件 的部分代码https://greasyfork.org/zh-CN/scripts/373334-%E7%99%BE%E5%BA%A6%E6%96%87%E5%BA%93-wenku-%E5%9C%A8%E7%BA%BF%E4%B8%8B%E8%BD%BDpdf%E6%A0%BC%E5%BC%8F%E6%96%87%E4%BB%B6
// ==/UserScript==

$(document).ready(function(){
    'use strict';
    var content = document.getElementById('reader-container-inner-1');

    var para = document.createElement("div");
    para.innerHTML = '<div style="position:fixed;left:10px;top:80px;border:solid 2px red;padding:10px;z-index:999;" id="ddd">print</div>';
    document.body.appendChild(para);

    document.getElementById("ddd").onclick = function() {
        //删除兄弟节点,删除父节点的兄弟节点
        removeBrother(content);
        //点击全屏按钮
        //document.getElementsByClassName('top-right-fullScreen')[0].click();
        //去掉浮动导航栏
        document.getElementsByClassName('fix-searchbar-wrap')[0].remove();
        document.getElementsByClassName('wk-other-new-cntent')[0].remove();

        $(".moreBtn").click();

        jQuery.fn.extend({remove: function(){return false;}});
        let height = document.body.scrollHeight;
        let htemp=0;
        var time = window.setInterval(function(){
            $(window).scrollTop(htemp);
            htemp=htemp+700;
            height = document.body.scrollHeight;
            if (htemp>height) {
                window.clearInterval(time);
                window.setTimeout(function(){
                    //修改下样式
                    $(".top-right-fullScreen").click();
                    $('.reader-page').css({border: 0});
                    $('.reader-container').css({border: 0});
                    window.print();
                }, 3000)
            }
        }, 500);
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
});