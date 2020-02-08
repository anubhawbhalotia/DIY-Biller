const router = require('express').Router()

const executeQuery = require('../middleware/sql_connector')
const SHA1 = require('../middleware/hash')
const validate = require('../middleware/validateUser')

router.get('/profile', validate, (req, res) => {
    res.send({
        name: req.user.name,
        shopname: req.user.shopname
    })
})

router.post('/signup', async (req, res) => {
    console.log('New Request', req.body)
    let newUser = {
        email : req.body.email, 
        password : req.body.password,
        sale_model : req.body.sale_model,
        purchase_model : req.body.purchase_model,
        name : req.body.name,
        shop_name : req.body.shop_name
    }
    newUser.password = SHA1(newUser.password)

    executeQuery(`SELECT email, ID from Users where email = '${ newUser.email }'`)
        .then((results, err) => {
            if(err) {
                console.log('Error: ', err)
            }
            if(results.length) {
                console.log('User Exists', results)
                res.send('User Exists');
            } else {
                executeQuery(`INSERT INTO Users (email, password, name, shopname) VALUES ('${newUser.email}', '${newUser.password}', '${newUser.name}', '${newUser.shop_name}')`)
                    .then(async (result, err) => {
                        if(err) {
                            return res.send(err)
                        }

                        // Generate Hash for the new User
                        let key = SHA1(newUser.email+'geifvjn2n434')
                        await executeQuery(`Select id from Users where email='${newUser.email}'`)
                            .then(async (result, err) => {
                                let userId = result[0].id
                                console.log('Id of the new User', userId, result)
                                await executeQuery(`CREATE TABLE Employee${userId} (ename varchar(100) not null, eage INT, egender ENUM('Male', 'Female', 'Other'), eusername varchar(100) not null, epassword varchar(100) not null, emobile int, eaddress varchar(500), eemail varchar(100), ekyc boolean)`)
                                await executeQuery(`CREATE TABLE Inventory${userId} (itemId int auto_increment primary key, item_name varchar(200) not null, quantity int default null, purchase_rate float, gst_rate float)`)
                                await executeQuery(`create table Sale${userId} ( sale_no int auto_increment primary key, bill_no int, time timestamp, itemId int, quantity float, rate float not null, foreign key(itemId) references Inventory${userId} (itemId) )`)
                                await executeQuery(`create table Purchase${userId}(time timestamp not null, company varchar(100), itemId int, tag enum('Opening Balance', 'Return', 'Purchase'), foreign key(itemId) references Inventory${userId}(itemId) )`)
                            })
                        return res.send(key)
                    })
                }
        })
})

router.post('/login', (req, res) => {
    let User = {
        email: req.body.email,
        password: req.body.password
    }

    console.log(req.body)

    executeQuery(`SELECT email, password FROM Users WHERE email='${User.email}'`)
        .then((result, err) => {
            if(err) {
                throw err;
            }
            console.log('User found', result[0].password, SHA1(User.password))

            if (result[0].password == SHA1(User.password)) {
                console.log('Password verified')
                res.send(SHA1(User.email + 'geifvjn2n434'))
            } else {
                res.status(403).send('Unauthorized')
            }
        })
})

router.post('/design', validate, (req, res) => {
    /*
    {
        design: '' 
    }
    */
   console.log(req.body)
   executeQuery(`update Users set sale_model='${req.body.finalString}' where ID=${req.user.ID}`)
    .then((result, err) => {
        if(err) {
            throw err;
        }
        res.send('OK')
    })
})

router.get('/billing_software', validate, (req, res) => {
    executeQuery(`select sale_model from Users where ID=${req.user.ID}`)
        .then((result, err) => {
            if(err) {
                throw err;
            }
            console.log(`Request for Sale_Model ${result[0]}`)
            res.send(result[0].sale_model)
        })
})

module.exports = router