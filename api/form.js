const ROLE_ID = "1433485949681008842";
const WEBHOOK_URL = "https://discord.com/api/webhooks/1501272079171981343/Bwt84LREQng6wqt9l0agX_zjDjx_ioa16kCYjRta9xUKEpIG9we3hmHZkFyvb_N5XK27";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const d = req.body;

    const embed = {
      title: "📄 NOWY WNIOSEK – KANCELARIA SEJMU",
      color: 0x8B0000,
      fields: [
        {
          name: "👤 DANE OSOBOWE",
          value: `**Imię i Nazwisko:** ${d.imie || "?"} ${d.drugieimie || ""} ${d.nazwisko || "?"}\n**Obywatelstwo:** ${d.obywatelstwo || "-"}`
        },
        {
          name: "🎮 TOŻSAMOŚĆ CYFROWA",
          value: `**Roblox Nick:** ${d.roblox_nick || "Brak"}\n**Roblox ID:** \`${d.roblox_id || "0"}\`\n**Discord Nick:** ${d.discord_nick || "Brak"}\n**Discord ID:** <@${d.discord_id || "0"}> (\`${d.discord_id || "0"}\`)`
        },
        {
          name: "🏠 ADRES",
          value: `${d.ulica || "Brak"} ${d.dom || ""}\n${d.kod || "00-000"} ${d.miasto || "Brak"}\nwoj. ${d.woj || "Brak"}`
        },
        {
          name: "🏢 WYDZIAŁ I OPIS",
          value: `**Wydział:** ${d.wydzial || "Nieokreślony"}\n**Opis działalności:** ${d.opis ? d.opis.substring(0, 1000) : "Brak opisu"}`
        },
        {
          name: "✅ OŚWIADCZENIA",
          value: `Dane prawdziwe: ${d.zgoda1 ? "TAK" : "NIE"}\nZgoda RP: ${d.zgoda2 ? "TAK" : "NIE"}`
        }
      ],
      footer: { text: "System Ewidencji Kancelarii Sejmu" },
      timestamp: new Date().toISOString()
    };

    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: `<@&${ROLE_ID}>`,
        embeds: [embed]
      })
    });

    if (!response.ok) {
      const errData = await response.json();
      return res.status(response.status).json({ error: "Discord Error", details: errData });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ error: "Błąd serwera", message: err.message });
  }
}
