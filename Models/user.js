const mongoose = require('mongoose');
const bcrypt=require('bcryptjs');


const Schema = mongoose.Schema;

const UserSchema=new Schema({
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true}
})

UserSchema.methods.encryptPassword=function(password){
    return bcrypt.hashSync(password, bcrypt.genSalt(6));
}

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById=function(Id, callback){
    User.findById(Id, callback);
}

module.exports.getUserByUsername=function(username, callback){
    User.findOne({email:username}, callback);
}

module.exports.addUser=function(user, callback){
    bcrypt.genSalt(8, (err, salt)=>{
        bcrypt.hash(user.password, salt, (err, hash)=>{
            if(err) throw err;
            user.password=hash;
            user.save(callback);
        })
    })
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
      if(err) return res.json({success: false, msg: 'Wrong password', error:err});
      callback(null, isMatch);
    });
  }