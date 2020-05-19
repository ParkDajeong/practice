//나누기 연산자
//NaN 반환
console.log(10 / "one");
console.log(0 / 0);
//분모, 분자가 0일 때
console.log(10 / 0);
console.log(0 / 10);

var odd = "";
var even = "";
for(var i=1; i<=50; i++) {
  if(i%2 == 0)
    even += i + " ";
  else
    odd += i + " ";
}

console.log("odd : ", odd);
console.log("even: ", even);
