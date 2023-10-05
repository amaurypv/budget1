
/*Esta API permite realizar operaciones básicas en una lista de sobres, 
como agregar nuevos sobres, obtener detalles de sobres específicos, actualizar el 
presupuesto de un sobre, eliminar sobres y transferir presupuesto entre sobres.*/

//primero se traen las librerias necesarias, en este caso es express y el framework morgan
const express=require('express')
const app=express()
const morgan=require('morgan') //este framework sirve para darle formato a las respuestas en la consola
//se define el puerto en el que vamos a escuchar lo que le pidamos a express
const port=4000

//se definen los middleware
app.use(morgan('dev')) //middleware para dar formatos a las respuestas en la consola
app.use(express.json()) //middleware que hace lectura del formato json

//se define una lista con los sobres iniciales dentro de la lista van en forma de objetos.
const envelopes=[{'id':1,"budget":200,"title":"food"},{"id":2,"budget":300,"title":"clothes"}]

//se hace una prueba para ver si esta bien configurado el puerto
//la url en el browser debe de ser http://localhost:4000/
app.get('/',(req,res,next)=>{
    res.send('hello')
})

//se define el primer endpoint es un get por lo que se puede poner en un browser 
//este endpoint sirve para obtener los datos del sobre con el id.
//el url debe de ser http://localhost:4000/envelopes/1
app.get('/envelopes/:id',(req,res,next)=>{ //siempre se debe de poner req,res ya que puede enviar error, si lleva : significa que puede variar el valor en la url 
    const sobre=req.params.id //se define la variable obtenida en la ruta. 
    const siid=envelopes.find(x=>x.id==sobre) //se busca el elemento que cumpla con la condicion 
    if(siid){ //si cumple la condicion la variable debe de contener un dato
        res.send(siid) //se envia a la pagina el objeto que cumple con la condicion
    }else{
        res.send('no se encuentra el id') //en caso de que no se encuentre el id se manda un mensaje
    }
  console.log(siid)  //en la consola tambien se manda imprimir el objeto encontrado
})

//el segundo endpoint se utiliza para obtener la lista de los sobres 
//la url es http://localhost:4000/envelopes
app.get('/envelopes',(req,res,next)=>{
    res.json(envelopes) //se envia la pagina la lista completa
    console.log(envelopes)
})

// el tercer endpoint es un post esto quiere decir que se pueden agregar datos a la lista
//para un post se necesita un software como postman ya que en el browser solo sirve para los endpoint get
//este endpoint sirve para crear nuevos sobres. 
//el url del postman debe de ser http://localhost:4000/newenvelopes
app.post('/newenvelopes',(req,res,next)=>{  
    //se define una variable la cual va a tomas los datos que se ponen en el cuerpo de postman
    //en postman es importante seleccionar la opcion raw y que este en formato json 
    //una forma de como se debe agregar el json en el cuerpo es {"id":3,"budget":330, "title":"services"}
    const nuevosobre=req.body 
    envelopes.push(nuevosobre) //se agrega la variable a la lista existente envelopes
    res.json(envelopes) //se envia la respuesta en forma de json
    console.log(nuevosobre) //imprime en la consola los datos del nuevo sobre
})

//este endpoint es un put, sirve para modificar los sobres
//las modificaciones se hacen a diferencia del post desde la url 
//por ejemplo el url http://localhost:4000/envelope/2/10 
//vamos a modificar el sobre 2 y le vamos a quitar 10 dolares.
app.put('/envelope/:id/:bud',(req,res,next)=>{
    const pathid=req.params.id //se define el id desde la url
    const newbudget=req.params.bud //se define la cantidad a quitar desde la url
    const indiceId=envelopes.findIndex(x=>x.id==pathid) //buscamos si se encuentra el id en la lista.
    if(indiceId!=-1){ //cuando no se cumple con la condicion arroja -1 por eso se pone si el indice no es -1
        envelopes[indiceId].budget-=newbudget //se resta el valor que se definió en la url
        res.send(envelopes[indiceId]) 
    }else{
        res.send('no existe el id')
    }
    console.log(envelopes[indiceId])
})
//este endpoint nos sirve para eliminar un sobre que se encuentra en la lista. este solo se puede usar en postman
//la url http://localhost:4000/envelope/delete/1 para eliminar el sobre con el id 1.
app.delete('/envelope/delete/:id',(req,res,next)=>{
    const sobre=req.params.id//se define la variable a partir de la url
    const indiceId=envelopes.findIndex(x=>x.id==sobre) //buscamos si se encuentra el id en la lista.
    if(indiceId!=-1){
        envelopes.splice(indiceId,1) //si cumple con la condicion se elimina el elemento del indice
                        //tiene ,1 porque el splice funciona (indice,numero de elementos a eliminar)
        res.json({mensaje:`se eliminó el id`})
    }else{
        res.send('no se encontró el id')
    }
    console.log(`se eliminó el sobre de ${envelopes[indiceId][title]}`)
})

//este endpoint envia dinero de un sobre existente a otro existente
//la url http://localhost:4000/envelopes/switch/food-clothes/100
app.post('/envelopes/switch/:from-:to/:qty',(req,res,next)=>{ //se usa :from-:to y se escribe food-clothes
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

//siempre se debe de poner app.listen y el puerto en el que se va a ejecutar
app.listen(port,()=>{
    console.log(`you are on port ${port}`)
})

