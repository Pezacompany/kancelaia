import { pool } from './db';

export default async function handler(req, res) {
  const { token } = req.query;
  if (!token) return res.status(400).json({ error: "Brak tokenu" });

  try {
    // Pobieramy kod ORAZ discord_id z bazy
    const [rows] = await pool.execute('SELECT code, discord_id, verified FROM tokens WHERE token = ?', [token]);
    
    if (rows.length === 0) return res.status(404).json({ error: "Sesja nie istnieje lub wygasła" });
    
    // Wysyłamy te dane do frontendu
    res.status(200).json({ 
      code: rows[0].code, 
      discord_id: rows[0].discord_id,
      verified: rows[0].verified 
    });
  } catch (e) {
    res.status(500).json({ error: "Błąd bazy danych" });
  }
}
