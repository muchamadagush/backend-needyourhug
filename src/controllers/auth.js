const authModels = require("../models/auth")
const { v4: uuid } = require("uuid")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const verification = require('../helpers/common')

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body

    if (!name) return res.status(400).send({ message: "username cannot be null" });
    if (!email) return res.status(400).send({ message: "email cannot be null" });
    if (!password) return res.status(400).send({ message: "password cannot be null" });
  
    const user = await authModels.findUser(email)
    if (user.length > 0) return res.status(400).send({ message: "email already exists" });

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        const date = new Date();
        const datetime = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate()

        const data = {
          id: uuid().split("-").join(""),
          name,
          username: `@${name.toLowerCase()}`,
          email,
          password: hash,
          status: "unactived",
          role: 'user',
          createdAt: datetime,
          updatedAt: datetime
        }

        authModels.register(data)
        delete data.password

        const payload = {
          name,
          email,
        }
        const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET)
        verification.sendEmail(email, name, token)

        res.status(201);
         res.json({
           message: "Register success!",
           data
         });
      })
    })
  } catch (error) {
    next(new Error(error.message))
  }
}

const userActivation = async (req, res, next) => {
  try {
    const { token } = req.params;

    if (!token) return res.status(401).send({ message: 'server need token' });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
      if (err) {
        if (err.name = 'TokenExpiredError') return res.status(403).send({ message: 'Token expired!' });
        if (err.name = 'JsonWebTokenError') return res.status(403).send({ message: err.message });
        if (err.name = 'NotBeforeError') return res.status(403).send({ message: 'jwt not active!' });
      }

      const email = decoded.email;
      const status = 'actived'

      authModels.userActivation(email, status)
      res.status(200);
      res.redirect(`${process.env.FRONT_URL}/login`);
    })
  } catch (error) {
    next(new Error(error.message))
  }
}

// User login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    if (!email) return res.status(400).send({ message: "Please, input your email!" });
    if (!password) return res.status(400).send({ message: "Please, input your password!" });
    
    const user = (await authModels.findUser(email))[0]

    if (!user) return res.status(400).send({ message: "email not registered!" });
    if (user.status === 'unactived') return res.status(400).send({ message: "Please activate your email!" });

    if (user.status === 'actived') {
      bcrypt.compare(password, user.password, (err, resCompare) => {
        if (resCompare === false) return res.status(401).send({ message: "password wrong!" });
  
        const payload = {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          avatar: user.avatar,
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30
        }
  
        const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET)
        user.token = token
        delete user.password
  
         res.json({ user });
      })
    }
  } catch (error) {
    next(new Error(error.message))
  }
}

module.exports = {
  register,
  userActivation,
  login
}