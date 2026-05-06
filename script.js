document.getElementById('form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('btn');
    btn.disabled = true;
    btn.innerText = "WYSYŁANIE...";

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
        const res = await fetch('/api/wniosek', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (res.ok) {
            alert('✅ Wysłano!');
            e.target.reset();
        } else {
            alert('❌ Błąd serwera.');
        }
    } catch (err) {
        alert('❌ Brak połączenia z API.');
    } finally {
        btn.disabled = false;
        btn.innerText = "ZŁÓŻ WNIOSEK";
    }
});
