// sort()를 이용하여 엘리먼트 값을 역순으로 정렬.
var value = [101, 26, 7, 1234];

value.sort(function(one, two) {
  return two - one;
});

console.log(value.join(", "));
