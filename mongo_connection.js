import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const clientOptions = {
  serverApi: { version: '1', strict: true, deprecationErrors: true }
};

async function run() {
  try {
    await mongoose.connect(process.env.MONGO_URI, clientOptions);
    console.log("Connected to MongoDB via Mongoose!");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
}

run();

// Define the Mongoose schema and model
const entitySchema = new mongoose.Schema({
  runtime: String,
  array: String
});
const Entity = mongoose.model('arrays', entitySchema);

// Endpoint to fetch all entities
app.get('/array', async (req, res) => {
  try {
    const entities = await Entity.find().sort({ "runtime:" : -1 }); 
    res.json({ entities }); 
  } catch (error) {
    console.error('Error fetching entities:', error);
    res.status(500).json({ message: 'Error fetching entities', error });
  }
});

// Define the Mongoose schema and model
const entitySchemaMap = new mongoose.Schema({
  runtime: String,
  array: String
});
const EntityMap = mongoose.model('maps', entitySchemaMap);

// Endpoint to fetch all entities
app.get('/map', async (req, res) => {
  try {
    const entities = await EntityMap.find().sort({ "runtime:" : -1 }); 
    res.json({ entities }); 
  } catch (error) {
    console.error('Error fetching entities:', error);
    res.status(500).json({ message: 'Error fetching entities', error });
  }
});


const PORT = 27017;
app.listen(PORT, () => {
  console.log(`mongodb running on port ${PORT}`);
});


export default app;
