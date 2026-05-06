// --- 1. EKRAN ŁADOWANIA (Gwarantowane 5 sekund) ---
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    const doc = document.getElementById('doc');

    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
            doc.style.display = 'block';
            setTimeout(() => doc.style.opacity = '1', 50);
        }, 500);
    }, 5000); // 5000ms = 5 sekund
});

// --- 2. OBSŁUGA FORMULARZA I MODALI ---
const form = document.getElementById('form');
const confirmModal = document.getElementById('confirmModal');
const statusModal = document.getElementById('statusModal');
const statusTitle = document.getElementById('statusTitle');
const statusText = document.getElementById('statusText');

let cachedData = null;

// Kliknięcie przycisku "Wyślij" otwiera modal
form.addEventListener('submit', (e) => {
    e.preventDefault();
    cachedData = new FormData(form);
    confirmModal.style.display = 'flex';
});

// Modal: Anuluj
document.getElementById('modal-no').onclick = () => {
    confirmModal.style.display = 'none';
};

// Modal: Potwierdź (Faktyczna wysyłka)
document.getElementById('modal-yes').onclick = async () => {
    confirmModal.style.display = 'none';
    const btn = document.getElementById('btn');
    btn.innerText = "PRZETWARZANIE...";
    btn.disabled = true;

    const data = Object.fromEntries(cachedData.entries());

    try {
        const res = await fetch('/api/wniosek', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (res.ok) {
            showStatus("DOKUMENT PRZYJĘTY", "Twój kwestionariusz został pomyślnie zarejestrowany w systemie.", "#2e7d32");
            form.reset();
        } else {
            showStatus("BŁĄD SYSTEMU", "Nie udało się połączyć z bazą danych Kancelarii.", "#8B0000");
        }
    } catch (err) {
        showStatus("BŁĄD KRYTYCZNY", "Brak odpowiedzi ze strony serwera.", "#8B0000");
    } finally {
        btn.innerText = "WYŚLIJ OFICJALNY KWESTIONARIUSZ";
        btn.disabled = false;
    }
};

// Funkcja pokazująca komunikat końcowy
function showStatus(title, message, color) {
    statusTitle.innerText = title;
    statusTitle.style.color = color;
    statusText.innerText = message;
    statusModal.style.display = 'flex';
}

// Zamknięcie komunikatu
document.getElementById('status-close').onclick = () => {
    statusModal.style.display = 'none';
};
