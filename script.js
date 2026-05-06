// --- SYSTEM ŁADOWANIA (MAX 5 SEKUND) ---
function startSystem() {
    const loader = document.getElementById('preloader');
    const doc = document.getElementById('doc');

    // Po 5 sekundach ukrywamy loader i pokazujemy dokument
    setTimeout(() => {
        loader.style.opacity = '0';
        
        setTimeout(() => {
            loader.style.display = 'none';
            doc.style.display = 'block';
            doc.style.opacity = '1';
        }, 800); // czas na płynne zniknięcie
    }, 5000); 
}

// Odpal start przy załadowaniu strony
window.onload = startSystem;

// --- OBSŁUGA FORMULARZA ---
document.getElementById('form').addEventListener('submit', async (e) => {
    e.preventDefault();

    // OKNO POTWIERDZENIA
    const isSure = confirm("CZY JESTEŚ PEWNY?\n\nWysłanie dokumentu jest oficjalne i nie można go cofnąć. Czy wszystkie dane są poprawne?");
    
    if (!isSure) return;

    const btn = document.getElementById('btn');
    btn.innerText = "PRZESYŁANIE...";
    btn.disabled = true;

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
        const res = await fetch('/api/wniosek', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (res.ok) {
            alert('DOKUMENT ZOSTAŁ ZAREJESTROWANY.');
            e.target.reset();
        } else {
            alert('BŁĄD SERWERA KANCELARII.');
        }
    } catch (err) {
        alert('BRAK POŁĄCZENIA Z API.');
    } finally {
        btn.innerText = "ZATWIERDŹ I WYŚLIJ DOKUMENT";
        btn.disabled = false;
    }
});
