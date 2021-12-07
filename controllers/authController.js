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

// protection function

exports.protect = async (req, res, next) => {
  try {
    // 1) get token and check existance
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return res.status(401).json({
        status: "failed",
        message: "you are  not logged, please login",
      });
    }

    // 2) token verification

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) check if account exists

    const currentAccount = await Account.findById(decoded.id);
    if (!currentAccount) {
      return res.status(401).json({
        staus: "failed",
        message: "the account belonging that token doesn't exixt",
      });
    }

    // 4) check if Account changed password after token issued
    if (currentAccount.changedPasswordAfter(decoded.iat)) {
      return res.status(401).json({
        status: "failed",
        message: "Account recently chenged password ! please log again",
      });
    }
    req.account = currentAccount;
    next();
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles is an array like ["admin", "moderator", "user"]
    if (!roles.includes(req.Account.role)) {
      return res.status(403).json({
        status: "failed",
        message: "you do not have permission to do this action",
      });
    }
    next();
  };
};

exports.forgotPassword = async (req, res, next) => {
  // 1) get Account based on posted email

  const account = await Account.findOne({ email: req.body.email });
  if (!account) {
    return res
      .status(404)
      .json({ messagestatus: "failed", message: "no account with this email" });
  }

  // 2) generate the random token for t

  const resetToken = account.createPasswordResetToken();
  await account.save({ validateBeforeSave: false });
  // Send it to account's email address
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/accounts/resetPassword/${resetToken}`;
  const message = `forgot your password? submit a PATCH request to your new password and passwordConfirm to : ${resetURL}.\n if you didn't forget it, plz ignore this message`;
  try {
    await sendEMail({
      email: account.email,
      subject: "your password reset token (valid for 10minutes)",
      message,
    });
    res.status(200).json({ status: "success", message: "token sent to mail" });
  } catch (err) {
    Account.passwordResetToken = undefined;
    Account.passwordResetExpires = undefined;
    await account.save({ validateBeforeSave: false });
    return res
      .status(500)
      .json({ status: "failed", message: "error while sending email" });
  }
};

exports.resetPassword = async (req, res, next) => {
  // 1) get account based on the resetToken
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const account = await user.fidOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2) if token has has not expired, and there is account, set the new password
  if (!account) {
    return reqres
      .status(400)
      .json({ status: "failed,", message: "token is invalid or expired" });
  }
  account.password = req.body.password;
  account.passwordConfirm = req.body.passwordConfirm;
  account.passwordResetToken = undefined;
  account.passwordResetExpires = undefined;
  await user.save();

  const token = signToken(user._id);
  res.status(200).json({ status: "success", token });
};
