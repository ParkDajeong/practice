import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import Auth from "./hoc/auth";

export default function App() {
  return (
    <Router>
      <div>
        <nav></nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          {/* 아래처럼 <Route> 컴포넌트 안에 포함하는 것도 가능.. */}
          {/* <Route exact path="/"> <LandingPage /> </Route> */}

          {/* Auth(HOC) 로 컴포넌트를 감싸서 사용. */}
          {/* admin user만 들어가게 하고 시으면 true 로 넘기면 됨. */}
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
        </Switch>
      </div>
    </Router>
  );
}
