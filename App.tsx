
import React, { useState, useEffect } from 'react';

// ========================================================
// CONFIGURAÇÕES DE INTEGRAÇÃO REAL
// ========================================================
const SEU_LINK_KIWIFY = "https://pay.kiwify.com.br/GPsLBgH";
const SUPABASE_URL = "https://kcohmzqukmkoutnjadgu.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_vXP2EU9mKXwKXicuI0vfdA_k8iZvV2e";

const Navbar = ({ onBackToHome, scrollTo }: { onBackToHome: () => void, scrollTo: (id: string) => void }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={onBackToHome}>
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center font-black text-white shadow-xl shadow-purple-500/20">L</div>
            <span className="text-xl md:text-2xl font-black tracking-tighter text-white uppercase">
              LOVABLE<span className="text-purple-500">PRO</span>
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-8 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
            <button onClick={() => scrollTo('problema')} className="hover:text-purple-400 transition-colors">O Problema</button>
            <button onClick={() => scrollTo('tecnologia')} className="hover:text-purple-400 transition-colors">Tecnologia</button>
            <button onClick={() => scrollTo('faq')} className="hover:text-purple-400 transition-colors">FAQ</button>
            <button onClick={() => scrollTo('preco')} className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-full transition-all shadow-lg shadow-purple-600/40 transform hover:scale-105 active:scale-95 font-black uppercase tracking-widest">
              Obter Licença
            </button>
          </div>
          <button onClick={() => scrollTo('preco')} className="md:hidden px-4 py-2 bg-purple-600 text-white text-[9px] rounded-full font-black uppercase">Comprar</button>
        </div>
      </div>
    </nav>
  );
};

