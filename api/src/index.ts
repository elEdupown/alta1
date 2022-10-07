import express from 'express';
import cors from 'cors';
//import { json } from 'body-parser';
import {client} from './connect.js';

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

// Create new review
app.post('/review', async (req, res) => {
    const {id, review} = req.body
    if (!id || !review) {
        res.status(400).json({error: 'id and review are required'})
        return
    }
    try {
        await client.db('cards').collection('reviews').insertOne({id, review})
        res.status(201).send('Review added')
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
        await client.db('cards').collection('reviews').updateOne({id: id}, {$set: {review: review}})
        res.status(201).send('Review updated')
    } catch (error) {
        res.status(500).json({error: (error as Error).message})
    }
})
// delete a review
app.delete('/review/:id', async (req, res) => {
    try {
        await client.db('cards').collection('reviews').deleteOne({id: +req.params.id})
        res.status(201).send('Review deleted')
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
        res.send('Card added')
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

app.listen(3000,() => {console.log('listening in port 3000')})