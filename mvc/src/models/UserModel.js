const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  email: { type: String, lowerCase: true, unique: true },
  password: { type: String, required: true },
  username: { type: String },
  uid : { type : Number, unique : true },
  role: String,
  passwordResetToken: String,
  passwordResetExpires: Date,

  facebook: String,
  twitter: String,
  google: String,
  github: String,
  instagram: String,
  linkedin: String,
  steam: String,
  tokens: Array,

  profile: {
    name: String,
    gender: String,
    location: String,
    website: String,
    picture: String
  },

  interaction: {
    likesGiven: Number,
    likesReceive: Number,
    comments: Number
  }
}, { timestamps: true });

/**
 * Password hash middleware
 */
userSchema.pre('save', function save(next) {
  const user = this;
  if (!user.isModified('password')) return next();
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
        user.password = hash;
        next();
    });
  });
}); 

/**
 * Helper method for validating user's password
 */
userSchema.methods.comparePassword = (candidatePassword, hash, callback) => {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    callback(err, isMatch);
  })
};

module.exports = mongoose.model('User', userSchema);