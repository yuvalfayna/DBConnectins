// שירות האחראי על יצירת וניהול החיבור של צד הלקוח עם המונגו
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
// יצירת חיבור עם המונגו
async function run() {
  try {
    await mongoose.connect(process.env.MONGO_URI, clientOptions);
    console.log("Connected to MongoDB via Mongoose!");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
}

run();

// הגדרת הסכמה ממנה נשאוב את המידע לתוך הנקודת קצה של דף הגרף
const entitySchema = new mongoose.Schema({
  runtime: String,
  array: String
});
const Entity = mongoose.model('arrays', entitySchema);

// הגדרת נקודת קצה ששואבת את המידע מהמונגו ומנגישה אותו ללקוח בדף הגרף
app.get('/array', async (req, res) => {
  try {
    const entities = await Entity.find().sort({ "runtime:" : -1 }); 
    res.json({ entities }); 
  } catch (error) {
    console.error('Error fetching entities:', error);
    res.status(500).json({ message: 'Error fetching entities', error });
  }
});

// הגדרת הסכמה ממנה נשאוב את המידע לתוך דף המפה
const entitySchemaMap = new mongoose.Schema({
  runtime: String,
  array: String
});
const EntityMap = mongoose.model('maps', entitySchemaMap);

// נקודת קצה ששואבת את המידע מהמונגו ומנגישה אותו ללקוח בדף המפה
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
