const ROLE_ID = "1433485949681008842";
const WEBHOOK_URL = "https://discord.com/api/webhooks/1501272079171981343/Bwt84LREQng6wqt9l0agX_zjDjx_ioa16kCYjRta9xUKEpIG9we3hmHZkFyvb_N5XK27";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const d = req.body;

  const embed = {
    title: "📄 NOWY WNIOSEK – KANCELARIA SEJMU",
    color: 0x8B0000,
    fields: [
      {
        name: "👤 DANE OSOBOWE",
        value: `**Imię i Nazwisko:** ${d.imie} ${d.drugieimie || ""} ${d.nazwisko}\n**Obywatelstwo:** ${d.obywatelstwo || "-"}`
      },
      {
        name: "🎮 TOŻSAMOŚĆ CYFROWA",
        value: `**Roblox Nick:** ${d.roblox_nick}\n**Roblox ID:** \`${d.roblox_id}\`\n**Discord Nick:** ${d.discord_nick}\n**Discord ID:** <@${d.discord_id}> (\`${d.discord_id}\`)`
      },
      {
        name: "🏠 ADRES",
        value: `${d.ulica} ${d.dom}\n${d.kod} ${d.miasto}\nwoj. ${d.woj}`
      },
      {
        name: "🏢 WYDZIAŁ I OPIS",
        value: `**Wydział:** ${d.wydzial}\n**Opis działalności:** ${d.opis}`
      },
      {
        name: "✅ OŚWIADCZENIA",
        value: `Dane prawdziwe: ${d.zgoda1 ? "TAK" : "NIE"}\nZgoda RP: ${d.zgoda2 ? "TAK" : "NIE"}`
      }
    ],
    footer: { text: "System Ewidencji Kancelarii Sejmu" },
    timestamp: new Date().toISOString()
  };

  try {
    await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: `<@&${ROLE_ID}>`,
        embeds: [embed]
      })
    });
    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ error: "Błąd wysyłki" });
  }
}
