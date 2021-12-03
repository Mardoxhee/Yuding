const crypto = require("crypto");
const Account = require("./../models/accountModel");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = async (req, res) => {
  try {
    const newAccount = await Account.create({
      lastName: req.body.lastName,
      firstName: req.body.firstName,
      phone: req.body.phone,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      role: req.body.role,
    });

    const token = signToken(newAccount._id);
    res.status(201).json({
      status: "Account created successfully !",
      token,
      data: {
        newAccount,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1) check if email and password exist

    if (!email || !password) {
      return res.status(400).json({
        status: "failed",
        message: "mention a email and a password",
      });
    }

    const account = await Account.findOne({ email }).select("+password");
    if (
      !account ||
      !(await account.correctPassword(password, account.password))
    ) {
      return res
        .status(401)
        .json({ status: "failed", message: "incorrect mail or password" });
    }
    console.log(account);
    // 3) if every thing is ok, then send the token to the client and

    const token = signToken(account._id);
    res.status(200).json({
      status: "connected to the platform",
      token,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};
