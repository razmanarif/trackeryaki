
const router = require('express').Router();
const seedModel = require('../model/seedModel');
const authenticateUser = require("../middlewares/authMiddleware")

router.get("/data",authenticateUser, async (req,res) => {
    try{
      const database = await seedModel.find()
      res.json({database})
    }catch(e){
      console.log(e)
    }
    
    
})
router.post("/create",authenticateUser,async (req,res) => {
    try{
        const dataSize = await seedModel.find()
        const lastCount = dataSize[dataSize.length-1].trackingNo
        const create = new seedModel({
            ...req.body,
            currentLocation : req.body.origin,
            status : "created",
            trackingNo : lastCount+1
        })
        await create.save()
        res.sendStatus(200)

    }catch(e){
        console.log(e)
    }
})

router.put("/edit/:id",authenticateUser, async (req,res) => {
    try {
        const update = await seedModel.findByIdAndUpdate(req.params.id, {
            ...req.body,
            $push : {editedBy : req.body.tranckingNo}
        })
        res.sendStatus(200);

    }catch(e){
        console.log(e)
        res.sendStatus(500);
    }

})

router.delete("/delete/:id", async (req,res) => {
    try {
        const update = await seedModel.findByIdAndDelete(req.params.id)
        res.sendStatus(200)
    
    }catch(e){
        console.log(e)
        res.sendStatus(500);
    }

})

module.exports = router