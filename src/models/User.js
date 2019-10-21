const { Schema, model } = require("mongoose");
const bcrypt = require('bcryptjs');

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true,
      select : false
    },
    socket: {
      type: String
    }
  },
  {
    timestamps: true 
  }
);

UserSchema.pre('save' , async function(next){
    const hash =  await bcrypt.hash(this.password , 10); //(10 = quantas vezes vai encriptar)
    this.password = hash;

    next();
})
module.exports = model("User", UserSchema);
