const router = require('express').Router()

const executeQuery = require('../middleware/sql_connector')
const SHA1 = require('../middleware/hash')
const validate = require('../middleware/validateUser')

router.get('/user', validate, (req, res) => {
    console.log(req.user)
})

router.post('/signup', async (req, res) => {
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
                                await executeQuery(`CREATE TABLE Employee${userId} (ename varchar(100), eage INT, egender ENUM('Male', 'Female', 'Other'), eusername varchar(100) not null, epassword varchar(100) not null )`)
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

    executeQuery(`SELECT email, password FROM Users WHERE email='${User.email}'`)
        .then((result, err) => {
            if(err) {
                throw err;
            }
            if(result[0].password == User.password) {
                res.send(SHA1(User.email + 'geifvjn2n434'))
            }
        })
})

module.exports = router