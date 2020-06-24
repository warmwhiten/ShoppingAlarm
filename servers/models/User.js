const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
//salt의 글자 수
const saltRounds = 10; 

var jwt = require('jsonwebtoken');


const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    role: {
        type: Number,
        default : 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp:{
        type: Number
    }   
})

userSchema.pre('save', function(next){

    var user = this;
    //암호화

    if(user.isModified('password')){
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err)
    
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err)
                user.password = hash
                next()
            })
        })
    } else{
        next()
    }

})

userSchema.methods.comparePassword = function(plainPassword, cb){
    // 비밀번호와 db에 암호화된 비밀번호 맞는지 여부 체크. 복호화 X
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err)
        cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function(cb){
    var user = this;
    
    //json web token으로 토큰 생성
    var token = jwt.sign(user._id.toHexString(), 'Token')

    user.token = token
    user.save(function(err, user){
        if(err) return cb(err)
        cb(null, user)
    })
}

userSchema.statics.findByToken = function(token, cb){
    var user = this;
    // 토큰 decode
    jwt.verify(token, 'Token', function(err, decoded) {
        //유저아이디를 이용해 유저 찾고, 클라이언트에서 가져온 토큰과
        //DB토큰이 일치하는지 확인

        user.findOne({"_id": decoded, "token": token}, function(err, user){
            if(err) return cb(err);
            cb(null, user);
        })
    })
}


const User = mongoose.model('User', userSchema)

module.exports = {User}