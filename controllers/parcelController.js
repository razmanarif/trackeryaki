const express= require('express');
const { listIndexes } = require('../model/userModel');
const router = express.Router()
const authenticateUser = require("../middlewares/authMiddleware")

const seedModel = require("../model/seedModel")
const UserModel = require("../model/userModel")

// const parcels = require("../model/seedData")




router.use(express.json());


// admin can view all parcels, delivery guy can view parcels available for pickup 
// and parcels assigned to them
router.get('/parcels', authenticateUser, async (req, res) => {
  const parcels = await seedModel.find()
    if (req.user.RegisterAs === 'Admin') {
      // Admin can view all parcels (works so far)

      res.json({parcels}); // change to return data from database

    } else if (req.user.RegisterAs === 'DeliveryGuy') {
      // Delivery guy can view assigned parcels and available parcels for pickup
      const deliveryGuyId = req.user._id;
      const assignedParcels = parcels.filter((parcel) => parcel.assignedTo == deliveryGuyId.toString());
      const availableParcels = parcels.filter((parcel) => parcel.status === 'created')
      // console.log(parcels)
      // console.log(deliveryGuyId.toString())
      // console.log(assignedParcels)
      res.json({ assignedParcels, availableParcels });
    } else {
      res.status(400).json({ error: 'You must be an admin or delivery guy' });
    }

  });
  
  // admins can create new parcels
  router.post('/parcels', authenticateUser, async (req, res) => {
    if (req.user.RegisterAs === 'Admin') {
      try {
        const parcels = new seedModel(req.body);
        await parcels.save();
        res.status(200).json({ message: 'Parcel created' });
      } catch (error) {
        res.status(500).json({ error: 'An error occured' });
      }
    } else {
      res.status(401).json({ error: 'Not authorised to create parcels' });
    }
  });
  
  // delivery guy can accept parcel parcel gets assigned to them
  router.put('/parcels/:parcelId/assign', authenticateUser, async (req, res) => {
    try {
      const parcelId = req.params.parcelId;
      const deliveryGuyId = req.user._id;
  
      const parcel = await seedModel.findById(parcelId);

      const user = await UserModel.findByIdAndUpdate(req.user._id, {
        $push:{Myorder: req.params.parcelId}
      })

      console.log(user)
  
      if (!parcel) {
        return res.status(404).json({ error: 'Parcel not found' });
      }
  
      parcel.assignedTo = deliveryGuyId;

      parcel.status = 'inProgress'
      await parcel.save();
      res.json({ message: 'Parcel assigned successfully' });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  });

// delivery guy can mark items as delivered
  router.put('/parcels/:parcelId/delivered', authenticateUser, async (req, res) => {
  try {
    const parcelId = req.params.parcelId;
    const deliveryGuyId = req.user._id;

    const parcel = await seedModel.findById(parcelId);
    const updateParcel = await seedModel.findByIdAndUpdate(parcelId,{
      currentLocation : parcel.destination
    })
    console.log(updateParcel)

    const user = await UserModel.findByIdAndUpdate(deliveryGuyId, {
      $pull: { Myorder: parcelId }
    });

    if (!parcel) {
      return res.status(404).json({ error: 'Parcel not found' });
    }

    if (parcel.assignedTo.toString() !== deliveryGuyId.toString()) {
      return res.status(401).json({ error: 'Not authorized to mark this parcel as delivered' });
    }

    parcel.assignedTo = null;
    parcel.status = 'delivered';
    await parcel.save();

    res.json({ message: 'Parcel delivered' });
  } catch (e) {
    console.log(e)
  }
});




  module.exports = router;



