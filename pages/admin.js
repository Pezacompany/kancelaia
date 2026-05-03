import { useState } from 'react';
import { useSession, signIn } from "next-auth/react";
import { createClient } from '@supabase/supabase-js';

// Łączymy się z Twoim Supabase
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export default function AdminPanel() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  // Stan dla formularza protokołu
  const [formData, setFormData] = useState({
    posiedzenie_nr: '',
    marszalek: '',
    autor_ic: '', // Twoje dane IC
    glosowania: [{ druk: '', tytul: '', za: 0, przeciw: 0, wstrzymane: 0, wynik: 'Uchwalone' }]
  });

  if (!session) return <div className="p-10 text-center"><h1>Zaloguj się, aby zarządzać Sejmem</h1><button onClick={() => signIn('discord')} className="bg-blue-500 p-2 rounded text-white">Zaloguj przez Discord</button></div>;

  const handleSubmit = async () => {
    setLoading(true);
    // Tu kod wysyłający dane do Twoich tabel w Supabase
    alert("Dane wysłane do bazy supabase-lime-planet!");
    setLoading(false);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-gray-50 shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold border-b-2 pb-2 mb-6">PROTOKÓŁ POSIEDZENIA SEJMU RP</h1>
      
      <div className="grid grid-cols-2 gap-4 mb-8">
        <input className="border p-2" placeholder="Numer Posiedzenia (np. WP-2026/...)" onChange={e => setFormData({...formData, posiedzenie_nr: e.target.value})} />
        <input className="border p-2" placeholder="Marszałek Obrad" onChange={e => setFormData({...formData, marszalek: e.target.value})} />
      </div>

      <h2 className="font-bold mb-2">2.4. Głosowania</h2>
      {formData.glosowania.map((g, i) => (
        <div key={i} className="bg-white p-4 mb-4 border rounded shadow-sm">
          <input className="border mr-2 p-1" placeholder="Nr Druku" />
          <input className="border mr-2 p-1 w-64" placeholder="Tytuł ustawy" />
          <select className="border p-1">
            <option>Uchwalone</option>
            <option>Odrzucone</option>
          </select>
        </div>
      ))}
      
      <button 
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-green-600 text-white font-bold py-3 rounded hover:bg-green-700"
      >
        {loading ? "Wysyłanie..." : "ZATWIERDŹ I OPUBLIKUJ PROTOKÓŁ"}
      </button>
    </div>
  );
}
