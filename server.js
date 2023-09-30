const express=require('express')
const app=express()
const port=4000
app.get('/',(req,res,next)=>{
    res.send('hello')
})

app.listen(port,()=>{
    console.log(`you are on port ${port}`)
})

