const { User } = require("../models/User");

let auth = (req, res, next) => {
  let token = req.cookies.x_auth;

  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({
        isAuth: false,
        error: true,
      });
    }

    req.token = token;
    req.user = user;
    // next()가 없으면 다음으로 넘어가지 않고,
    // middleware에 갇혀버린다.
    next();
  });
};

module.exports = { auth };
