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
    const siid=envelopes.find(x=>x.id==sobre)
    if(siid){
        res.send(siid)
    }else{
        res.send('no se encuentra el id')
    }
  console.log(siid)  
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

app.put('/envelope/:id/:bud',(req,res,next)=>{
    const pathid=req.params.id
    const newbudget=req.params.bud
    const indiceId=envelopes.findIndex(x=>x.id==pathid)
    if(indiceId!=-1){
        envelopes[indiceId].budget=newbudget
        res.send(envelopes[indiceId])
    }else{
        res.send('no existe el id')
    }

})


app.listen(port,()=>{
    console.log(`you are on port ${port}`)
})

