// ==UserScript==
// @name         百度文库界面清理
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  清除百度文库界面上多余节点，给你一个清爽的阅读环境
// @author       You
// @match        http://wenku.baidu.com/*
// @match        https://wenku.baidu.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var content = document.getElementById('reader-container-inner-1');

    var para = document.createElement("div");
    para.innerHTML = '<div style="position:fixed;left:10px;top:50px;border:solid 2px red;padding:10px;z-index:999;" id="mmPrint">清理界面</div>';
    document.body.appendChild(para);

    document.getElementById("mmPrint").onclick = function() {
        //删除兄弟节点,删除父节点的兄弟节点
        removeBrother(content);
        //点击全屏按钮
        document.getElementsByClassName('top-right-fullScreen')[0].click();
        //去掉浮动导航栏
        document.getElementsByClassName('fix-searchbar-wrap')[0].remove();
    };

    function removeBrother(elm) {
        if (elm === null || elm.parentNode === null || elm === document.body) {
            return;
        }
        var p = elm.parentNode.children;
        for (var i = 0, pl = p.length; i < pl; i++) {
            if (p[i] !== elm && p[i].tagName.toLowerCase() !== "script")
                p[i].innerHTML = "";
        }
        removeBrother(elm.parentNode);
    }
})();
