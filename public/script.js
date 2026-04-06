// Pobranie parametrów z linku (token)
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token');
const verifyBtn = document.getElementById('verifyBtn');

verifyBtn.addEventListener('click', async () => {
    // Zabezpieczenie przed brakiem tokenu w URL
    if (!token) return alert("Brak tokenu! Wygeneruj nowy link na Discordzie.");

    // Zmiana stanu przycisku (loading)
    verifyBtn.disabled = true;
    verifyBtn.innerText = "Ładowanie...";

    try {
        // 1. Pobranie kodu weryfikacyjnego z Twojego API na Vercel
        const res = await fetch(`/api/roblox-login?token=${token}`);
        const data = await res.json();

        if (data.error) throw new Error(data.error);

        // 2. Wyświetlenie instrukcji i pobranie nicku od użytkownika
        const username = prompt(`TWÓJ KOD: ${data.code}\n\nWklej go do opisu profilu Roblox, a potem wpisz swój nick tutaj:`);

        if (username) {
            // 3. Wysłanie danych do sprawdzenia BIO na Roblox
            const checkRes = await fetch('/api/check', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, username })
            });

            const result = await checkRes.json();

            // 4. Obsługa wyniku weryfikacji
            if (result.success) {
                alert("Zweryfikowano pomyślnie!");
                verifyBtn.innerText = "ZWERYFIKOWANO";
            } else {
                alert("Błąd: " + result.message);
                verifyBtn.disabled = false;
                verifyBtn.innerText = "Spróbuj ponownie";
            }
        } else {
            // Jeśli użytkownik zamknął okno prompt bez wpisania nicku
            verifyBtn.disabled = false;
            verifyBtn.innerText = "Przejdź do weryfikacji";
        }

    } catch (err) {
        // Obsługa błędów technicznych (np. brak połączenia z bazą)
        alert("Błąd: " + err.message);
        verifyBtn.disabled = false;
        verifyBtn.innerText = "Przejdź do weryfikacji";
    }
});