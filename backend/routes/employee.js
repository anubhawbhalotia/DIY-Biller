const router = require('express').Router()

const executeQuery = require('../middleware/sql_connector')
const validate = require('../middleware/validateUser')

router.post('/add', validate, (req, res) => {
    let newEmployee = {
        mobile: req.body.mobile ? req.body.mobile : null,
        address: req.body.address ? req.body.address : null,
        email: req.body.email? req.body.email: null,
        kyc: req.body.kyc ? req.body.kyc : null,
        name: req.body.name ? req.body.name : null,
        age: req.body.age ? req.body.age : null,
        gender: req.body.gender ? req.body.gender : null,
        username: req.body.username ? req.body.username : null,
        password: req.body.password ? req.body.password : null,
    }

    executeQuery(`select * from Employee${req.user.ID} where eusername='${newEmployee.username}`)
        .then((res, err) => {
            if(err) {
                throw err;
            }
            if(res.length != 0) {
                console.log(res)
                res.status(403).send('Employee already exists')
            }
            executeQuery(`insert into Employee${req.user.ID} (ename, eage, egender, eusername, epassword, emobile, eaddress, eemail, ekyc) values ('${newEmployee.name}', ${newEmployee.age}, '${newEmployee.gender}', '${newEmployee.username}', '${newEmployee.password}', ${newEmployee.mobile}, '${newEmployee.address}', '${newEmployee.email}', ${newEmployee.kyc})`)
            .then((result, err) => {
                if(err) {
                    throw err;
                }
                res.send('OK')
            })
        })
    })

module.exports = router