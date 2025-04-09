const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/crypto-tracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Transaction = mongoose.model('Transaction', {
  adresse: String,
  type: String,
  date: String,
  crypto: String,
  montant: Number,
  prix: Number
});

app.post('/api/transactions', async (req, res) => {
  const data = req.body;
  const transaction = new Transaction(data);
  await transaction.save();
  res.json({ success: true });
});

app.get('/api/transactions', async (req, res) => {
  const transactions = await Transaction.find();
  res.json(transactions);
});

app.listen(3000, () => console.log('Serveur en ligne sur http://localhost:3000'));
