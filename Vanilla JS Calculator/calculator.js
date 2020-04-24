var expression = document.getElementById('operations');
var insert = document.getElementById('result');
var flag = true;
var last = '';

function click_numBtn() {
    var type = this.className;
    if(type.indexOf('numBtn') > -1){
        var child = this.getElementsByTagName('p');
        if(last == '=') {
            expression.value = '';
        }
        if(flag == true || insert.value == '0'){
            insert.value = child[0].innerText;
        } else {
            insert.value += child[0].innerText;
        }
        flag = false;
    }
}

function allClear() {
    expression.value = '';
    insert.value = '0';
    flag = true;
}

function clearEntry() {
    insert.value = '0';
    flag = true;
}

function operations() {
    if(this.className.indexOf('opBtn') > -1) {
        var op = this.getElementsByTagName('p');
        var la = expression.value.slice(-1);
        last = op[0].innerText;
        if(flag == true && (la == '+' || la == '-' || la == 'X' || la == '/')) {
            expression.value = expression.value.substr(0, expression.value.length-1);
            expression.value += last;
            return;
        }
        expression.value += insert.value + last;
        flag = true;
    } else if(this.id == 'equals') {
        var str = expression.value + insert.value;
        last = '=';
        var r_value = eval(str.replace(/X/gi, "*"));
        if(Number.isSafeInteger(r_value)) {
            insert.value = r_value;
        } else {
            insert.value = 'ERROR';
        }
        expression.value = str + last;
        flag = true;
    }
}

var btns = document.getElementsByClassName('btn');
for(i=0; i<btns.length; i++){
    btns[i].addEventListener('click', click_numBtn);
    btns[i].addEventListener('click', operations);
}
