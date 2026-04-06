import { pool } from './db';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { token, username } = req.body;

  try {
    const [dbRows] = await pool.execute('SELECT code FROM tokens WHERE token = ?', [token]);
    if (dbRows.length === 0) return res.status(404).json({ message: "Sesja wygasła" });

    const userRes = await fetch(`https://users.roblox.com/v1/usernames/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usernames: [username] })
    }).then(r => r.json());

    if (!userRes.data?.length) return res.status(404).json({ message: "Gracz nie istnieje" });
    const robloxId = userRes.data[0].id;

    const profile = await fetch(`https://users.roblox.com/v1/users/${robloxId}`).then(r => r.json());
    
    if (profile.description.includes(dbRows[0].code)) {
      await pool.execute('UPDATE tokens SET verified = true, roblox_id = ? WHERE token = ?', [robloxId.toString(), token]);
      return res.status(200).json({ success: true });
    } else {
      return res.status(400).json({ success: false, message: "Błąd: Kod nie został znaleziony w BIO!" });
    }
  } catch (e) {
    res.status(500).json({ message: "Błąd serwera" });
  }
}