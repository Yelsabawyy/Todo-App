const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function HashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

async function ComparePassword(password, hashedPassword) {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
}

async function getUserByEmail(email) {
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });
    return user;
  } catch (error) {
    console.error("Error from fetching user email:", error);
    return {};
  }
}

async function addUser(userData, hashPassword) {
  try {
    const user = await prisma.user.create({
      data: {
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
        password: hashPassword,
      },
    });
    return user;
  } catch (error) {
    console.error("Error from Adding user email:", error);
    return {};
  }
}

module.exports = { getUserByEmail, HashPassword, ComparePassword, addUser };
