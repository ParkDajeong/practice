const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

// mongose를 이용하여 schema 생성
const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

// pre() => DB 관련해서 특정 동작 실행 "이전"에 어떤 행동을 취할지 정의.
// post() => DB 관련해서 특정 동작을 실행한 "이후"에, 처리할 일을 정의.
userSchema.pre("save", function (next) {
  const user = this;

  // password가 변경됐을 때만 암호화되도록 설정.
  // 1234567 ==> "$2b$10$bOTX26ZkofQNHOZeWsK..OAGDwb.9cggzyXxHvEoKf6QPUcjzux5K" 로 암호화.
  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);

        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
  bcrypt.compare(
    plainPassword, //
    this.password,
    function (err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
    }
  );
};

userSchema.methods.generateToken = function (cb) {
  const user = this;

  // jsonwebtoken의 sign(payload, secretKey) 에서 payload는 String 이어야 함.
  // 하지만 mongoDB의 _id 는 String 타입이 아니므로,
  // mongoDB의 toHexString() 메서드를 이용하여 형변환을 시켜줘야 한다.
  // 참고 : https://velog.io/@bigbrothershin/Backend-MongoDB-메서드-ObjectID.toHexString
  const token = jwt.sign(user._id.toHexString(), "secretToken");

  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

userSchema.statics.findByToken = function (token, cb) {
  let user = this;

  //토큰을 decode 한다. (verify() 메서드)
  jwt.verify(token, "secretToken", function (err, decoded) {
    user.findOne({ _id: decoded, token: token }, function (err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};

// model()의 첫번째 인자가 schema명.
// 소문자로 변환 후, 복수형으로 바꾼 것이 schema 명이 된다. eX) User -> users
// 직접 명명하고 싶으면, 세번째 인자로 넘겨주면 된다.
const User = mongoose.model("User", userSchema);

// 다른 곳에서도 쓸 수있도록 export
module.exports = { User };
