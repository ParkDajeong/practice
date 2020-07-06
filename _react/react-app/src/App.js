// {useState} 를 빼면, React.useState() 로 사용해야 한다.
import React, { useState } from "react";
import Subject from "./components/Subject";
import Navbar from "./components/Navbar";
import ReadContent from "./components/ReadContent";
import CreateContent from "./components/CreateContent";
import Control from "./components/Control";
import "./App.css";

// 최근에 리액트가 업데이트 되면서, 함수형 컴포넌트에서도 state를 관리할 수 있게 됨.
// 클래스 컴포넌트에서는 constructor을 사용하여 state를 관리.
function App() {
  // useState() 메소드는 length가 2인 배열을 반환한다.
  // 첫번째 요소 : state(함수 호출 시, 입력한 값이 초깃값)
  // 두번째 요소 : state를 변경할 수 있는 함수
  const [state, setData] = useState({
    mode: "create",
    selected_content_id: 0,
    subject: { title: "WEB!!", sub: "world wide web!" },
    welcome: { title: "Welcome", desc: "Hello, React!!" },
    contents: [
      { id: 1, title: "HTML", desc: "HTML is for information" },
      { id: 2, title: "CSS", desc: "CSS is for design" },
      { id: 3, title: "JavaScript", desc: "JavaScript is for interactive" },
    ],
  });

  // 리액트에서는 state를 직접 수정하면 리렌더링이 안됨.
  // 클래스 => setState(), 함수형 => useState()에서 선언한 함수를 사용하여 state값 변경.
  // spread 연산자를 사용하여 기존 state 객체를 복사 후, 수정하고자 하는 요소를 업데이트하면 된다.
  // https://xiubindev.tistory.com/97
  const changeMode = (mode) => {
    setData({
      ...state,
      mode,
    });
  };

  // push()의 경우, 원본이 변경되기 때문에 새로운 배열을 반환해주는 concat()을 쓰는 것을 권장.
  // 리액트에선 state 값을 직접 변경하지 않기 때문.
  const addData = (title, desc) => {
    const id = state.contents.length + 1;
    const contents = state.contents.concat({ id, title, desc });
    setData({
      ...state,
      contents,
    });
  };

  // props나 state의 값이 바뀌면, 해당 component의(하위 포함) render()가 다시 호출
  let _title,
    _desc,
    _content = null;
  if (state.mode === "welcome") {
    _title = state.welcome.title;
    _desc = state.welcome.desc;
    _content = <ReadContent title={_title} desc={_desc}></ReadContent>;
  } else if (state.mode === "read") {
    const idx = state.selected_content_id - 1;
    _title = state.contents[idx].title;
    _desc = state.contents[idx].desc;
    _content = <ReadContent title={_title} desc={_desc}></ReadContent>;
  } else if (state.mode === "create") {
    _content = <CreateContent onSubmit={addData}></CreateContent>;
  }

  return (
    <div className="App">
      <Subject
        title={state.subject.title} //
        sub={state.subject.sub}
        onChangeMode={changeMode}
      ></Subject>
      <Navbar
        data={state.contents} //
        onChangePage={(id) => {
          setData({
            ...state,
            mode: "read",
            selected_content_id: id,
          });
        }}
      ></Navbar>
      <Control onChangeMode={changeMode}></Control>
      {_content}
    </div>
  );
}

export default App;
