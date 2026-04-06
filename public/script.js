const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token');
const verifyBtn = document.getElementById('verifyBtn');
const discordIdSpan = document.getElementById('discord-id');

async function loadSession() {
    if (!token) {
        discordIdSpan.innerText = "BRAK SESJI";
        return;
    }
    
    try {
        const res = await fetch(`/api/roblox-login?token=${token}`);
        const data = await res.json();
        
        if (data.error) {
            discordIdSpan.innerText = "SESJA NIEWAŻNA";
            verifyBtn.disabled = true;
            verifyBtn.innerText = "LINK WYGASŁ";
        } else {
            // Wyświetlamy ID użytkownika z Discorda
            discordIdSpan.innerText = `@${data.discord_id}`;
            console.log("Sesja załadowana dla: " + data.discord_id);
        }
    } catch (e) {
        discordIdSpan.innerText = "BŁĄD POŁĄCZENIA";
    }
}

loadSession();

// Reszta logiki przycisku (prompt z kodem) zostaje taka sama jak wcześniej
