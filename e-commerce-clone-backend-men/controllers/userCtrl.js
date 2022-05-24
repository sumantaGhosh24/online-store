const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const User = require("../models/userModel");
const UserData = require("../models/userDataModel");
const UserAddress = require("../models/userAddressModel");
const {APIFeatures} = require("../lib/features");

const userCtrl = {
  // register user
  register: async (req, res) => {
    try {
      const {email, mobileNumber, password, cf_password} = req.body;
      const errors = [];
      for (const key in req.body) {
        if (!req.body[key]) {
          errors.push(`Please Fill ${key} Field.`);
        }
      }
      if (errors.length > 0) {
        return res.status(400).json({msg: errors});
      }
      if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
        return res.status(400).json({msg: "Please Enter a Valid Email."});
      }
      if (!mobileNumber.match(/^\d{10}$/)) {
        return res
          .status(400)
          .json({msg: "Please Enter a Valid Mobile Number."});
      }
      const userEmail = await User.findOne({email});
      if (userEmail) {
        return res.status(400).json({msg: "This Email Already Register."});
      }
      const userMobileNumber = await User.findOne({mobileNumber});
      if (userMobileNumber) {
        return res
          .status(400)
          .json({msg: "This Mobile Number Already Register."});
      }
      if (password.length < 6) {
        return res
          .status(400)
          .json({msg: "Password Length must be 6 Character Long."});
      }
      if (password !== cf_password) {
        return res
          .status(400)
          .json({msg: "Password and Confirm Password not Match."});
      }
      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = new User({
        email,
        mobileNumber,
        password: passwordHash,
      });
      await newUser.save();
      const newUserData = new UserData({user: newUser._id});
      await newUserData.save();
      const newUserAddress = new UserAddress({user: newUser._id});
      await newUserAddress.save();
      const token = createAccessToken({id: newUser._id});
      const to = newUser.email;
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
      });
      await transporter.sendMail({
        from: "E-Commerce Clone || Register Verification",
        to: to,
        subject: "Email Verification Link - E-Commerce Clone",
        html: `<!doctype html>
<html lang=en>
<head>
<meta charset=utf-8>
<meta name=viewport content="width=device-width,initial-scale=1">
<style>
	*{margin:0;padding:0;box-sizing:border-box;}
	.container, .container-fluid{width:100%;padding-left:24px;padding-right:24px;margin-right:auto;margin-left:auto}
	.container{max-width:900px;}
	.bg-primary{background-color:#0d6efd;}
	.text-center{text-align:center;}
	.text-white{color:white;}
	.p-5{padding:48px;}
	.my-5{margin-top:48px;margin-bottom:48px;}
	.fw-bold{font-weight:700;}
	.text-muted{color:#6c757d;}
	.mb-5{margin-bottom:48px;}
	.position-relative{position:relative;}
	.position-absolute{position:absolute;}
	.top-50{top:50%;}
	.start-50{left:50%;}
	.p-3{padding:16px;}
	.btn{display:inline-block;font-weight:400;font-height:1.5;color:#212529;text-align:center;text-decoration:none;vertical-align:middle;cursor:pointer;user-select:none;background-color:transparent;border:1px solid transparent;padding:.375rem .75rem;font-size:16px;border-radius:.25rem;transition:all .7s ease-in-out;}
	.btn-primary{color:#fff;background-color:#0d6efd;border-color:#0a58ca;}
	.btn-primary:hover{color:#fff;background-color:#0b5ed7;border-color:#0a58ca;}
	h1{font-size:calc(1.375rem+1.5vw);}
	h2{font-size:calc(1.325rem+.9vw);}
	p{margin-top:0;margin-bottom:1rem;}
</style>
<title>E-Commerce Clone || Register Verification</title>
</head>
<body>
<div class="container-fluid bg-primary text-center"><h1 class="text-white p-5">E-Commerce Clone || Register Verification</h1></div>
<div class="container my-5"><h2 class="fw-bold">Hello,</h2><p class="text-muted">Click below button to activate your account.</p></div>
<div class="container my-5"><p class="text-muted">If you not ask for verify your account, you can ignore this email.</p><h2 class="fw-bold">Thanks for Register our website.</h2></div>
<div class="container mb-5"><div class="position-relative"><a class="position-absolute top-50 start-50 p-3 btn btn-primary" href="http://localhost:8080/register-verify?token=${token}">Activate Account</a></div></div>
</body>
</html>`,
      });
      return res.json({
        msg: "A verification email has been sent, click the email link to activate your account.",
      });
    } catch (error) {
      return res.status(500).json({msg: error.message});
    }
  },
  // add user data
  userData: async (req, res) => {
    try {
    } catch (error) {
      return res.status(500).json({msg: error.message});
    }
  },
  // add user address
  userAddress: async (req, res) => {
    try {
    } catch (error) {
      return res.status(500).json({msg: error.message});
    }
  },
  // login user
  login: async (req, res) => {
    try {
      const {email, password} = req.body;
      const user = await User.findOne({email, status: "active"});
      if (!user) return res.status(400).json({msg: "User doest not Exists."});
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({msg: "Invalid Login Credentials."});
      const accesstoken = createAccessToken({id: user._id});
      const refreshtoken = createRefreshToken({id: user._id});
      res.cookie("refreshtoken", refreshtoken, {
        httpsOnly: true,
        path: "/api/refresh_token",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.json({accesstoken});
    } catch (error) {
      return res.status(500).json({msg: error.message});
    }
  },
  // login verify
  loginVerify: async (req, res) => {
    try {
    } catch (error) {
      return res.status(500).json({msg: error.message});
    }
  },
  // forgot password
  forgotPassword: async (req, res) => {
    try {
    } catch (error) {
      return res.status(500).json({msg: error.message});
    }
  },
  // confirm forgot password
  confirmForgotPassword: async (req, res) => {
    try {
    } catch (error) {
      return res.status(500).json({msg: error.message});
    }
  },
  // reset password
  resetPassword: async (req, res) => {
    try {
    } catch (error) {
      return res.status(500).json({msg: error.message});
    }
  },
  // verify register
  registerVerify: async (req, res) => {
    try {
      const token = req.query.token;
      if (!token) {
        return res.status(400).json({
          msg: "Something wrong with your link, click your link again.",
        });
      }
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (error) {
      return res.status(500).json({msg: error.message});
    }
  },
  // get all users
  getUsers: async (req, res) => {
    try {
      const features = new APIFeatures(
        User.find().populate("cart.product"),
        req.query
      )
        .paginating()
        .sorting()
        .searching()
        .filtering();
      const result = await Promise.allSettled([
        features.query,
        User.countDocuments(),
      ]);
      const users = result[0].status === "fulfilled" ? result[0].value : [];
      const count = result[1].status === "fulfilled" ? result[1].value : 0;
      res.json({users, count});
    } catch (error) {
      return res.status(500).json({msg: error.message});
    }
  },
  // get user
  getUser: async (req, res) => {
    const user = await User.findById(req.params.id)
      .select("-password")
      .populate("cart.product");
    if (!user) return res.status(400).json({msg: "User does not Exists."});
    const order = await Order.find({user: req.params.id});
    res.json({user, order});
  },
  // logout user
  logout: (req, res) => {
    try {
      res.clearCookie("refreshtoken", {path: "/api/refresh_token"});
      res.json({msg: "Logged Out."});
    } catch (error) {
      return res.status(500).json({msg: error.message});
    }
  },
  // get refresh token
  refresh_token: (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token)
        return res.status(400).json({msg: "Please Login or Register First."});
      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err)
          return res.status(400).json({msg: "Please Login or Register First."});
        const accesstoken = createAccessToken({id: user.id});
        res.json({accesstoken});
      });
    } catch (error) {
      return res.status(500).json({msg: error.message});
    }
  },
  // get cart
  getCart: async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) return res.status(400).json({msg: "User doest not Exists."});
      res.json(user.cart);
    } catch (error) {
      return res.status(500).json({msg: error.message});
    }
  },
  // update user
  updateUser: async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        username,
        email,
        mobileNumber,
        image,
        dob,
        gender,
        address,
      } = req.body;
      const errors = [];
      for (const key in req.body) {
        if (!req.body[key]) {
          errors.push(`Please Fill ${key} Field.`);
        }
      }
      if (errors.length > 0) {
        return res.status(400).json({msg: errors});
      }
      if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
        return res.status(400).json({msg: "Please Enter a Valid Email."});
      }
      if (!mobileNumber.match(/^\d{10}$/)) {
        return res
          .status(400)
          .json({msg: "Please Enter a Valid Mobile Number."});
      }
      const user = await User.findByIdAndUpdate(
        req.params.id,
        {
          firstName: firstName.toLowerCase(),
          lastName: lastName.toLowerCase(),
          username: username.toLowerCase(),
          email,
          mobileNumber,
          image,
          dob,
          gender,
          address,
        },
        {new: true}
      );
      if (!user) return res.status(400).json({msg: "User doest not Exists."});
      res.json(user);
    } catch (error) {
      return res.status(500).json({msg: error.message});
    }
  },
  // update user data
  userDataUpdate: async (req, res) => {
    try {
    } catch (error) {
      return res.status(500).json({msg: error.message});
    }
  },
  // update user address
  userAddressUpdate: async (req, res) => {
    try {
    } catch (error) {
      return res.status(500).json({msg: error.message});
    }
  },
  // add to cart
  addCart: async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) return res.status(400).json({msg: "User doest not Exists."});
      await User.findOneAndUpdate(
        {_id: req.user.id},
        {
          cart: req.body.cart,
        }
      );
      return res.json({msg: "Added to Cart."});
    } catch (error) {
      return res.status(500).json({msg: error.message});
    }
  },
  // delete user
  deleteUser: async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user)
        return res.status(400).json({msg: "This User doest not Exists."});
      res.json({msg: "Product Deleted."});
    } catch (error) {
      return res.status(500).json({msg: error.message});
    }
  },
};

// create accesstoken
const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "30m"});
};

// create refresh token
const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "7d"});
};

module.exports = userCtrl;
