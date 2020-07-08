/* useEffect => Life Cycle */
import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [funcShow, setFuncShow] = useState(true);
  const [classShow, setClassShow] = useState(true);

  return (
    <div className="container">
      <h1>Hello, World</h1>
      <button
        type="button"
        onClick={() => {
          console.log("Remove Func 클릭!");
          setFuncShow(false);
        }}
      >
        Remove Func
      </button>
      <button
        type="button"
        onClick={() => {
          console.log("Remove Class 클릭!");
          setClassShow(false);
        }}
      >
        Remove Class
      </button>
      {funcShow ? <FuncComp initNumber={2}></FuncComp> : null}
      {classShow ? <ClassComp initNumber={2}></ClassComp> : null}
    </div>
  );
}

const funcStyle = "color: slateblue";
let funcId = 0;
function FuncComp(props) {
  const [state, setState] = useState({
    number: props.initNumber,
    date: new Date().toString(),
  });

  useEffect(() => {
    console.log(`%cfunc => useEffect 초기작업 (=== componentDidMount) ${++funcId}`, funcStyle);
    document.title = state.number;

    return () => {
      // 이 함수는 나중에 소멸(unmount)될 때 실행된다.
      console.log(`%cfunc => useEffect 소멸 return (== componentWillUnmount) ${++funcId}`, funcStyle);
    };
  }, []); // 빈 배열을 넘기면, componentDidMount()의 작업만 수행 ==> component가 생성될 때, 딱 한번만 실행된다.

  // side effect가 생략된..
  // 리액트에서 main effect는 render() 를 수행하여 컴포넌트를 생성하는 것.
  // 즉, useEffect()는 그 외의 기타 부가적인 일들을 적당한 타이밍에 실행시키기 위해 사용한다.
  // class 컴포넌트의 componentDidMount(), componentDidUpdate() 를 합쳐놓은 것과 같다.
  useEffect(() => {
    console.log(`%cfunc => useEffect 숫자 (=== componentDidMount & componentDidUpdate) ${++funcId}`, funcStyle);
    document.title = state.number;

    // clean up(일종의 정리정돈 느낌..)
    // useEffect가 다시 실행될 때, 이전의 것을 정리하길 원한다면 return 값으로 함수를 넘겨주면 된다.
    return () => {
      console.log(`%cfunc => useEffect 숫자 return (== componentWillUnmount) ${++funcId}`, funcStyle);
    };
  }, [state.number]); //[state.number, state.date] 여러개도 가능.

  // useEffect() 여러개 사용 가능.
  // useEffect()의 두 번째 인자를 넣으면(배열로 넣어야 함), 해당되는 값의 변화를 감지하여 변화가 있을 때만 실행시킨다.
  useEffect(() => {
    console.log(`%cfunc => useEffect 날짜 (=== componentDidMount & componentDidUpdate) ${++funcId}`, funcStyle);
    document.title = state.date;

    return () => {
      console.log(`%cfunc => useEffect 날짜 return (== componentWillUnmount) ${++funcId}`, funcStyle);
    };
  }, [state.date]);

  console.log(`%cfunc => render ${++funcId}`, funcStyle);
  return (
    <div className="container">
      <h2>function style component</h2>
      {/* <p>Number : {props.initNumber}</p> */}
      <p>Number : {state.number}</p>
      <p>Date : {state.date}</p>
      <button
        type="button"
        onClick={() => {
          console.log("Func - Random 버튼 클릭");
          setState({
            ...state,
            number: Math.random(),
          });
        }}
      >
        Random
      </button>
      <button
        type="button"
        onClick={() => {
          console.log("Func - Date 버튼 클릭");
          setState({
            ...state,
            date: new Date().toString(),
          });
        }}
      >
        Date
      </button>
    </div>
  );
}

const classStyle = "color: forestgreen";
class ClassComp extends React.Component {
  state = {
    number: this.props.initNumber,
    date: new Date().toString(),
  };

  // component[Will/Did]Mount() => 컴포넌트가 처음 DOM에 생성될 때, 즉, 초기 작업을 할 때 사용.
  // 컴포넌트가 소멸될 때 필요한 처리 작업은 componentWillUnmount() 를 사용.
  // render 되기 전에 실행
  componentWillMount() {
    console.log("%cclass => componentWillMount", classStyle);
  }
  // render 된 후에 실행
  componentDidMount() {
    console.log("%cclass => componentDidMount", classStyle);
  }

  // redner 를 호출할 필요가 있냐 없냐를 판단
  shouldComponentUpdate() {
    console.log("%cclass => shouldComponentUpdate", classStyle);
    return true; // false 를 리턴하면 rerendering 하지 않음.
  }
  // updqte 전에 실행
  componentWillUpdate() {
    console.log("%cclass => componentWillUpdate", classStyle);
  }
  // update 후에 실행
  componentDidUpdate() {
    console.log("%cclass => componentDidUpdate", classStyle);
  }
  // component가 소멸될 때 실행(unmount)
  componentWillUnmount() {
    console.log("%cclass => componentWillUnmount", classStyle);
  }

  render() {
    console.log("%cclass => render", classStyle);
    return (
      <div className="container">
        <h2>class style component</h2>
        {/* <p>Number : {this.props.initNumber}</p> */}
        <p>Number : {this.state.number}</p>
        <p>Date : {this.state.date}</p>
        {/* 화살표 함수의 this는 언제나 상위 스코프의 this를 가리킨다. 즉, call(), apply(), bind() 를 사용할 수 없다.  */}
        {/* 화살표 함수를 사용하지 않는 경우, bind()를 사용하여 this를 지정해줘야 한다. */}
        <button
          type="button"
          onClick={() => {
            console.log("Class - Random 버튼 클릭");
            this.setState({ number: Math.random() });
          }}
        >
          Random
        </button>
        <button
          type="button"
          onClick={() => {
            console.log("Class - Date 버튼 클릭");
            this.setState({ date: new Date().toString() });
          }}
        >
          Date
        </button>
      </div>
    );
  }
}

export default App;
