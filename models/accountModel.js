const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const accountSchema = new mongoose.Schema({
  lastName: {
    type: String,
    required: [true, "an account must have a lastName"],
  },
  firstName: {
    type: String,
    required: [true, "an account must have a firstName"],
  },

  email: {
    type: String,
    required: [true, "please provide a mail "],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "please provide a valid mail"],
  },
  phone: {
    type: String,
    unique: true,
    required: [true, "An account has to have a phone number"],
    validate: [validator.isMobilePhone, "please provide a good phone number"],
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin", "moderator"],
  },
  password: {
    type: String,
    required: [true, "an account must have a password"],
    minlength: [10, "a minimum of 10 characters"],
    select: false,
  },
  DateOfBirth: {
    type: Date,
  },
  passwordConfirm: {
    type: String,
    required: [true, "must confirm the password when signup"],
    minlength: [10, "a minimum of 10 characters"],
    select: false,
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "password are not the same",
    },
  },
  photo: {
    type: String,
    required: [false, "optional"],
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
});

accountSchema.pre("save", async function (next) {
  // will be runned if password was actually modified
  if (!this.isModified("password")) return next();

  // //   password hash function

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

accountSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
});

accountSchema.methods.correctPassword = async function (
  candidatePassword,
  accountPassword
) {
  return await bcrypt.compare(candidatePassword, accountPassword);
};

accountSchema.methods.chagedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    console.log(changedTimestamp, JWTTimestamp);
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

accountSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  console.log({ resetToken }, this.passwordResetToken);
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

// declaration du model
const Account = mongoose.model("Account", accountSchema);
module.exports = Account;
