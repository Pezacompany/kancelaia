document.getElementById('formWniosek').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const btn = document.getElementById('btn');
    btn.disabled = true;
    btn.innerText = "WYSYŁANIE...";

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('/api/wniosek', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert('✅ Wniosek wysłany!');
            e.target.reset();
        } else {
            alert('❌ Błąd serwera. Sprawdź konsolę.');
        }
    } catch (err) {
        alert('❌ Brak połączenia z API. Czy uruchomiłeś serwer?');
    } finally {
        btn.disabled = false;
        btn.innerText = "ZŁÓŻ WNIOSEK";
    }
});
