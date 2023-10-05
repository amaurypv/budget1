

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
})

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
        envelopes[indiceId].budget-=newbudget
        res.send(envelopes[indiceId])
    }else{
        res.send('no existe el id')
    }
    console.log(envelopes[indiceId])
})

app.delete('/envelope/delete/:id',(req,res,next)=>{
    const sobre=req.params.id
    const indiceId=envelopes.findIndex(x=>x.id==sobre)
    if(indiceId!=-1){
        envelopes.splice(indiceId,1)
        res.json({mensaje:`se eliminó el id`})
    }else{
        res.send('no se encontró el id')
    }
    console.log(`se eliminó el sobre de ${envelopes[indiceId][title]}`)
})
    
app.post('/envelopes/switch/:from-:to/:qty',(req,res,next)=>{
    const desde=req.params.from
    const para=req.params.to
    const cantidad=parseInt(req.params.qty)
    const existedesde=envelopes.findIndex(x=>x.title==desde)
    const existepara=envelopes.findIndex(y=>y.title==para)
    if(existepara!=-1 && existedesde!=-1){
        envelopes[existedesde].budget-=cantidad
        envelopes[existepara].budget+=cantidad
        res.json(envelopes[existepara])
    }else{
        res.send('no existe alguno de los sobres')
    }
})


app.listen(port,()=>{
    console.log(`you are on port ${port}`)
})

