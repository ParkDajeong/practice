const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trum: true,
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

// pre() => schema를 저장하기 전에 먼저 무언가를 처리하고 싶을 때 사용.
// next() => 첫번째 인자로 들어간, 여기서는 save()를 실행.
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
  const token = jwt.sign(user._id.toHexString(), "secretToken");

  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

userSchema.statics.findByToken = function (token, cb) {
  let user = this;

  //토큰을 decode 한다.
  jwt.verify(token, "secretToken", function (err, decoded) {
    user.findOne({ _id: decoded, token: token }, function (err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};

const User = mongoose.model("user", userSchema);

// 다른 곳에서도 쓸 수있도록 export
module.exports = { User };
