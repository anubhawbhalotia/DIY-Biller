const SHA1 = require('./hash')
const executeQuery = require('./sql_connector')

const validate = (req, res, next) => {
    let email = req.headers.email, hash = req.headers.key
    console.log(SHA1(email + 'geifvjn2n434'), hash)
    if (SHA1(email +'geifvjn2n434') == hash) {
        console.log('Okay')
        executeQuery(`Select * from Users where email = '${email}'`)
            .then((result, err) => {
                if(err) {
                    throw err;
                }
                req.user = result[0]
                next()
            })
    } else {
        console.log('Doesn\'t match hash')
    }
}

module.exports = validate