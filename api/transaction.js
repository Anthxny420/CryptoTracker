
import mongoose from 'mongoose'

const uri = process.env.MONGODB_URI

if (!global._mongoClientPromise) {
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  global._mongoClientPromise = mongoose.connection.asPromise()
}

const transactionSchema = new mongoose.Schema({
  adresse: String,
  type: String,
  date: String,
  crypto: String,
  montant: Number,
  prix: Number
})

const Transaction = mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema)

export default async function handler(req, res) {
  await global._mongoClientPromise

  if (req.method === 'POST') {
    const transaction = new Transaction(req.body)
    await transaction.save()
    res.status(200).json({ success: true })
  } else {
    res.status(405).end()
  }
}
