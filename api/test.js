import express from 'express';
import cors from 'cors';
import {client} from './out/connect.js';

const data = await client.db('cards').collection('cards').find({elixir: 3}).toArray()
console.log(data)

