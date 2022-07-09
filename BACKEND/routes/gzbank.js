const router = require("express").Router();
let Customer = require("../models/customers");

//Search ID by using AccoungtNo

router.route("/get/:accNo").get(async(req,res) => {
    let accNo = (req.params.accNo);
    const user = await Customer.find({accNo}).then((Customer)=> {
        res.status(200).send({status: "User fetched" , Customer})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with get user.",error: err.message});
    })
})

module.exports = router;