const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken')
var fetchuser = require('../middleware/fetchUser');

const JWT_SECRET = 'Teejayis$mart'

//1-Endpoint/ROUTE :  Create a User using : POST "/api/auth/createuser". No Login Required , Doesnot require auth
//  we are writing validations here inside []:
router.post('/createuser', [

  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid Email').isEmail(),
  body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res)=>{
  let success = false;
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    // Check whether the user with this email exit already or not 
    try {
      let user = await User.findOne({email: req.body.email});
      console.log(user)
      if(user){
        return res.status(400).json({error: "Sorry a user with this email already exits"})
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
    
      // create a new user
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email
      });

      const data = {
        user:{
          id: user.id
        }
      }
      // this will return promise
      const authtoken = jwt.sign(data, JWT_SECRET); 

      // res.json(user)
      success = true; 
      res.json({success, authtoken})

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server Error');
    }
})

// 2-Endpoint/ROUTE :  Authenticate a User using : POST "/api/auth/login". No Login Required 

router.post('/login', [
  body('email', 'Enter a valid Email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
], async (req, res)=>{
  let success = false;
  // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()});
    }

    const {email, password} = req.body;
    try {
      let user = await User.findOne({email});
      if(!user){
        success = false;
        return res.status(400).json({error: "please provide correct credentials"});
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if(!passwordCompare){
        success = false;
        return res.status(400).json({success, error: "please provide correct credentials"});
      }

      // payload
      const data = {
        user:{
          id: user.id
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({success, authtoken})

    } catch (error) {
      console.error(error.message);
      res.status(500).send('Internal server Error');
    }
})


//  3-Endpoint/ROUTE :  Get Logged-In User Details using : POST "/api/auth/getuser". Login Required 
router.post('/getuser', fetchuser, async (req, res)=>{

try {
  userId = req.user.id;
  const user = await User.findById(userId).select("-password")
  res.send(user)
} catch (error) {
      console.error(error.message);
      res.status(500).send('Internal server Error');
  }
})
module.exports = router


