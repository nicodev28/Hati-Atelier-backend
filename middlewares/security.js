function checkPassword(req, res, next)  {
    if(req.query.token === '799995d55623c7b119ecef808f59afce') {
        next()
    } else {
        res.status(403).json({
            message: 'You shall not pass!'
        })
    }
}


module.exports = checkPassword;