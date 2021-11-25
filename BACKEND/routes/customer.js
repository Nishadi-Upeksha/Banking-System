const router = require("express").Router();
let Customer = require("../models/customers");

//Create a data
router.route("/add").post((req,res)=>{
    const id = req.body.id;
    const fName = req.body.fName;
    const lName = req.body.lName;
    const idNumber = req.body.idNumber;
    const accBalance = req.body.accBalance;
    const address = req.body.address;
    const phoneNo = Number(req.body.phoneNo);

    const newCustomer = new Customer({
        id,
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

router.route("/get/:id").get(async(req,res) => {
    let userId = req.params.id;
    const user = await Customer.findById(userId).then((Customer)=> {
        res.status(200).send({status: "User fetched" , Customer})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with get user.",error: err.message});
    })
})

//Update Customer

router.route("/update/:id").put(async(req,res)=>{
    let userId = req.params.id;
    const {id,fName,lName,idNumber,accBalance,address,phoneNo} = req.body;

    const updateCustomer = {
        id,
        fName,
        lName,
        idNumber,
        accBalance,
        address,
        phoneNo
    }

    const update = await Customer.findByIdAndUpdate(userId, updateCustomer).then(() => {
        res.status(200).send({status: "User Updated"})
    }).catch((err) =>{
        console.log(err);
        res.status(500).send({status: "Error with updating data.",error: err.message});
    })    
})


// Delete

router.route("/delete/:id").delete(async(req,res)=> {
    let userId =  req.params.id;

    await Customer.findByIdAndDelete(userId).then(()=> {
        res.status(200).send({status: "User Delete."})
    }).catch((err) =>{
        console.log(err.message);
        res.status(500).send({status: "Error with deleting data.",error: err.message});
    })
})

module.exports = router;