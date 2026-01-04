
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
      console.log(`[Diagnóstico] Tentando validar CPF: ${cleanCpf}`);
      
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
        const errText = await response.text();
        console.error(`[Erro Supabase] Status: ${response.status}`, errText);
        setDebugInfo(`Código HTTP: ${response.status}. Verifique se a tabela 'compradores' existe.`);
        throw new Error('Falha na resposta do servidor.');
      }

      const data = await response.json();
      console.log(`[Diagnóstico] Dados recebidos:`, data);

      if (data && data.length > 0) {
        setIsValidated(true);
      } else {
        setError('CPF não encontrado no banco de dados.');
        setDebugInfo('Dica: Certifique-se de que inseriu o CPF na tabela Supabase sem pontos ou traços.');
      }
    } catch (err) {
      setError('Erro crítico de conexão.');
      setDebugInfo('Possível causa: URL do Supabase incorreta ou falta de política RLS.');
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
          <h2 className="text-2xl font-black text-white uppercase italic mb-2 tracking-tighter">Portal de Acesso</h2>
          <p className="text-gray-500 text-[10px] mb-10 uppercase tracking-widest font-bold">Consulte sua compra pelo CPF</p>
          
          <div className="space-y-6 text-left">
            <div className="relative">
              <label className="text-[9px] uppercase font-black text-gray-500 tracking-widest ml-1 mb-2 block">Número do CPF:</label>
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
              className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-800 text-white font-black rounded-xl transition-all uppercase tracking-widest text-sm shadow-xl shadow-indigo-600/40"
            >
              {isVerifying ? 'CONECTANDO AO SUPABASE...' : 'LIBERAR ACESSO AGORA'}
            </button>
          </div>
          
          <div className="mt-10 pt-6 border-t border-white/5">
            <a href={supportGroupLink} className="text-indigo-400 text-[10px] font-black uppercase hover:underline">Precisa de ajuda com o acesso?</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-16 bg-grid relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[500px] bg-green-500/10 blur-[150px] pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
        <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(34,197,94,0.4)] animate-bounce-slow">
          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tighter uppercase italic leading-none">
          ACESSO <span className="text-green-500">APROVADO!</span>
        </h1>
        <p className="text-lg text-gray-400 mb-12 font-medium max-w-2xl mx-auto leading-tight italic">
          Sua licença está ativa. Faça o download dos arquivos abaixo.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mb-12">
          <div className="bg-[#0d0d0d] border border-green-500/20 p-10 rounded-[3rem] shadow-3xl hover:border-green-500/50 transition-all group">
            <div className="w-14 h-14 bg-green-600/20 rounded-2xl flex items-center justify-center mb-6 text-green-400">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            </div>
            <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tight italic">DOWNLOAD SCRIPT</h3>
            <p className="text-sm text-gray-500 mb-10 leading-relaxed">Instalador v2.4 estável.</p>
            <a href={downloadLink} className="block w-full py-5 bg-green-600 hover:bg-green-500 text-white font-black text-center rounded-2xl transition-all uppercase tracking-widest text-sm">
              BAIXAR (.ZIP)
            </a>
          </div>

          <div className="bg-[#0d0d0d] border border-white/10 p-10 rounded-[3rem] shadow-3xl hover:border-purple-500/40 transition-all group">
            <div className="w-14 h-14 bg-purple-600/20 rounded-2xl flex items-center justify-center mb-6 text-purple-400">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" /></svg>
            </div>
            <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tight italic">GRUPO DE SUPORTE</h3>
            <p className="text-sm text-gray-500 mb-10 leading-relaxed">Acesso à nossa comunidade VIP.</p>
            <a href={supportGroupLink} target="_blank" className="block w-full py-5 bg-purple-600 hover:bg-purple-500 text-white font-black text-center rounded-2xl transition-all uppercase tracking-widest text-sm">
              ENTRAR NO WHATSAPP
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// ... Restante do LandingPage e App permanecem os mesmos ...
const LandingPage = ({ scrollTo }: { scrollTo: (id: string) => void }) => {
  const [credits, setCredits] = useState(250);

  useEffect(() => {
    const interval = setInterval(() => {
      setCredits(prev => prev + Math.floor(Math.random() * 3));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-24 overflow-hidden bg-grid">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[500px] bg-purple-600/10 blur-[150px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8">
             <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
             <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Script v2.4 ON-LINE</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white mb-6 leading-[0.85] select-none uppercase italic">
            CRÉDITOS <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-indigo-500 to-purple-500 drop-shadow-sm">ILIMITADOS</span><br />
            NO LOVABLE.DEV
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto font-medium leading-tight">
            Pare de queimar dinheiro com planos caros. Use nossa automação segura para ganhar créditos de forma legítima e escalar seus projetos.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              onClick={() => scrollTo('preco')}
              className="w-full sm:w-auto px-12 py-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xl font-black rounded-2xl transition-all shadow-[0_20px_50px_rgba(99,102,241,0.3)] transform hover:-translate-y-2 active:scale-95 text-center"
            >
              LIBERAR ACESSO VITALÍCIO
            </button>
          </div>
        </div>
      </section>

      <section id="problema" className="py-24 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-left">
              <blockquote className="text-2xl md:text-5xl font-black text-white mb-10 leading-none uppercase tracking-tighter italic border-l-8 border-purple-600 pl-8">
                "Ficar sem créditos no meio de uma ideia brilhante é o <span className="text-purple-500">fim da produtividade."</span>
              </blockquote>
              <h3 className="text-xl font-bold text-white mb-4 uppercase italic">O custo oculto do Lovable</h3>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">Cada teste consome créditos valiosos. No final do mês, você acaba gastando centenas de dólares apenas para iterar seu código.</p>
              <div className="p-8 bg-indigo-900/10 border border-indigo-500/20 rounded-[2rem]">
                <h4 className="text-xl font-bold text-indigo-400 mb-2 uppercase tracking-widest">A Solução LovablePro:</h4>
                <p className="text-gray-400 text-sm leading-relaxed font-medium">Nossa automação utiliza o sistema de indicações para gerar créditos extras de forma orgânica e legítima.</p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-purple-600/15 blur-[100px] pointer-events-none"></div>
              <div className="relative bg-[#0d0d0d] border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-3xl overflow-hidden">
                <div className="flex justify-between items-center mb-10">
                  <div className="space-y-1">
                    <p className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-500">Live Dashboard</p>
                    <h4 className="text-2xl font-black text-white uppercase tracking-tighter italic">Status da Geração</h4>
                  </div>
                  <div className="px-4 py-1.5 bg-green-500/10 border border-green-500/30 rounded-full flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-500 font-black text-[9px] uppercase tracking-widest">ON-LINE</span>
                  </div>
                </div>
                <div className="bg-[#050505] p-10 rounded-[2rem] border border-white/5 relative">
                  <p className="text-gray-500 text-[11px] font-bold uppercase tracking-[0.3em] mb-2">Créditos Gerados Hoje:</p>
                  <div className="text-6xl md:text-8xl font-black text-white tracking-tighter italic leading-none">+{credits}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="tecnologia" className="py-24 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-16 uppercase italic">Engenharia Exclusiva</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {[
              {t: "Anti-Ban System", d: "Algoritmo que simula comportamento humano para evitar detecções.", i: "🛡️"},
              {t: "Multi-Session", d: "Capacidade de gerenciar múltiplas sessões simultâneas.", i: "⚡"},
              {t: "Auto-Update", d: "O script se atualiza sozinho conforme as APIs do Lovable mudam.", i: "🔄"}
            ].map((f, i) => (
              <div key={i} className="p-10 bg-[#0d0d0d] border border-white/5 rounded-[2.5rem] hover:border-purple-500/40 transition-all group">
                <div className="text-4xl mb-6 group-hover:scale-125 transition-transform inline-block">{f.i}</div>
                <h4 className="text-xl font-bold text-white mb-3 uppercase italic tracking-tight">{f.t}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="preco" className="py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-5xl md:text-8xl font-black text-white mb-12 tracking-tighter uppercase italic">OFERTA ÚNICA.</h2>
          <div className="bg-[#0d0d0d] rounded-[4rem] border border-indigo-500/30 p-12 md:p-20 relative overflow-hidden shadow-3xl group">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 to-transparent pointer-events-none"></div>
            <span className="text-gray-600 line-through text-2xl font-bold italic block mb-2 tracking-widest uppercase">De R$ 497,00</span>
            <div className="flex items-center justify-center gap-4 mb-10">
              <span className="text-5xl font-bold text-gray-500">R$</span>
              <span className="text-8xl md:text-[12rem] font-black text-white tracking-tighter italic leading-none">197</span>
            </div>
            <a href={SEU_LINK_KIWIFY} target="_blank" className="block w-full py-8 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-3xl font-black rounded-[2rem] transition-all shadow-[0_25px_60px_rgba(99,102,241,0.4)] uppercase tracking-widest text-center transform hover:scale-[1.03] active:scale-95">
              ADQUIRIR AGORA
            </a>
          </div>
        </div>
      </section>
    </>
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
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('status') === 'success' || params.get('purchase') === 'approved' || window.location.hash === '#success') {
      setView('success');
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-gray-100 font-['Plus_Jakarta_Sans'] selection:bg-indigo-500/30">
      <Navbar onBackToHome={() => setView('home')} scrollTo={scrollTo} />
      <main>
        {view === 'home' ? <LandingPage scrollTo={scrollTo} /> : <SuccessPage />}
      </main>
      <footer className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-purple-500 font-black text-2xl mb-8 tracking-tighter uppercase italic">Lovable<span className="text-white">Pro</span></div>
          <p className="text-[11px] text-gray-700 max-w-2xl mx-auto uppercase tracking-tighter leading-relaxed font-black italic">
            ESTE É UM PRODUTO TÉCNICO INDEPENDENTE DESENVOLVIDO POR TERCEIROS • NÃO POSSUI AFILIAÇÃO OFICIAL COM O DOMÍNIO LOVABLE.DEV
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
