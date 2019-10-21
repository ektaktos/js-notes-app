var ObjectId = require('mongodb').ObjectID;
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var key = require('../key.js');
var validateToken = require('../middleware.js').checkToken;

module.exports = function(app,db){

    app.post('/register', (req,res) =>{
        var hashedPassword = bcrypt.hashSync(req.body.password, 8);
        var user = {'name': req.body.fullname, 'email': req.body.email, 'phone': req.body.phone, 'password': hashedPassword}
        db.collection('users').insertOne(user, (err,user) => {
            if (err) {
                res.status(500).send({'error':"An error has occoured while registering the user"});
            }else{
                var token = jwt.sign({id: user._id}, key.secret, {expiresIn: 86400 , issuer:'https://safelybuy.com'});
                res.status(200).send({'token': token, 'id':user._id});
            }
        });
    });

    app.post('/login', (req,res) =>{
        var email = req.body.email;
        var password = req.body.password;
        db.collection('users').findOne({email: email}, (err,user) => {
            if (!err && user) {
                bcrypt.compare(password, user.password).then(match =>{
                    if (match) {
                        const payload = {email: user._id};
                        const options = {expiresIn:'1d', issuer:'https://safelybuy.com'};
                        const secret = key.secret;
                        const token = jwt.sign(payload,secret,options);
                        res.status(200).send({result: user, token: token});
                    }else{
                        res.status(401).send({error: 'Authentication Error'})
                    }
                }).catch(err => {
                    res.status(500).send({error: err})
                });
            }else{
                res.status(404).send({error: err, message:'Error logging in'})
            }
        });
    });

    app.get('/allnotes', validateToken, (req,res) => {
        db.collection('notes').find({}).toArray((err,items) => {
            if (err) {
                res.send({'error':'An Error Occoured while fetching'});
            } else {
                res.send(items);
            }
    });
    });

    app.get('/notes/:id', validateToken,(req,res) => {
        const id = req.params.id;
        const details = {'_id':new ObjectId(id)};
        db.collection('notes').findOne(details,(err,item) => {
            if (err) {
                res.send({'error':'An error has occoured'});
            } else {
                res.send(item);
            }
        });
    });

    app.post('/notes', validateToken, (req,res) => {
        const note ={'title':req.body.title, 'body':req.body.body};
        db.collection('notes').insertOne(note, (err,result) => {
            if(err){
                res.send({'error':"An error has occoured"});
            }else{
                res.send(note);
            }
        });
        
    });

    app.delete('/notes/:id', validateToken,(req,res) => {
        const id = req.params.id;
        const details = {'_id':new ObjectId(id)};
        db.collection('notes').remove(details, (err,item) => {
            if (err) {
                res.send({'error':'An error has occoured' + id});
            } else {
                res.send('Note ' + id + ' deleted');
            }
        });
    });

    app.put('/notes/:id', validateToken, (req,res) => {
        const id = req.params.id;
        const details ={'_id':new ObjectId(id)};
        const note = {body: req.body.body, title:req.body.title};
        db.collection('notes').update(details, note, (err,result) => {
            if (err) {
                res.send({'error':'An error has occured'});
            } else {
                res.send(note);
            }
        });
    });
};