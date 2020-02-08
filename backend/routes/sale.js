const router = require('express').Router()
const moment = require('moment')

const executeQuery = require('../middleware/sql_connector')
const validate = require('../middleware/validateUser')

router.post('/add', validate, async (req, res) => {
    /*
    {
        sales: [
            {
                item_name: '',
                quantity: int,
                rate: int/float
            }
        ]
    }
    */
   let billNumber = await executeQuery(`select max(bill_no) from Sale${req.user.ID}`)
   console.log('Query o/p: ',billNumber[0])
   if(billNumber[0]['max(bill_no)'] == null) {
       billNumber = 1;
   } else {
       billNumber = billNumber[0]['max(bill_no)'] + 1;
   }
   console.log(billNumber)
    let now = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    let newSale = req.body.sales
    for(const sale of newSale) {
        if(sale.rate == undefined) {
            return res.status(400).send(`Rate for ${sale.item_name} is not defined`)
        }
        await executeQuery(`select itemId, quantity from Inventory${req.user.ID} where item_name='${sale.item_name}'`)
            .then(async (item_id_result, err) => {
                if(err) {
                    throw err;
                }
                if(item_id_result[0].quantity !== null) {
                    if(sale.quantity > item_id_result[0].quantity) {
                        return res.status(400).send('Insuffienct Quantity in Inventory')
                    }
                }
                console.log(item_id_result, 'bill number: ', billNumber)
                await executeQuery(`insert into Sale${req.user.ID} (bill_no, time, itemId, quantity, rate) VALUES (${billNumber}, '${now}', ${item_id_result[0].itemId}, ${sale.quantity}, ${sale.rate})`)  
            })
    }
    res.send('OK')
})

module.exports = router