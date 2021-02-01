import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Cards from './schema/dbCards.js'

// App configuration
const app = express();
const port = process.env.PORT || 8001;
const connection_url = `mongodb+srv://nitin:fpqQl7uNLg540IMI@cluster0.6tq9j.mongodb.net/tinderdb?retryWrites=true&w=majority`

// DB configuration
mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}, () => {
  console.log(`Mongodb is running`)
})

// Middleware configuration
app.use(express.json())
app.use(cors())

// API endpoints
app.post('/tinder/cards', async (req, res) => {
  const dbCard = req.body;
  Cards.create(dbCard, (err, data) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(201).send(data)
    }
  });
})

app.get('/tinder/cards', async (req, res) => {
  Cards.find((err, data) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(200).send(data)
    }
  });
})

app.get('/', (req, res) => {
  res.send({ message: 'API is working fine' })
})





// Listener
app.listen(port, () => console.log(`Server is running on port ${port}`));