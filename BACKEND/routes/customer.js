const router = require("express").Router();
let Customer = require("../models/customers");

//Create a data
router.route("/add").post((req,res)=>{
    const accNo = Number(req.body.accNo);
    const fName = req.body.fName;
    const lName = req.body.lName;
    const idNumber = req.body.idNumber;
    const accBalance = req.body.accBalance;
    const address = req.body.address;
    const phoneNo = Number(req.body.phoneNo);

    const newCustomer = new Customer({
        accNo,
        fName,
        lName,
        idNumber,
        accBalance,
        address,
        phoneNo
    })

    newCustomer.save().then(()=>{
        res.json("Customer Added.")
    }).catch((err)=>{
        console.log(err);
    })
})



//Display all customers

router.route("/").get((req,res)=>{
    Customer.find().then((Customer)=>{
        res.json(Customer)
    }).catch((err)=>{
        console.log(err)
    })
})

//Display one selected customer

router.route("/get/:accNo").get(async(req,res) => {
    let accNo = (req.params.accNo);
    const user = await Customer.find({accNo}).then((Customer)=> {
        res.status(200).send({status: "User fetched" , Customer})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with get user.",error: err.message});
    })
})

//Update Customer

router.route("/update/:accNo").put(async(req,res)=>{
    let aaccNo =  req.params.accNo;
    const {accNo,fName,lName,idNumber,accBalance,address,phoneNo} = req.body;

    const updateCustomer = {
        accNo,
        fName,
        lName,
        idNumber,
        accBalance,
        address,
        phoneNo
    }

    const update = await Customer.findOneAndUpdate({aaccNo}, updateCustomer).then(() => {
        res.status(200).send({status: "User Updated"})
    }).catch((err) =>{
        console.log(err);
        res.status(500).send({status: "Error with updating data.",error: err.message});
    })    
})


// Delete

router.route("/delete/:accNo").delete(async(req,res)=> {
    let accNo =  req.params.accNo;

    const user = await Customer.findOneAndDelete({accNo}).then((Customer)=> {
        res.status(200).send({status: "User Delete."})
    }).catch((err) =>{
        console.log(err.message);
        res.status(500).send({status: "Error with deleting data.",error: err.message});
    })
})

module.exports = router;