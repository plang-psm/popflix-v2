const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/User')

const protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1]
      console.log('backend token', token)
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      // Get user from token
      console.log(decoded.id)
      req.user = await User.findById(decoded.id).select('-password')
      // NOTE: We need to check if a user was found
      // https://www.udemy.com/course/react-front-to-back-2022/learn/lecture/30591026#questions/17843570
      if (!req.user) {
        res.status(401)
        throw new Error('Not authirised - NO USER')
      }

      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Not authorized - USER')
    }
  }
  if (!token) {
    res.status(401)
    throw new Error(`Not authorized - ${token}`)
  }
})

module.exports = { protect }