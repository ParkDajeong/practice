const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { User } = require("./models/User");
const { auth } = require("./middleware/auth");

const config = require("./config/key");

// body-parser: 클라이언트에서 오는 정보를 서버에 전달할 수 있도록 분석해주는 역할
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());

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
  user.save((err, doc) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.status(200).json({
      success: true,
    });
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

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
