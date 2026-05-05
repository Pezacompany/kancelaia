const ROLE_ID = "1433485949681008842";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const d = req.body;
  const webhook = "https://discord.com/api/webhooks/1501272079171981343/Bwt84LREQng6wqt9l0agX_zjDjx_ioa16kCYjRta9xUKEpIG9we3hmHZkFyvb_N5XK27";

  const embed = {
    title: "📄 Nowe zgłoszenie – Kancelaria Sejmu",
    color: 0x8B0000, // ciemna czerwień
    description: "Nowy formularz został poprawnie złożony",
    fields: [
      {
        name: "DANE OSOBOWE",
        value:
          `**Imię:** ${d.imie || "-"}\n` +
          `**Drugie imię:** ${d.drugieimie || "-"}\n` +
          `**Nazwisko:** ${d.nazwisko || "-"}\n` +
          `**PESEL / ID:** ${d.pesel || "-"}\n` +
          `**Obywatelstwo:** ${d.obywatelstwo || "-"}`,
      },
      {
        name: "DOKUMENT",
        value:
          `**Typ:** ${d.typdokumentu || "-"}\n` +
          `**Numer:** ${d.numerdokumentu || "-"}`,
      },
      {
        name: "ADRES",
        value:
          `**Ulica:** ${d.ulica || "-"}\n` +
          `**Nr domu:** ${d.dom || "-"}\n` +
          `**Kod:** ${d.kod || "-"}\n` +
          `**Miasto:** ${d.miasto || "-"}\n` +
          `**Województwo:** ${d.woj || "-"}`,
      },
      {
        name: "KONTAKT",
        value:
          `**Email:** ${d.email || "-"}\n` +
          `**Discord:** <@${d.kontakt || "-"}>`,
      },
      {
        name: "DANE URZĘDOWE",
        value:
          `**Wydział:** ${d.wydzial || "-"}\n` +
          `**Instytucja:** ${d.instytucja || "-"}\n` +
          `**Opis:** ${d.opis || "-"}`,
      },
      {
        name: "OŚWIADCZENIA",
        value:
          `Dane prawdziwe: ${d.zgoda1 ? "TAK" : "NIE"}\n` +
          `Zgoda RODO: ${d.zgoda2 ? "TAK" : "NIE"}`
      }
    ],
    footer: {
      text: "System formularzy • Kancelaria Sejmu"
    },
    timestamp: new Date().toISOString()
  };

  await fetch(webhook, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: "System Wniosków",
      content: `<@&${ROLE_ID}>`, // Pingowanie roli
      embeds: [embed]
    })
  });

  res.status(200).json({ ok: true });
}
