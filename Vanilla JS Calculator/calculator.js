function click_numBtn() {
    var view = document.getElementById('result');
    var type = this.className;
    if(type.indexOf('numBtn') > -1){
        var child = this.getElementsByTagName('p');
        var text = view.value;
        view.value = text + child[0].innerText;
    }
}

function allClear() {
    var view = document.getElementById('result');
    view.value = "";
}

function clearEntry() {

}


var btns = document.getElementsByClassName('btn');
for(i=0; i<btns.length; i++){
    btns[i].addEventListener('click', click_numBtn);
}
