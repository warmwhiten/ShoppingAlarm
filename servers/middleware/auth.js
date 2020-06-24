const {User} = require("../models/User")

let auth = (req, res, next) => {

    //인증처리

    //클라이언트 쿠키에서 토큰 가져온다
    let token = req.cookies.x_auth;

    // 토큰을 복호화한 후, 유저를 찾는다.
    User.findByToken(token, (err, user)=> {
            // 유저 없으면 인증 no
        if (err) throw err;
        if (!user) return res.js({isAuth:false, error: true})
         //유저 있으면 인증 okay
        req.token = token;
        req.user = user;
        next();
    })




}
module.exports = {auth}