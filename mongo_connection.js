import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables from .env file
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
    const entities = await Entity.find(); 
    res.json({ entities }); 
  } catch (error) {
    console.error('Error fetching entities:', error);
    res.status(500).json({ message: 'Error fetching entities', error });
  }
});


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Export the app for use in index.js
export default app; // הוספת שורה זו
