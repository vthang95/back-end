const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  email: { type: String, unique: true };
  password: String,
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
userSchema.pre('save', (next) => {
  // TODO: 
  next();
}); 

/**
 * Helper method for validating user's password
 */
userSchema.method.comparePassword = (candidatePassword, callback) => {
  // TODO: bcrypt compare
};


module.exports = mongoose.model('User', userSchema);