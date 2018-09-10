const express = require('express');
const router = express.Router();
const passport=require('passport');
const expressValidator = require('express-validator');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');

const User=require('./Models/user');
const Panel=require('./Models/panel');
const config=require('./config/database');

router.get('/home', (req, res, next)=>{
    Panel.find().exec(function (err, panels) {
		if (err) { 
            res.json({error:err})
            return
        }
		res.json(panels);
	});
});

router.post('/register', function(req, res, next) {
    console.log(req.body);

	req.checkBody('email', 'not valid E-mail.').isEmail();
	req.checkBody('password', 'Password must be specified.').notEmpty();
    req.sanitize('email').trim();

    let errors = req.validationErrors();
	
	if (errors) {
        return res.send({error:errors});
    } 
    
	else {
        let user = new User({ 
        email:req.body.email, 
        password:bcrypt.hashSync(req.body.password, 10)
    });
        console.log(user.password);
        user.save((err)=>{
            if(err){
                console.log('not all good');
                res.json({success:false, msg:'Failed to register user'})
            }
            else{
                console.log('all good');
                res.json({success:true, msg:'User registered', user:user})
            }
        });
    }
});

router.post('/login', (req, res, next) => {
    const username = req.body.email;
    const password = req.body.password;
  
    User.getUserByUsername(username, (err, user) => {
      if(err) return res.status(500).json({error:err});
      if(!user){
        return res.json({success: false, msg: 'User not found'});
      }
  
      User.comparePassword(password, user.password, (err, isMatch) => {
        if(err) return res.json({error:err});
        if(isMatch){
          const token = jwt.sign({data: user}, config.secret, {
            expiresIn: 604800 // 1 week
          });
  
          res.json({
            success: true,
            token: 'JWT '+token,
            user: {
              id: user._id,
              email: user.email
            }
          });
        } else {
          return res.json({success: false, msg: 'Wrong password'});
        }
      });
    });
  });

router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    res.json({tokenIsValid: true});
});

router.post('/newpanel', passport.authenticate('jwt', {session:false}), function(req, res, next) {
    let panel = new Panel({ 
        author:req.body.author,
        url:req.body.url, 
        description:req.body.description
    });
        console.log(panel);
        panel.save((err)=>{
            if(err){
                console.log('not all good');
                res.json({success:false, msg:'Failed to save panel'})
            }
            else{
                console.log('all good');
                res.json({success:true, msg:'Panel saved', panel:panel})
            }
        });
});

module.exports = router;