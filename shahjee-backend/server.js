const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/banners', require('./routes/bannerRoutes'));

app.get('/', (req, res) => {
  res.send('Shah Jee Laptops API Backend Running Successfully!');
});

const PORT = process.env.PORT || 5000;

// Local development ke liye server listen karega
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// Vercel Serverless Function ke liye App Export
module.exports = app;
