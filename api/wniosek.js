const ROLE_ID = "1433485949681008842";
const WEBHOOK_URL = "https://discord.com/api/webhooks/1501272079171981343/Bwt84LREQng6wqt9l0agX_zjDjx_ioa16kCYjRta9xUKEpIG9we3hmHZkFyvb_N5XK27";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Użyj metody POST" });
  }

  const d = req.body;

  const embed = {
    title: "📄 NOWY WNIOSEK – KANCELARIA SEJMU",
    color: 0x8B0000,
    fields: [
      { name: "👤 OSOBA", value: `**${d.imie} ${d.nazwisko}**\nObywatelstwo: ${d.obywatelstwo || "-"}` },
      { name: "🎮 KONTA", value: `Roblox: ${d.roblox_nick} (\`${d.roblox_id}\`)\nDiscord: <@${d.discord_id}>` },
      { name: "🏢 WYDZIAŁ", value: `**${d.wydzial}**\n${d.opis}` }
    ],
    footer: { text: "System Ewidencji Kancelarii Sejmu" },
    timestamp: new Date().toISOString()
  };

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: `<@&${ROLE_ID}>`,
        embeds: [embed]
      })
    });

    if (response.ok) return res.status(200).json({ ok: true });
    return res.status(500).json({ error: "Błąd Discorda" });
  } catch (err) {
    return res.status(500).json({ error: "Błąd serwera" });
  }
}
