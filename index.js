const express = require('express');
const bodyParser = require('body-parser');
const User = require('./user');
const app = express();

const users = [];

const sleep = function (ms) {
    return new Promise((res)=> {    
        setTimeout(res, ms)
    });
}

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', function(req, res, next) {
    res.send("hi");
})

app.get('/delay', async function(req, res, next) {
    await sleep(10000)
    res.send("hi");
})

app.get('/attendance', async function(req, res, next) {
    res.send(users);
})


app.get('/attendance/delay', async function(req, res, next) {
    await sleep(10000);
    res.send(users);
})

app.post('/attendance', async function(req, res, next) {
    const group = req.body.group;
    const name = req.body.name;
    if(group == null){
        res.status(400)
        res.send('group not found')
        return;
    }
    if(name == null){
        res.status(400)
        res.send('name not found')
        return;
    }
    const user = new User({group, name});
    users.push(user);
    res.send('ok');
})

app.listen(9999, function(){
    console.log('server started')
});