import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { JWT_SECRET_KEY, REFRESH_TOKEN_SECRET } from '../config/jwt.js';

const generateTokens = (userId) => {
  if (!userId) throw new Error('User ID is required to generate tokens');
    
  try {
    const accessToken = jwt.sign(
      { userId: userId },
      JWT_SECRET_KEY,
      { expiresIn: '15m' }
    );
        
    const refreshToken = jwt.sign(
      { userId: userId },
      REFRESH_TOKEN_SECRET,
      { expiresIn: '7d' }
    );
        
    return { accessToken, refreshToken };
  } catch (error) {
    throw new Error(`Token generation failed: ${error.message}`);
  }
};

const verifyRefreshToken = (token) => {
  try {
    if (!token) throw new Error('Refresh token is missing');
        
    const decoded = jwt.verify(token, REFRESH_TOKEN_SECRET);
    if (!decoded.userId) throw new Error('Invalid refresh token payload');
        
    return decoded.userId;
  } catch (error) {
    throw new Error(`Invalid refresh token: ${error.message}`);
  }
};

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const userId = await User.create(username, email, password);
    const { accessToken, refreshToken } = generateTokens(userId);
    
    res.status(201).json({
      message: 'Registration successful',
      accessToken,
      refreshToken,
      user: {
        id: userId,
        username,
        email
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isValid = await User.validatePassword(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const { accessToken, refreshToken } = generateTokens(user.id);

    res.json({
      message: 'Login successful',
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};

export const refreshTokenHandler = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ message: 'Refresh token is required' });
    }

    const userId = verifyRefreshToken(refreshToken);
    const { accessToken: newAccessToken, refreshToken: newRefreshToken } = generateTokens(userId);

    res.json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken
    });
  } catch (error) {
    console.error('Token refresh error:', error);
    res.status(401).json({ 
      message: 'Token refresh failed',
      error: error.message
    });
  }
};
