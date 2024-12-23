import dotenv from 'dotenv';
dotenv.config();

export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
