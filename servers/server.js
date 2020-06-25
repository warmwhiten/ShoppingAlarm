const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/dev');
const admin = require('firebase-admin');
const serviceAccount = require('./shoppingalarmpush-firebase-adminsdk-gmdb8-a2ed9f0601');

const {item} = require ("./models/Item");
const {auth} = require("./middleware/auth");
const {User} = require("./models/User");
const { getItem } = require("./crawling/crawlDaewonshop.js");
const cron = require("node-cron");
const Item = require('./models/Item');


app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());
app.use(cookieParser());

//DB connect
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology:true, useCreateIndex: true, useFindAndModify: false
}).then(()=> console.log('conneted'))
.catch(err => console.log('fail'))

//push notification
app.get('/:token',function(req,res){
    const message = {
        data: {
          score: '850',
          time: '2:45'
        },
        token: req.params.token,
    };
    
    admin.messaging().send(message)
    .then((response) => {
        // Response is a message ID string.
        console.log('Successfully sent message:', response);
    })
    .catch((error) => {
        console.log('Error sending message:', error);
    });
});


//firebase 
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://fir-test-ceff6.firebaseio.com'
});

//Batch crawling
async function handleAsync() {
    const item = await getItem();
    return item;
  }
  
  cron.schedule("*/2 * * * *", async () => {
    console.log("running a task every two minutes");
    var item = await handleAsync();
    if (item.isSoldout == "입고"){
        const temp = new Item(item)
        temp.save((err, doc)=> {
            if(err) console.log(err)
        })
    }
  });

// 입고 내역 조회
app.get('/api/items', (req, res)=> {
    Item.find(function(err, items){
        if(err) return res.status(500).send({error: 'database failure'});
        res.json(items);
    })
})

// 입고 내역 추가
app.post('/api/items', function(req, res){
    var item = new Item();
    item.title = req.body.title;
    item.isSoldout = req.body.isSoldout;
    item.url = req.body.url;

    item.save(function(err){
        if(err){
            console.error(err);
            res.json({result: 0});
            return;
        }

        res.json({result: 1});

    });
});

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