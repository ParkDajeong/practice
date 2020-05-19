var DAYS_OF_WEEK = 7;

var yoil = [ "일", "월", "화", "수", "목", "금", "토" ];
var dal = [ "1월", "2월", "3월", "4월", "5월", "6월", "7월",
            "8월", "9월", "10월", "11월", "12월" ];

var today = new Date();
var cal = new Date();
var table = document.getElementById("calendar");

//달 이동
function move_month(num) {
    cal.setDate(cal.getDate());
    cal.setMonth(cal.getMonth() + num);
    table.removeChild(table.getElementsByTagName("tbody")[0]);
    create_calendar();
}

//캘린더 생성
function create_calendar() {
    var year = cal.getFullYear();
    var month = cal.getMonth(); //0~11 반환
    var date = cal.getDate();

    var firstDay = new Date(year, month, 1);
    var lastDay = new Date(year, month+1, 0);

    var info = document.getElementById("info");
    info.innerHTML = cal.getFullYear() + "년 " + dal[cal.getMonth()];

    var n = 0;
    var tbody = table.createTBody();
    var row = firstDay.getDay()===0 ? null : tbody.insertRow();
    for(var i=0; i<firstDay.getDay(); i++) {
        row.insertCell(i);
        n++;
    }

    for(var i=1; i<=lastDay.getDate(); i++) {
        var d = new Date(year, month, i).getDay();
        //일주일이 지나면 행 추가
        if(n%7 == 0){
            row = tbody.insertRow();
        }
        var cell = row.insertCell();
        cell.innerHTML = i;
        cell.addEventListener("click", clickDate);

        if(i === today.getDate()) {
            cell.click();
        }

        //토요일, 일요일 색깔 표시
        if(d === 0){
            cell.classList.add("sunday");
        }else if(d === 6) {
            cell.classList.add("saturday");
        }
        n++;
    }
}

create_calendar();

//날짜 클릭 이벤트
function clickDate() {
    var td = table.getElementsByTagName("tbody")[0].getElementsByTagName("td");
    for(var i=0; i<td.length; i++) {
        if(td[i].classList.contains("active")){
            td[i].classList.remove("active");
        }
    }
    this.classList.add("active");
    showDate(this.innerText);
}

function showDate(d_num) {
    var date = document.getElementById("date");
    var day = document.getElementById("day");
    today = new Date(cal.getFullYear(), cal.getMonth(), d_num);

    day.innerHTML = yoil[today.getDay()] + "요일";
    date.innerHTML = d_num;

    if(today.getDay() === 0) {
        day.classList = "sunday";
        date.classList = "sunday";
    } else if(today.getDay() === 6) {
        day.classList = "saturday";
        date.classList = "saturday";
    } else {
        day.classList = "";
        date.classList = "";
    }
}
