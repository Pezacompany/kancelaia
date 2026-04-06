const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token');
const verifyBtn = document.getElementById('verifyBtn');
const discordIdSpan = document.getElementById('discord-id');

async function loadSession() {
    if (!token) {
        alert("Błąd: Brak tokenu!");
        return;
    }
    
    try {
        // Pobieramy dane o sesji z API
        const res = await fetch(`/api/roblox-login?token=${token}`);
        const data = await res.json();
        
        if (data.error) {
            discordIdSpan.innerText = "SESJA WYGASŁA";
            verifyBtn.disabled = true;
        } else {
            // Tutaj wstawiamy Discord ID użytkownika, żeby widział kogo weryfikuje
            discordIdSpan.innerText = data.discord_id || "Wykryto sesję";
        }
    } catch (e) {
        discordIdSpan.innerText = "Błąd połączenia";
    }
}

loadSession();

verifyBtn.addEventListener('click', async () => {
    verifyBtn.disabled = true;
    verifyBtn.innerText = "GENEROWANIE...";

    try {
        const res = await fetch(`/api/roblox-login?token=${token}`);
        const data = await res.json();

        const robloxNick = prompt(`TWOJA AUTORYZACJA ROBLOX\n\nKOD: ${data.code}\n\n1. Wklej ten kod do Bio na Roblox.\n2. Wpisz swój nick z Roblox poniżej:`);

        if (robloxNick) {
            verifyBtn.innerText = "SPRAWDZANIE...";
            const checkRes = await fetch('/api/check', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, username: robloxNick })
            });

            const result = await checkRes.json();
            if (result.success) {
                alert("✅ KONTO POWIĄZANE POMYŚLNIE!");
                window.location.href = "https://www.roblox.com/groups/" + process.env.GROUP_ID; // Opcjonalne przekierowanie
            } else {
                alert("❌ BŁĄD: " + result.message);
                verifyBtn.disabled = false;
                verifyBtn.innerText = "SPRÓBUJ PONOWNIE";
            }
        } else {
            verifyBtn.disabled = false;
            verifyBtn.innerText = "POBIERZ KOD I WERYFIKUJ";
        }
    } catch (err) {
        alert("Błąd krytyczny API.");
        verifyBtn.disabled = false;
    }
});
