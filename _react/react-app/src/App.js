// {useState} 를 빼면, React.useState() 로 사용해야 한다.
import React, { useState } from "react";
import Subject from "./components/Subject";
import Navbar from "./components/Navbar";
import Content from "./components/Content";
import "./App.css";

// 최근에 리액트가 업데이트 되면서, 함수형 컴포넌트에서도 state를 관리할 수 있게 됨.
// 클래스 컴포넌트에서는 constructor을 사용하여 state를 관리.
function App() {
  // useState() 메소드는 length가 2인 배열을 반환한다.
  // 첫번째 요소 : state(함수 호출 시, 입력한 값이 초깃값)
  // 두번째 요소 : state를 변경할 수 있는 함수
  const [state, setState] = useState({
    subject: { title: "WEB!!", sub: "world wide web!" },
    contents: [
      { id: 1, title: "HTML", desc: "HTML is for information" },
      { id: 2, title: "CSS", desc: "CSS is for design" },
      { id: 3, title: "JavaScript", desc: "JavaScript is for interactive" },
    ],
  });

  return (
    <div className="App">
      <Subject title={state.subject.title} sub={state.subject.sub}></Subject>
      {/* <Subject title="React" sub="For UI"></Subject> */}
      <Navbar data={state.contents}></Navbar>
      <Content title="HTML" desc="HTML is HyperText Markup Language."></Content>
    </div>
  );
}

export default App;
