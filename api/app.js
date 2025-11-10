const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
app.use(express.json());

// Configura la conexión a MongoDB
const uri = "mongodb+srv://bferfer:QZ1zBVzYrZilu6d4@cluster0.tgbjhs7.mongodb.net/?appName=Cluster0";
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

// Función para conectar a la base de datos y obtener las colecciones
async function connectToMongoDB() {
    try {
        await client.connect();
        console.log("Conectado a MongoDB Atlas");
        const db = client.db('Restaurante');
        return {
            pedidos: db.collection('Contro_pedidos'),
            mesas: db.collection('Mesas'),
            menus: db.collection('Menus') 
        };
    } catch (error) {
        console.error("Error al conectar a MongoDB:", error);
        throw new Error('Error al conectar a la base de datos');
    }
}
// Middleware para manejar CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
// Ruta para obtener los pedidos,mesas y menus
app.get('/api/pedidos',async (req, res) => {
    try {
        const { pedidos } = await connectToMongoDB();
        const lis_pedidos = await pedidos.find().toArray();
        console.log("pedidos: ",lis_pedidos);
        res.json("Lista de Pedidos",lis_pedidos);
    } catch (error) {
        console.error("Error al obtener empleados:", error);
        res.status(500).json({ error: 'Error al obtener empleados' });    
    }
});
app.get('/api/mesas',async (req,res)=>{
    try{
        const{mesas}=await connectToMongoDB();
        const lis_mesas = await mesas.find().toArray();
        console.log("Lista de mesas:",lis_mesas);
        res.json(lis_mesas);
    }catch(error){
        console.error("Error al obtener empleados:", error);
        res.status(500).json({ error: 'Error al obtener empleados' });   
    }
});
app.get('/api/menus',async (req,res)=>{
    try{
        const{menus}=await connectToMongoDB();
        const lis_menus = await menus.find().toArray()
        console.log("Lista de mesas:",lis_menus);
        res.json(lis_menus);
    }catch(error){
        console.error("Error al obtener empleados:", error);
        res.status(500).json({ error: 'Error al obtener empleados' });   
    }
});
module.exports = app;
