const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    age: Number,
    tokens: [],
    role: String,
    // role:{
    //     type:String,
    //     default:'user'
    // },
    orderIds: [{ type: ObjectId, ref: "Order" }],
    wishList: [{ type: ObjectId, ref: 'Product' }],
  },
  { timestamps: true }
);

UserSchema.methods.toJSON = function () {
  const user = this._doc;
  delete user.tokens;
  delete user.password;
  return user;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
