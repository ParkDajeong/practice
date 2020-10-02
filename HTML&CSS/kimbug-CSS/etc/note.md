# etc

## box-shadow

- h-offset: x축을 기준으로 얼마나 이동시킬 것인지
- v-offset: y축을 기준으로 얼마나 이동시킬 것인지
- blur: 흐린 정도
- spread: 그림자 사이즈(퍼지는 정도) \* color: 색상

## transform

- transform 관련 함수들은 모두 요소의 원래 위치를 기억하고 있기때문에, 주변 요소에 절대 영향을 주지 않는다.
- 변형될 때 모두 자기 자신을 기준으로 함.
- scale() 값을 1개만 사용할 수도 있고, x, y 따로 줄 수도 있음.
- rotate(Ndeg) --> deg를 꼭 써줘야 한다.

<br>

# Selector

- 형제 선택자
  - ~ : 다음에 오는 **<u>모든</u>** 같은 레벨 요소를 선택
  - \+ : 바로 다음에 오는 같은 레벨의 요소 **<u>한 개만</u>** 선택
- 구조적 가상 클래스 선택자 (Structural Pseudo-classes)
  - :first-child
  - :last-child
  - :nth-child(n) - 정수뿐만 아니라, 2n(짝수)이나 2n-1(홀수)로도 표현 가능
- 동적 가상 클래스 선택자 (User Action Pseudo-classes)
  - :hover
  - :focus
  - :active
