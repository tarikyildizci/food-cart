const express = require('express');
const router = express.Router();
const Restaurant = require('../models/restaurant.model');
//GET ALL
router.get('/', async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json(restaurants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//GET ONE
router.get('/:url', getRestaurant, (req, res) => {
  res.status(200).json(res.restaurant);
});

//CREATE ONE
// router.post('/', async (req, res) => {
//   const restaurant = new Restaurant({
//     name: req.body.name,
//     description: req.body.description,
//     items: req.body.items,
//   });

//   try {
//     const newRestaurant = await restaurant.save();
//     res.status(201).json(newRestaurant);
//   } catch (err) {
//     res.status(400).json({ message: err });
//   }
// });

//UPDATE ONE
// router.patch('/:id', getRestaurant, async (req, res) => {
//   if (req.body.title != null) {
//     res.restaurant.title = req.body.title;
//   }
//   if (req.body.description != null) {
//     res.restaurant.description = req.body.description;
//   }

//   try {
//     const updatedRestaurant = await res.restaurant.save();
//     res.json(updatedRestaurant);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

//DELETE ONE
// router.delete('/:id', getRestaurant, async (req, res) => {
//   try {
//     await res.restaurant.remove();
//     res.json({ message: 'Deleted restaurant' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

//MIDDLEWARE
async function getRestaurant(req, res, next) {
  let restaurant;
  try {
    restaurant = await Restaurant.findOne({ url: req.params.url });
    if (restaurant == null) {
      return res.status(404).json({ message: 'Cannot find restaurant' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.restaurant = restaurant;
  next();
}

module.exports = router;
