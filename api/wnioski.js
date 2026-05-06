const ROLE_ID = "1433485949681008842";
const WEBHOOK_URL = "https://discord.com/api/webhooks/1501272079171981343/Bwt84LREQng6wqt9l0agX_zjDjx_ioa16kCYjRta9xUKEpIG9we3hmHZkFyvb_N5XK27";

export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

    try {
        const d = req.body;
        const embed = {
            title: "📄 NOWY WNIOSEK – KANCELARIA SEJMU",
            color: 0x8B0000,
            fields: [
                { name: "👤 DANE OSOBOWE", value: `**Imię i Nazwisko:** ${d.imie || "?"} ${d.drugieimie || ""} ${d.nazwisko || "?"}\n**Obywatelstwo:** ${d.obywatelstwo || "-"}` },
                { name: "🎮 TOŻSAMOŚĆ", value: `**Roblox:** ${d.roblox_nick} (\`${d.roblox_id}\`)\n**Discord:** <@${d.discord_id}> (\`${d.discord_id}\`)` },
                { name: "🏠 ADRES", value: `${d.ulica || "Brak"} ${d.dom || ""}, ${d.kod || ""} ${d.miasto || ""}` },
                { name: "🏢 WYDZIAŁ", value: `**${d.wydzial}**\n${d.opis}` }
            ],
            footer: { text: "System Kancelarii Sejmu" },
            timestamp: new Date().toISOString()
        };

        const discordRes = await fetch(WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content: `<@&${ROLE_ID}>`, embeds: [embed] })
        });

        if (discordRes.ok) return res.status(200).json({ ok: true });
        else return res.status(500).json({ error: "Discord API Error" });

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}
