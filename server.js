const express=require('express')
const app=express()
const morgan=require('morgan')

const port=4000

app.use(morgan('dev'))
app.use(express.json())

const envelopes=[{'id':1,"budget":200,"title":"food"},{"id":2,"budget":300,"title":"clothes"}]
app.get('/',(req,res,next)=>{
    res.send('hello')
})

app.get('/envelopes/:id',(req,res,next)=>{
  const sobre=req.params.id
  envelopes.forEach(x=>{
    if (x.id==sobre){
        res.send(x)
    }else{
        res.send('no existe el id')
    }
  })
  console.log()  
}
)

app.get('/envelopes',(req,res,next)=>{
    res.json(envelopes)
    console.log(envelopes)
})

app.post('/newenvelopes',(req,res,next)=>{
    const nuevosobre=req.body
    envelopes.push(nuevosobre)
    res.json(envelopes)
    console.log(nuevosobre) 
})


app.listen(port,()=>{
    console.log(`you are on port ${port}`)
})

