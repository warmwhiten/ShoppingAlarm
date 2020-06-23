const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const config = require('./config/dev');
const {User} = require("./models/User")

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology:true, useCreateIndex: true, useFindAndModify: false
}).then(()=> console.log('conneted'))
.catch(err => console.log('fail'))


app.get('/', (req, res) => res.send('Hello'))

app.post('/register', (req, res) => {
    //회원가입 시 필요한 정보를 client에서 가져오면 데이터베이스에 넣음
    
    const user = new User(req.body)
    user.save((err, doc) => {
        if(err) return res.json({success: false, err})
        return res.status(200).json({
            success: true
        })
    })
})

app.listen(port, ()=> console.log('exmple app listening on port \${port}'))