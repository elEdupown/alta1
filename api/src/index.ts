import express from 'express';
import cors from 'cors';
import {client, ObjectId} from './connect.js';

// Create a new express app instance
const app = express();
app.use(cors());
app.use(express.json());

// get a review by id
app.get('/review/:id', async (req, res) => {
    try {
        const result = await client.db('cards').collection('reviews').findOne({id: +req.params.id})
        res.json(result)
    } catch (error) {
        console.error(error)
        res.status(500).json({error: (error as Error).message})
    }
})

// get all reviews
app.get('/reviews', async (req, res) => {
    console.log(req.query)
    try {
        if (!req.query.card_id) {
            const result = await client.db('cards').collection('reviews').find().toArray()
            return res.json(result);
        }
        const result = await client.db('cards').collection('reviews').find({cardId: +req.query.card_id}).toArray()
        res.json(result)
    } catch (error) {
        console.error(error)
        res.status(500).json({error: (error as Error).message})
    }
});


// Create new review
app.post('/review', async (req, res) => {
    const {review, cardId, timestamp} = req.body
    if (!review || !cardId || !timestamp) {
        res.status(400).json({error: 'cardId, timestamp and review are required'})
        return;
    }
    try {
        const dbRes = await client.db('cards').collection('reviews').insertOne({cardId, review, timestamp})
        res.status(201).json({message: 'Review added', ...dbRes})
    } catch (error) {
        res.status(500).json({error: (error as Error).message})
    }
})
// update a review
app.put('/review', async (req, res) =>{
    const {id, review} = req.body
    if (!id || !review) {
        res.status(400).json({error: 'id and review are required'})
        return
    }
    try {
        const dbRes = await client.db('cards').collection('reviews').updateOne({_id: new ObjectId(id)}, {$set: {review: review}})
        res.status(201).json(dbRes);
    } catch (error) {
        res.status(500).json({error: (error as Error).message})
    }
})
// delete a review
app.delete('/review/:id', async (req, res) => {
    try {
        const dbRes = await client.db('cards').collection('reviews').deleteOne({_id: new ObjectId(req.params.id)})
        res.status(201).json(dbRes)
    } catch (error) {
        res.status(500).json({error: (error as Error).message})
    }
})
// create new card
app.post('/card', async (req,res)=>{
    // tomar los datos del request (data= carta)
    const {
        key,
        name,
        sc_key,
        elixir,
        type,
        rarity,
        arena,
        description,
        id
    } = req.body
    try {
        // guardar la carta en la base de datos
        console.log("bien1")
        await client.db('cards').collection('cards').insertOne({key, name, sc_key, elixir, type, rarity, arena, description, id})
        
        // devolver un mensaje de exito
        res.json({message: 'Card added'})
    } catch (error) {
        res.send(error)
    }
})

// get all cards
app.get('/cards', async (req,res)=>{
    // obtener las cartas de la base de datos
    try {
        const result = await client.db('cards').collection('cards').find({}).toArray()
        res.json(result)
    }
    catch (error) { 
        res.json(error)
    }
})
// get a card by id
app.get('/cards/:id', async (req,res)=>{
    try {
        const result = await client.db('cards').collection('cards').findOne({id: +req.params.id})
        res.json(result)
    }
    catch (error) { 
        res.json(error)
    }
})
// delete card
app.delete('/cards', async (req,res)=>{
    // obtener el id de la carta a eliminar)
    const {id} = req.body
    // eliminar la carta de la base de datos
    try {
        await client.db('cards').collection('cards').deleteOne({id})
        res.send('Card deleted')
    }
    catch (error) {
        res.send(error)
    }
    // devolver un mensaje de exito
})

// update a card
app.put('/cards', async (req,res)=>{
    const {
        key,
        name,
        sc_key,
        elixir,
        type,
        rarity,
        arena,
        description,
        id
    } = req.body
    // modificar la carta en la base de datos
    try {
        await client.db('cards').collection('cards').updateOne({id: id},{$set:{key, name, sc_key, elixir, type, rarity, arena, description, id}})
        res.send('Card updated')
    }
    catch (error) {
        res.send(error)
    }
    // devolver un mensaje de exito
})

const PORT = process.env.PORT || 80

app.listen(PORT, () => {console.log(`listening in port ${PORT}`)})