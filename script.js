document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('button');
        submitBtn.disabled = true;
        submitBtn.innerText = "WYSYŁANIE...";

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Specjalna obsługa checkboxów (muszą być true/false)
        data.zgoda1 = form.zgoda1.checked;
        data.zgoda2 = form.zgoda2.checked;

        try {
            const response = await fetch('/api/wniosek', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                alert('✅ Wniosek został wysłany do Kancelarii Sejmu!');
                form.reset();
            } else {
                const err = await response.json();
                alert(`❌ Błąd: ${err.error || 'Nieznany błąd serwera'}`);
            }
        } catch (error) {
            alert('❌ Błąd połączenia. Upewnij się, że serwer działa.');
            console.error(error);
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerText = "ZŁÓŻ WNIOSEK";
        }
    });
});
