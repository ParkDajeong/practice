// Reducer : state가 어떻게 변하는지 보여주고, 변경된 마지막 값을 리턴해준다.
// 따라서 user에 관한 것만 모아놓은 user Reducer, comment Reducer 등 여러개의 Reducer가 존재할 수 있음.
// ==> combineReducers 를 통해 하나로(여기선 rootReducer) 합쳐서 이용.

import { combineReducers } from "redux";
import user from "./user_reducer";

const rootReducer = combineReducers({
  user,
});

export default rootReducer;
