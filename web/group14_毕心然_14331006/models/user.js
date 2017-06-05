var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;  
  
var UserSchema = new Schema({
    username: String,
	password: String,
	number: String,
	tel: String,
	email: String  
});

module.exports = mongoose.model('User', UserSchema);