const SuccessPage = () => {
  const [cpf, setCpf] = useState('');
  const [isValidated, setIsValidated] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const [debugInfo, setDebugInfo] = useState('');

  const downloadLink = "https://seu-link-de-download.com/lovable-pro-v2.zip";
  const tutorialVideoId = "dQw4w9WgXcQ"; 
  const supportGroupLink = "https://chat.whatsapp.com/seu-link-vip";

  const formatCPF = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCpf(formatCPF(e.target.value));
  };

  const handleValidate = async () => {
    const cleanCpf = cpf.replace(/\D/g, ''); 
    
    if (cleanCpf.length < 11) {
      setError('CPF incompleto.');
      return;
    }

    setIsVerifying(true);
    setError('');
    setDebugInfo('');

    try {
      const response = await fetch(
        `${SUPABASE_URL}/rest/v1/compradores?cpf=eq.${cleanCpf}&select=*`, 
        {
          method: 'GET',
          headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        setDebugInfo(`Erro ${response.status}: Falha no banco.`);
        throw new Error('Falha');
      }

      const data = await response.json();

      if (data && data.length > 0) {
        setIsValidated(true);
      } else {
        setError('CPF não autorizado.');
        setDebugInfo('Dica: Verifique se o CPF foi inserido corretamente na sua tabela do Supabase.');
      }
    } catch (err) {
      setError('Erro de conexão.');
    } finally {
      setIsVerifying(false);
    }
  };

  if (!isValidated) {
    return (
      <div className="min-h-screen pt-32 pb-16 flex items-center justify-center px-4 bg-grid">
        <div className="max-w-md w-full bg-[#0d0d0d] border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-3xl text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600"></div>
          <div className="w-16 h-16 bg-indigo-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-indigo-400">
             <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
          </div>
          <h2 className="text-2xl font-black text-white uppercase italic mb-2 tracking-tighter">Área do Aluno</h2>
          <p className="text-gray-500 text-[10px] mb-10 uppercase tracking-widest font-bold">Acesso restrito a compradores</p>
          <div className="space-y-6 text-left">
            <div className="relative">
              <label className="text-[9px] uppercase font-black text-gray-500 tracking-widest ml-1 mb-2 block">CPF da Compra:</label>
              <input 
                type="text" 
                placeholder="000.000.000-00"
                value={cpf}
                onChange={handleCpfChange}
                className="w-full bg-black border border-white/10 rounded-xl py-5 px-6 text-white focus:outline-none focus:border-indigo-500 transition-all font-mono text-center tracking-[0.2em] text-xl"
                maxLength={14}
              />
            </div>
            {error && (
              <div className="space-y-2">
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-[10px] font-black uppercase tracking-wider text-center">{error}</div>
                {debugInfo && <p className="text-[8px] text-gray-600 uppercase text-center font-bold px-2">{debugInfo}</p>}
              </div>
            )}
            <button 
              onClick={handleValidate}
              disabled={isVerifying}
              className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-800 text-white font-black rounded-xl transition-all uppercase tracking-widest text-sm"
            >
              {isVerifying ? 'AUTENTICANDO...' : 'LIBERAR DOWNLOADS'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-16 bg-grid relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl mx-auto px-4 relative z-10 text-center">
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" /></svg>
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-white mb-4 uppercase italic">ACESSO LIBERADO</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mt-12">
          <div className="bg-[#0d0d0d] border border-green-500/20 p-10 rounded-[3rem]">
            <h3 className="text-xl font-black text-white mb-4 uppercase italic">SCRIPT V2.4</h3>
            <a href={downloadLink} className="block w-full py-5 bg-green-600 hover:bg-green-500 text-white font-black text-center rounded-2xl uppercase tracking-widest text-sm">BAIXAR ARQUIVOS</a>
          </div>
          <div className="bg-[#0d0d0d] border border-white/10 p-10 rounded-[3rem]">
            <h3 className="text-xl font-black text-white mb-4 uppercase italic">SUPORTE VIP</h3>
            <a href={supportGroupLink} target="_blank" className="block w-full py-5 bg-purple-600 hover:bg-purple-500 text-white font-black text-center rounded-2xl uppercase tracking-widest text-sm">ENTRAR NO GRUPO</a>
          </div>
        </div>
      </div>
    </div>
  );
};

const LandingPage = ({ scrollTo }: { scrollTo: (id: string) => void }) => {
  return (
    <div className="pt-32 pb-24 px-4 text-center bg-grid">
       <h1 className="text-5xl md:text-8xl font-black text-white mb-8 italic uppercase tracking-tighter">LOVABLE<span className="text-indigo-500">PRO</span></h1>
       <p className="text-gray-400 max-w-2xl mx-auto mb-12 text-lg">Automação técnica para créditos ilimitados. Pare de pagar caro em planos mensais.</p>
       <button onClick={() => scrollTo('preco')} className="px-12 py-6 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl text-xl shadow-2xl transition-all">LIBERAR MEU ACESSO</button>
       <section id="preco" className="mt-32">
          <div className="bg-[#0d0d0d] border border-indigo-500/30 p-12 rounded-[3rem] max-w-xl mx-auto">
             <span className="text-gray-500 line-through block mb-2 uppercase font-bold">De R$ 497,00</span>
             <h2 className="text-7xl font-black text-white mb-10 italic">R$ 197</h2>
             <a href={SEU_LINK_KIWIFY} target="_blank" className="block w-full py-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black rounded-2xl uppercase tracking-widest">ADQUIRIR LICENÇA AGORA</a>
          </div>
       </section>
    </div>
  );
};

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'success'>('home');

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      setView('home');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  useEffect(() => {
    // Lógica inteligente de detecção de rota
    const path = window.location.pathname;
    const params = new URLSearchParams(window.location.search);
    const hash = window.location.hash;

    if (path === '/success' || params.get('status') === 'success' || hash === '#success') {
      setView('success');
      // Limpa a URL visualmente para o usuário sem recarregar a página
      if (path === '/success') {
          window.history.replaceState({}, '', '/');
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-gray-100 font-['Plus_Jakarta_Sans']">
      <Navbar onBackToHome={() => setView('home')} scrollTo={scrollTo} />
      <main>
        {view === 'home' ? <LandingPage scrollTo={scrollTo} /> : <SuccessPage />}
      </main>
      <footer className="py-20 border-t border-white/5 text-center">
        <div className="text-gray-700 text-[10px] font-black uppercase tracking-widest">© 2025 LOVABLEPRO • INDEPENDENTE</div>
      </footer>
    </div>
  );
};

export default App;
