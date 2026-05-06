const ROLE_ID = "1433485949681008842";
const WEBHOOK_URL = "https://discord.com/api/webhooks/1501272079171981343/Bwt84LREQng6wqt9l0agX_zjDjx_ioa16kCYjRta9xUKEpIG9we3hmHZkFyvb_N5XK27";

export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

    const d = req.body;

    const embed = {
        title: "📄 OFICJALNY KWESTIONARIUSZ OSOBOWY",
        color: 0x8B0000,
        thumbnail: { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Coat_of_arms_of_Poland.svg/1200px-Coat_of_arms_of_Poland.svg.png" },
        fields: [
            { name: "👤 DANE OSOBOWE", value: `**Imię/Imiona:** ${d.imie} ${d.drugieimie || ""}\n**Nazwisko:** ${d.nazwisko}\n**Obywatelstwo:** ${d.obywatelstwo}\n**Miejsce zam.:** ${d.miasto}, woj. ${d.woj}` },
            { name: "🏠 ADRES", value: `ul. ${d.ulica} ${d.dom}, ${d.kod} ${d.miasto}` },
            { name: "🎮 TOŻSAMOŚĆ CYFROWA", value: `**Discord:** <@${d.discord_id}> (${d.discord_nick})\n**Roblox:** ${d.roblox_nick} [\`${d.roblox_id}\`]` },
            { name: "🏢 PRZYDZIAŁ", value: `**Wydział:** ${d.wydzial}\n**Zadania:** ${d.opis}` },
            { name: "⚖️ OŚWIADCZENIA", value: `Prawdziwość danych: ✅\nZgoda RP: ✅` }
        ],
        footer: { text: "Dokument wygenerowany systemowo • Kancelaria Sejmu" },
        timestamp: new Date().toISOString()
    };

    try {
        await fetch(WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content: `<@&${ROLE_ID}>`, embeds: [embed] })
        });
        return res.status(200).json({ success: true });
    } catch (err) {
        return res.status(500).json({ error: "Błąd serwera" });
    }
}
