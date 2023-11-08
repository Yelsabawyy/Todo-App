const {
  HashPassword,
  getUserByEmail,
  ComparePassword,
  addUser,
} = require("../utils/auth");
const jwt = require("jsonwebtoken");

exports.Register = async (req, res, next) => {
  try {
    const userData = req.body.userData;
    if (!userData.email || !userData.password) {
      res.statusCode(401);
      return res.status(299).send("Enter an Email and Password!");
    }
    const hashPassword = await HashPassword(userData.password);
    const usedEmail = await getUserByEmail(userData.email);
    if (usedEmail) {
      return res.status(299).send("Email is already used before!");
    }
    const user = await addUser(userData, hashPassword);
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.SECRET_KEY,
      {
        expiresIn: "2h",
      }
    );
    return res
      .status(201)
      .json({ message: "User Created successfully", user: user, token: token });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

exports.Login = async (req, res, next) => {
  try {
    const userData = req.body.userData;

    if (!userData.email || !userData.password) {
      return res.status(299).send("Enter Email and Password!");
    }

    const user = await getUserByEmail(userData.email);
    if (!user) {
      return res.status(299).send("Check Email and Password!");
    }
    const isPasswordMatch = await ComparePassword(
      userData.password,
      user.password
    );
    if (!isPasswordMatch) {
      return res.status(299).send("Check Email and Password!");
    }
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.SECRET_KEY,
      {
        expiresIn: "2h",
      }
    );
    return res
      .status(200)
      .json({ message: "User Found", user: user, token: token });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};
