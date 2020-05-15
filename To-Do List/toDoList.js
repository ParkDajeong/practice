var input = document.getElementById("newTask");
var insertBtn = document.getElementById("insert");
var listBox = document.getElementById("list-box");

// 기본 테스크 추가
window.onload = function() {
    input.value = "GoodPlace 103 #1~6 쉐도잉";
    addTask();
    input.value = "to-do list 구현 마무리"
    addTask();
}

// ADD 버튼 활성화 함수
var activateBtn = function() {
   if(input.value.length == 0){
      insertBtn.disabled = "disabled";
   } else {
      insertBtn.disabled = "";
   }
};

// 엔터키로 테스크 등록
var enterTask = function(e) {
    if(e.keyCode == 13){
      insertBtn.click();
    }
};

// 클래스를 추가한 element 생성 후, 리턴
var makeElement = function(tagName, className) {
    var el = document.createElement(tagName);
    el.setAttribute("class", className);

    return el;
}

// 투두리스트에 테스크 추가
var addTask = function() {
    var todo = input.value;
    input.value = "";

    // <div class="list">
    var div_list = makeElement("div", "list");
    listBox.appendChild(div_list);

    // <div class="chkBox">
    var div_chkBox = makeElement("div", "chkBox");
    div_list.appendChild(div_chkBox);

    // <label>
    var label = document.createElement("label");
    div_chkBox.appendChild(label);

    // <input type="checkbox" class="check">
    var input_chk = makeElement("input", "check");
    input_chk.setAttribute("type", "checkbox");
    label.appendChild(input_chk);

    // <div class="to-do">
    var div_todo = makeElement("div", "to-do");
    div_todo.innerHTML = todo;
    div_list.appendChild(div_todo);

    // <div class="delete">
    var div_delete = makeElement("div", "delete");
    div_list.appendChild(div_delete);

    // <img src="icon/delete.png">
    var img = document.createElement("img");
    img.setAttribute("src", "icon/delete.png");
    div_delete.appendChild(img);

    // 이벤트 추가
    input_chk.addEventListener("click", completeTask);
    div_list.addEventListener("mouseover", showDeleteBtn);
    div_list.addEventListener("mouseout", showDeleteBtn);
    div_delete.addEventListener("click", deleteTask);
};

// 체크/체크 해제된 할 일 이동
var moveTask = function(doneTask, move) {
    if(move === "down"){
      listBox.appendChild(doneTask);
    } else {
      listBox.prepend(doneTask);
    }
}

// 할 일 완료 처리
var completeTask = function() {
    var label = this.parentNode;
    var task = label.parentNode.parentNode;
    var text = task.querySelector(".to-do");

    if(this.checked) {
      label.classList.add("checked");
      text.classList.add("complete");
      moveTask(task, "down");
    } else {
      label.classList.remove("checked");
      text.classList.remove("complete");
      moveTask(task, "up");
    }
};

// 삭제 아이콘 나타나기
var showDeleteBtn = function(e) {
    var img = this.getElementsByTagName("img")[0];

    if(e.type == "mouseover"){
      img.style.display = "inline-block";
    } else {
      img.style.display = "none";
    }
}

// 할 일 삭제
var deleteTask = function() {
    var parent = this.parentNode;
    parent.remove();
};

input.addEventListener("input", activateBtn);
input.addEventListener("keydown", enterTask);
insertBtn.addEventListener("click", addTask);
