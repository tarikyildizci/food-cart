const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const bcrypt = require('bcrypt');

//GET ALL
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    const response = users.map((user) => ({
      id: user._id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      address: user.address,
    }));

    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//GET ONE
router.get('/:id', getUser, (req, res) => {
  try {
    const response = {
      id: res.user._id,
      name: res.user.name,
      surname: res.user.surname,
      email: res.user.email,
      address: res.user.address,
    };
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//CREATE ONE // SIGN UP
router.post('/', checkPasswordLength, async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const user = new User({
    name: req.body.name,
    surname: req.body.surname,
    password: hashedPassword,
    email: req.body.email,
    address: req.body.address,
  });

  try {
    const newUser = await user.save();

    const result = {
      id: newUser._id,
      name: newUser.name,
      surname: newUser.surname,
      email: newUser.email,
      address: newUser.address,
    };

    res.status(201).json(result);
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json({ message: 'This email is already taken' });
    } else {
      res.json({ message: err.message });
    }
  }
});

//UPDATE ONE
router.patch('/:id', getUser, async (req, res) => {
  if (req.body.name != null) {
    res.user.name = req.body.name;
  }
  if (req.body.surname != null) {
    res.user.surname = req.body.surname;
  }
  if (req.body.password != null) {
    res.user.password = req.body.password;
  }
  if (req.body.address != null) {
    res.user.address = req.body.address;
  }

  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//DELETE ONE
router.delete('/:id', getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: 'Deleted user' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//LOGIN
router.post('/login', async (req, res) => {
  try {
    //Search for email in database
    const user = await User.findOne({ email: req.body.email }).exec();

    if (user === null) {
      return res.status(404).json({ message: 'User not found' });
    }

    //Compare passwords
    const result = await bcrypt.compare(req.body.password, user.password);
    if (result) {
      //Return only some properties to client
      res.status(200).json({
        id: user._id,
        email: user.email,
        name: user.name,
        surname: user.surname,
        address: user.address,
      });
    } else {
      res.status(400).json({ message: 'Wrong Password' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//MIDDLEWARE
async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: 'Cannot find user' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.user = user;
  next();
}

function checkPasswordLength(req, res, next) {
  const passwordLength = req.body.password.length;

  if (passwordLength < 6) {
    return res
      .status(400)
      .json({ message: 'Password should be more than 6 characters' });
  } else if (passwordLength > 30) {
    return res
      .status(400)
      .json({ message: 'Password should be less than 30 characters' });
  }

  next();
}

module.exports = router;
