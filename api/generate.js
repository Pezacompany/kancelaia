import { pool } from './db';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { discord_id } = req.body;
  if (!discord_id) return res.status(400).json({ error: 'Missing discord_id' });

  const token = uuidv4();
  const verificationCode = "KS-" + Math.random().toString(36).substring(2, 8).toUpperCase();

  try {
    await pool.execute(
      'INSERT INTO tokens (token, discord_id, code, verified) VALUES (?, ?, ?, ?)',
      [token, discord_id, verificationCode, false]
    );
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers['host'];
    res.status(200).json({ url: `${protocol}://${host}/?token=${token}` });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}