//함수 호출 시간 측정
var check = function() {};

var array = new Array(1000000);
for(var i=0; i<array.length; i++) {
  array[i] = i+1;
}

var start = Date.now();
array.forEach(check);
var end = Date.now();

console.log("호출 시간 : ", end-start);
