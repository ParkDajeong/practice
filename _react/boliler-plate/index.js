const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const { User } = require("./models/User");

const config = require("./config/key");

// body-parser: 클라이언트에서 오는 정보를 서버에 전달할 수 있도록 분석해주는 역할
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

app.get("/", (req, res) => res.send("Hello, World~ 안녕하세요~~ 감사해요~"));

app.post("/register", (req, res) => {
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

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
