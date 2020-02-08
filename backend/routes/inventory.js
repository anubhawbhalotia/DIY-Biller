const router = require('express').Router()

const executeQuery = require('../middleware/sql_connector')
const validate = require('../middleware/validateUser')

router.post('/additem', validate, (req, res) => {
    // Add Item into Inventory {itemName, quantity, purchase_rate, gst_rate}

    let newItem = {
        item_name: req.body.item_name,
        quantity: req.body.quantity ? req.body.quantity : null,
        purchase_rate: req.body.purchase_rate ? req.body.purchase_rate : null,
        gst_rate: req.body.gst_rate ? req.body.gst_rate: null 
    }
    console.log(req.user.ID)
    executeQuery(`INSERT INTO Inventory${req.user.ID} (item_name, quantity, purchase_rate, gst_rate) VALUES ('${newItem.item_name}', ${newItem.quantity}, ${newItem.purchase_rate}, ${newItem.gst_rate})`)
        .then((result, err) => {
            if(err)    
                throw err;
            console.log(result)
            res.send('OK')
        })
})

router.get('/', validate, (req, res) => {
    executeQuery(`SELECT * from Inventory${req.user.ID}`)
        .then((result, err) => {
            if(err)
                throw err;
            console.log(result[0])
            res.send(result[0])
        })
})

module.exports = router