// Logs the requests made from hosts
module.exports._SET = (app) => {
    app.use('/', (req, res, next)=> {
        console.log(req.protocol + req.get('host') + req.originalUrl)
        console.log("request")
    })
}