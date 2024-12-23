import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import weatherRouter from './routes/weatherRoutes.js';
import authRouter from './routes/authRoutes.js';
import { verifyToken } from './middleware/auth.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Weather API is running successfully!' });
});

app.use('/api/auth', authRouter);
app.use('/api/weather', weatherRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error',
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
