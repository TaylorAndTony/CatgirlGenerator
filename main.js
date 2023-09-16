var finalResultCache = "";
var finalResultCache2 = "";

function reverseString(s) {
    return s.split("").reverse().join("");
}

function wrapWithUnideoce(s, reverse = true) {
    return reverse ? "\u2067" + reverseString(s) + "\u2066"
        : "\u2067" + s + "\u2066";
}

function copy(str) {
    var save = function (e) {
        e.clipboardData.setData('text/plain', str); // 剪贴板内容设置
        e.preventDefault(); // 阻止默认行为
    }
    document.addEventListener('copy', save);
    document.execCommand("copy"); // 执行 copy 操作
    document.removeEventListener('copy', save);
}

function getValidateStr(s) {
    // basically convert s into hex string under utf-8
    let result = "";
    for (let i = 0; i < s.length; i++) {
        let hex = s.charCodeAt(i).toString(16);
        // zero padding
        while (hex.length < 4) {
            hex = '0' + hex;
        }
        result += 'U+' + hex + ' ';
    }
    return result;
}

function generateThenUpdate() {
    let prefix = $("#prefix").val();
    let suffix = $("#suffix").val();
    finalResultCache = prefix + wrapWithUnideoce(suffix);
    finalResultCache2 = prefix + wrapWithUnideoce(suffix, false);
    console.log(finalResultCache);
    console.log(finalResultCache2);
    $("#result").val(finalResultCache);
    $("#result2").val(finalResultCache2);
    $("#validate").val(getValidateStr(finalResultCache));
}

function reverseThenUpdate() {
    let input = $("#r-in").val();
    let output = reverseString(input);
    $("#r-out").val(output);
}

function generateTeplateThenUpdate() {
    let input = $("#t-in").val();
    input = input.replace(/#r/g, '\u2067');
    input = input.replace(/#l/g, '\u2066');
    $("#t-out").val(input);
}

$(document).ready(function () {
    $('#prefix').bind('input propertychange', function () {
        generateThenUpdate();
    });
    $('#suffix').bind('input propertychange', function () {
        generateThenUpdate();
    });
    $('#r-in').bind('input propertychange', function () {
        console.log("r-in");
        reverseThenUpdate();
    });
    $('#t-in').bind('input propertychange', function () {
        generateTeplateThenUpdate();
    });
    $("#generate").click(function () {
        generateThenUpdate();
        copy(finalResultCache);
    });
    $("#copy").click(function () {
        copy(finalResultCache);
    });
    $("#copy2").click(function () {
        copy(finalResultCache2);
    });
    $('#r-copy').click(function () {
        console.log("r-copy");
        copy($("#r-out").val());
    });
    $('#t-copy').click(function () {
        copy($("#t-out").val());
    });
});