// 获取源码中定义的所有 DOM 节点
var layer = document.getElementById('secure-backdoor-layer');
var iframe = document.getElementById('secure-iframe-target');
var panicBar = document.getElementById('panic-hover-bar');
var gameZone = document.getElementById('secret-game-zone');
var calcWrapper = document.getElementById('calculator-wrapper');
var display = document.getElementById('display');

// 计算器基础运行逻辑
var inputSequence = "";

function pressCalc(num) {
    if (display.innerText === "0") display.innerText = "";
    display.innerText += num;
    
    // 🚨 核心黑科技：密码监听。这里会暗中记录你敲击的数字
    inputSequence += num;
    if (inputSequence.includes("12910")) {
        unlockSecretZone();
    }
}

function clearCalc() { 
    display.innerText = "0"; 
    inputSequence = ""; 
}

function calculate() {
    try { 
        display.innerText = eval(display.innerText); 
    } 
    catch(err) { 
        display.innerText = "Error"; 
    }
    inputSequence = ""; // 清空密码流
}

// 解锁暗门函数
function unlockSecretZone() {
    calcWrapper.style.display = "none"; // 隐藏计算器
    gameZone.style.display = "block"; // 显示隐藏的游戏区
    inputSequence = "";
}

// 同页面原地全屏打开函数（已补全并闭合源码中缺失的代码）
function openSiteInside(targetUrl) {
    if (!targetUrl) return; // 过滤空的 none 链接
    iframe.src = targetUrl; 
    layer.style.display = 'block'; 
    panicBar.style.display = 'block'; 
    setTimeout(function() {
        iframe.focus();
        if (iframe.contentWindow) {
            iframe.contentWindow.focus();
        }
    }, 100);
}

// 紧急安全跑路功能：点击顶部隐形条切回计算器界面
function forceReturnToHome() {
    iframe.src = ""; 
    layer.style.display = 'none'; 
    panicBar.style.display = 'none'; 
    gameZone.style.display = "none";
    calcWrapper.style.display = "block"; 
    display.innerText = "0";
    inputSequence = "";
}
