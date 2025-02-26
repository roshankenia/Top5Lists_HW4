const auth = require("../auth");
const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

getLoggedIn = async (req, res) => {
  console.log("calling logged in");
  auth.verify(req, res, async function () {
    const loggedInUser = await User.findOne({ _id: req.userId });
    res
      .status(200)
      .json({
        loggedIn: true,
        user: {
          firstName: loggedInUser.firstName,
          lastName: loggedInUser.lastName,
          email: loggedInUser.email,
        },
      })
      .send();
    return;
  });
};

logoutUser = async (req, res) => {
  console.log("calling logged out");

  //token = auth.deleteToken(req);
  await res
    // .cookie("token", token, {
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: "none",
    // })
    .status(200)
    .json({
      loggedIn: false,
    })
    .send();
};

loginUser = async (req, res) => {
  console.log("calling login");

  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    // LOGIN THE USER
    let comp = await bcrypt.compare(req.body.password, user.passwordHash);

    if (comp) {
      const token = auth.signToken(user);

      await res
        .cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        })
        .status(200)
        .json({
          success: true,
          user: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
          },
        })
        .send();
    } else {
      return res.status(400).json({
        success: false,
        errorMessage: "Invalid Email/Password",
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      success: false,
      errorMessage: "Invalid Email/Password",
    });
  }
};

registerUser = async (req, res) => {
  console.log("calling register");

  try {
    const { firstName, lastName, email, password, passwordVerify } = req.body;
    if (!firstName || !lastName || !email || !password || !passwordVerify) {
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });
    }
    if (password.length < 8) {
      return res.status(400).json({
        errorMessage: "Please enter a password of at least 8 characters.",
      });
    }
    if (password !== passwordVerify) {
      return res.status(400).json({
        errorMessage: "Please enter the same password twice.",
      });
    }
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        errorMessage: "An account with this email address already exists.",
      });
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      passwordHash,
    });
    const savedUser = await newUser.save();

    // LOGIN THE USER
    const token = auth.signToken(savedUser);

    await res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .status(200)
      .json({
        success: true,
        user: {
          firstName: savedUser.firstName,
          lastName: savedUser.lastName,
          email: savedUser.email,
        },
      })
      .send();
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

module.exports = {
  getLoggedIn,
  registerUser,
  loginUser,
  logoutUser,
};
