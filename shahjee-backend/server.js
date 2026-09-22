const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

// 1. Full CORS Support (Includes OPTIONS preflight handling)
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true
}));

// Manual Preflight Handler for Vercel Serverless
app.options('*', cors());

// 2. Database Connection Middleware
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error("Database Connection Error:", err);
    res.status(500).json({ error: "Database connection failed" });
  }
});

app.use(express.json({ limit: '10mb' }));

// 3. API Routes
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/banners', require('./routes/bannerRoutes'));

app.get('/', (req, res) => {
  res.send('Shah Jee Laptops API Backend Running Successfully!');
});

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
