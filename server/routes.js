const db_broker = require('../broker/db_broker')

module.exports._SET = (app) => {
    // Test
    app.all('/', (req, res) => {
        res.send("connected")
    })

    // Select All
    app.get('/api', (req, res) => {
        db_broker.SelectAll().then(results=>{
            res.send(results)
        }).catch(err => {
            res.send(err)
        })
    })

    // Select by Prop
    app.get('/api/:prop/:val', (req, res) => {
        let prop = req.params.prop
        let val = req.params.val
        db_broker.FindBy(prop, val).then(results => {
            res.send(results)
        }).catch(err => {
            res.send(err)
        })
    })

    // Select order by 
    app.get('/api/:prop', (req, res) => {
        let prop = req.params.prop
        db_broker.SortBy(prop).then(results => {
            res.send(results)
        }).catch(err => {
            res.send(err)
        })
    })

    // Insert
    app.post('/api', (req,res)=>{
        console.log(req.params)
        console.log(req.body)
        db_broker.Insert(req.body)
        .then(
            results =>{
                res.send(results)
            }
        ).catch(err =>res.send(err))
    }) 
    
    // Update
    app.put('/api/:prop/:val', (req, res)=>{
        db_broker.Update(req.params.prop, req.params.val, req.body )
        .then(
            results =>{
                res.send(results)
            }
        ).catch(err =>res.send(err))
    })
    
    /* DELETE (DELETE) */
    app.delete('/api/:prop/:val', (req,res)=>{
        db_broker.Delete(req.params.prop, req.params.val)
        .then(
            results =>{
                res.send(results)
            }
        ).catch(err =>res.send(err))
    })
}