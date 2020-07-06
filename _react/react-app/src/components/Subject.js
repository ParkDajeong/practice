import React from "react"; //꼭 들어가야 함.

function Subject(props) {
  return (
    //컴포넌트를 만들 때, 하나의 최상위 태그만 사용해야 한다.
    <header>
      <h1>
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            props.onChangeMode("welcome");
          }}
        >
          {props.title}
        </a>
      </h1>
      {props.sub}
    </header>
  );
}

// 외부에서 사용할 수 있도록 export 해준다.
export default Subject;
