export default async function handler(req, res) {
  const d = req.body;

  const webhook = "https://discord.com/api/webhooks/1501272079171981343/Bwt84LREQng6wqt9l0agX_zjDjx_ioa16kCYjRta9xUKEpIG9we3hmHZkFyvb_N5XK27";

  await fetch(webhook, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      embeds: [{
        title: "📄 Nowe zgłoszenie",
        color: 16711680,
        fields: Object.entries(d).map(([k,v]) => ({
          name: k,
          value: v ? String(v) : "-"
        })),
        timestamp: new Date()
      }]
    })
  });

  res.status(200).end();
}