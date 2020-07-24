const express = require("express");
// express() 함수를 이용하여 새로운 app 생성.
const app = express();
const port = 5000;

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { User } = require("./models/User");
const { auth } = require("./middleware/auth");

const config = require("./config/key");

// body-parser:
// 클라이언트 POST request data의 body로부터 편리하게 파라미터 추출을 할 수 있도록 도와주는 역할.
// 하지만, Express v.4.16.0 부터 body-parser의 일부 기능이 내장됨.
// 따로 body-parser를 import 하지 않고, 아래처럼 사용 가능. ( https://backback.tistory.com/336 )

// app.use(express.json());  ==> json 타입을 가져올 수 있게 도와주는..
// app.use(express.urlencoded({ extended: true }));  ==> 이건 url 관련
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());

// mongoose 는 Node.js 와 MongoDB를 위한 ODM(Object Data Mapping) 라이브러리.
const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

//

// "/" 페이지에 들어가면 response.send() 메서드 안에 있는 내용 출력.
app.get("/", (req, res) => res.send("Hello, World~ 안녕하세요~~ 감사해요~ 잘있어요~"));

app.get("/api/hello", (req, res) => {
  res.send("안녕하세요.");
});

//

// *** 회원 가입 라우터 ***
app.post("/api/users/register", (req, res) => {
  // body-parser를 이용하여
  // request.body 안에 json의 형태로 client가 보낸 데이터 전달.
  const user = new User(req.body);

  // sava()는 mongodb 메서드
  user.save((err, userInfo) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.status(200).json({ success: true });
  });
});

//
// *** 로그인 라우터 ***
app.post("/api/users/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다.",
      });
    }

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다.",
        });
      }

      // 비밀번호까지 맞다면 토큰 생성
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        // 토큰을 저장한다. 어디에? => 쿠키, 로컬스토리지, 세션...
        res
          .cookie("x_auth", user.token) //
          .status(200)
          .json({
            loginSuccess: true,
            userId: user._id,
          });
      });
    });
  });
});

//
// *** 인증 라우터 ***
app.get("/api/users/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});

//
// *** 로그아웃 라우터 ***
app.get("/api/users/logout", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id }, //
    { token: "" },
    (err, user) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true,
      });
    }
  );
});

// 해당 포트 번호로 통신이 성공하면 콘솔 출력.
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
