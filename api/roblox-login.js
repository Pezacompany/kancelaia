import { pool } from './db';

export default async function handler(req, res) {
  const { token } = req.query;
  try {
    const [rows] = await pool.execute('SELECT code, verified FROM tokens WHERE token = ?', [token]);
    if (rows.length === 0) return res.status(404).json({ error: "Token nie istnieje" });
    res.status(200).json({ code: rows[0].code });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}