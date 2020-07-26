// Reducer : action으로 인해서 state가 어떻게 변하는지 보여주고, 변경된 state를 리턴해준다.
// 따라서 user에 관한 것만 모아놓은 user Reducer, comment Reducer 등 여러개의 Reducer가 존재할 수 있음.
// ==> combineReducers 를 통해 하나로(여기선 rootReducer) 합쳐서 이용.

import { combineReducers } from "redux";
import user from "./user_reducer";

const rootReducer = combineReducers({
  user,
  // 여기에 다른 reducer을 추가하면 combineReducers()가 하나로 합쳐줌.
});

export default rootReducer;
