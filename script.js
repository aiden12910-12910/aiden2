// 获取源码中定义的所有 DOM 节点
var layer = document.getElementById('secure-backdoor-layer');
var iframe = document.getElementById('secure-iframe-target');
var panicBar = document.getElementById('panic-hover-bar');
var gameZone = document.getElementById('secret-game-zone');
var calcWrapper = document.getElementById('calculator-wrapper');
var display = document.getElementById('display');

// 核心配置
var inputSequence = "";
var TARGET_PASSWORD = "12345"; // 👈 密码已在此修改为 12345

// 统一的密码校验器
function checkPassword(newChar) {
    inputSequence += newChar;
    // 保持监听序列长度不超过密码长度
    if (inputSequence.length > TARGET_PASSWORD.length) {
        inputSequence = inputSequence.slice(-TARGET_PASSWORD.length);
    }
    // 触发暗门
    if (inputSequence === TARGET_PASSWORD) {
        unlockSecretZone();
    }
}

// 1. 鼠标点击计算器逻辑
function pressCalc(num) {
    if (display.innerText === "0") display.innerText = "";
    display.innerText += num;
    checkPassword(num);
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
    inputSequence = ""; 
}

// 2. 🚨 新增：键盘全局盲敲监听逻辑
document.addEventListener('keydown', function(event) {
    // 只捕捉 0-9 的数字键（包含大键盘和数字小键盘）
    if (event.key >= '0' && event.key <= '9') {
        // 如果当前还没解锁，把按下的数字同步显示到伪装计算器屏幕上，显得更真实
        if (calcWrapper.style.display !== "none") {
            if (display.innerText === "0") display.innerText = "";
            display.innerText += event.key;
        }
        // 送入密码校验
        checkPassword(event.key);
    } 
    // 兼顾键盘常用操作
    else if (event.key === 'Enter') {
        calculate();
    } else if (event.key === 'Escape') {
        clearCalc();
    }
});

// 解锁暗门函数
function unlockSecretZone() {
    calcWrapper.style.display = "none"; // 隐藏计算器
    gameZone.style.display = "block"; // 显示隐藏的游戏区
    inputSequence = "";
}

// 同页面原地全屏打开函数
function openSiteInside(targetUrl) {
    if (!targetUrl) return; 
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

// 紧急安全跑路功能：点击顶部隐形条切回计算器
function forceReturnToHome() {
    iframe.src = ""; 
    layer.style.display = 'none'; 
    panicBar.style.display = 'none'; 
    gameZone.style.display = "none";
    calcWrapper.style.display = "block"; 
    display.innerText = "0";
    inputSequence = "";
}
