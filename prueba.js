const envelopes=[{'id':1,"budget":200,"title":"food"},{"id":2,"budget":300,"title":"clothes"},{"id":3,"budget":100,"title":"fun"}]
const valor=3
const nuevo=400
const indiceId=envelopes.findIndex(x=>x.id==valor)
console.log(envelopes[indiceId].budget)