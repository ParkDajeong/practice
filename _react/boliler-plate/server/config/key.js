// DB 비밀번호 등이 포함되지 않도록, 따로 분리.
// 이 때, Local 환경에서는 파일에 직접 접근할 수 있지만,
// deploy(배포)한 후에는 사용하는 클라우드 등에서 따로 관리하기 때문에 분기 처리를 해준다.
// process.env.NODE_ENV --> 환경 변수
if (process.env.NODE_ENV === "production") {
  module.exports = require("./prod");
} else {
  module.exports = require("./dev");
}
