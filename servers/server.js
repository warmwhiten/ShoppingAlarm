const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/dev');

const {auth} = require("./middleware/auth");
const {User} = require("./models/User");

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());
app.use(cookieParser());
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology:true, useCreateIndex: true, useFindAndModify: false
}).then(()=> console.log('conneted'))
.catch(err => console.log('fail'))


app.get('/', (req, res) => res.send('Hello'))

app.post('/api/users/register', (req, res) => {
    //회원가입 시 필요한 정보를 client에서 가져오면 데이터베이스에 넣음
    
    const user = new User(req.body)
    user.save((err, doc) => {
        if(err) return res.json({success: false, err})
        return res.status(200).json({
            success: true
        })
    })
})

app.post('/api/users/login', (req, res)=> {
    //요청된 이메일 db에서 찾음
    User.findOne({email:req.body.email}, (err, user) =>{
        if(!user){
            return res.json({
                loginSuccess:false,
                message: "이메일에 해당하는 유저가 없습니다."
            })
        }

        //이메일이 db에 있다면 비밀번호 확인
        user.comparePassword(req.body.password, (err, isMatch) =>{
            if(!isMatch) return res.json({loginSuccess: false, message:"비밀번호가 틀렸습니다."})
           
            //비밀번호도 맞다면 토큰 생성
            user.generateToken((err, user)=>{
                if(err) return res.status(400).send(err);
    
                //토큰을 쿠키에 저장
                res.cookie("x_auth", user.token)
                .status(200)
                .json({loginSuccess: true, userId: user._id})
            })
        })
    })    
})

app.get('/api/users/auth', auth, (req, res)=> {
    // 진입시 authetication true
    res.status(200).json({
        _id : req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        role: req.user.role,
        image: req.user.image
    })
})

app.get('/api/users/logout', auth, (req, res)=> {
    User.findOneAndUpdate({_id: req.user._id},
        {token:""}, 
        (err, user)=>{
        if(err) return res.json({success:false, err});
        return res.status(200).send({
            success:true
        })
    })
})


app.listen(port, ()=> console.log('exmple app listening on port \${port}'))