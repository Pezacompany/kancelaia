// --- 1. EKRAN ŁADOWANIA ---
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    const doc = document.getElementById('doc');

    // Czekaj 5 sekund przed pokazaniem dokumentu
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
            doc.style.display = 'block';
        }, 500); // płynne przejście
    }, 5000);
});

// --- 2. OBSŁUGA FORMULARZA ---
document.getElementById('form').addEventListener('submit', async (e) => {
    e.preventDefault();

    // SYSTEM POTWIERDZEŃ
    const confirmMessage = "Czy jesteś pewny, że chcesz wysłać oficjalny kwestionariusz do Kancelarii Sejmu?\n\nUpewnij się, że wszystkie dane są poprawne. Po zatwierdzeniu dokument zostanie zarejestrowany w systemie.";
    
    if (!confirm(confirmMessage)) {
        return; // Jeśli użytkownik kliknie 'Anuluj', przerywamy
    }

    const btn = document.getElementById('btn');
    btn.innerText = "PRZESYŁANIE DOKUMENTU...";
    btn.disabled = true;

    // Zbieranie danych
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
        // Wywołanie Twojego API w folderze api/wniosek.js
        const res = await fetch('/api/wniosek', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (res.ok) {
            alert('✅ Dokument został pomyślnie wysłany i zarejestrowany w archiwum Kancelarii Sejmu.');
            e.target.reset();
        } else {
            const errorData = await res.json();
            alert(`❌ Błąd systemu: ${errorData.error || 'Nieznany błąd serwera'}`);
        }
    } catch (err) {
        console.error(err);
        alert('❌ Błąd krytyczny: Brak połączenia z serwerem Kancelarii. Sprawdź łącze internetowe.');
    } finally {
        btn.innerText = "ZATWIERDŹ I WYŚLIJ DOKUMENT";
        btn.disabled = false;
    }
});
