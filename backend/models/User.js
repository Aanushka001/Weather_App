import pool from '../config/database.js';
import bcrypt from 'bcryptjs';

class User {
  static async create(username, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.execute(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
    );
    return result.insertId;
  }

  static async findByEmail(email) {
    const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  }

  static async validatePassword(inputPassword, hashedPassword) {
    return bcrypt.compare(inputPassword, hashedPassword);
  }
}

export default User;