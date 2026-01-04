
import React, { useState, useEffect, useRef } from 'react';
import GeminiLab from './components/GeminiLab.tsx';
import { chatStream } from './services/gemini.ts';

// ========================================================
// CONFIGURAÇÕES E LINKS
// ========================================================
const SEU_LINK_KIWIFY = "https://pay.kiwify.com.br/GPsLBgH";
const LINK_WHATSAPP_SUPORTE = "https://wa.me/5500000000000"; 
const SUPABASE_URL = "https://kcohmzqukmkoutnjadgu.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_vXP2EU9mKXwKXicuI0vfdA_k8iZvV2e";

// ========================================================
// COMPONENTES AUXILIARES
// ========================================================

const FloatingAI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);
    
    let fullResponse = '';
    try {
      await chatStream(`O usuário está na landing page do LovablePro (automação de créditos para Lovable.dev). Responda de forma curta e persuasiva: ${userMsg}`, (chunk) => {
        fullResponse += chunk;
        setMessages(prev => {
          const last = prev[prev.length - 1];
          if (last?.role === 'model') {
            return [...prev.slice(0, -1), { role: 'model', text: fullResponse }];
          }
          return [...prev, { role: 'model', text: fullResponse }];
        });
      });
    } catch (e) {
      setMessages(prev => [...prev, { role: 'model', text: "Desculpe, estou processando muitas requisições. Como posso te ajudar com o LovablePro?" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[110]">
      {isOpen ? (
        <div className="w-80 md:w-96 h-[500px] bg-[#0d0d0d] border border-white/10 rounded-[2rem] shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="p-5 bg-indigo-600 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-[10px] font-black uppercase tracking-widest text-white">Assistente LovablePro</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white">✕</button>
          </div>
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-hide">
            {messages.length === 0 && (
              <div className="text-center py-10">
                <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Como posso te ajudar a escalar no Lovable hoje?</p>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-xs font-medium leading-relaxed ${m.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-white/5 text-gray-300 border border-white/5'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && <div className="text-[10px] text-indigo-400 animate-pulse font-bold uppercase tracking-widest">IA pensando...</div>}
          </div>
          <div className="p-4 border-t border-white/5 flex gap-2">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Pergunte sobre créditos..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
            />
            <button onClick={handleSend} className="p-2 bg-indigo-600 rounded-xl text-white">➔</button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-indigo-600 rounded-full shadow-2xl shadow-indigo-600/40 flex items-center justify-center text-white hover:scale-110 transition-all group active:scale-95"
        >
          <svg className="w-8 h-8 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
        </button>
      )}
    </div>
  );
};

const SalesNotification = () => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState({ name: '', city: '' });
  const names = ["Gabriel", "Lucas", "Mariana", "Ricardo", "Ana", "Felipe", "Juliana", "Marcos", "Beatriz", "Vinícius"];
  const cities = ["São Paulo", "Rio de Janeiro", "Curitiba", "Belo Horizonte", "Salvador", "Lisboa", "Florianópolis", "Brasília"];

  useEffect(() => {
    const showRandom = () => {
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomCity = cities[Math.floor(Math.random() * cities.length)];
      setData({ name: randomName, city: randomCity });
      setVisible(true);
      setTimeout(() => setVisible(false), 5000);
    };
    const interval = setInterval(showRandom, 18000 + Math.random() * 10000);
    const timeout = setTimeout(showRandom, 4000);
    return () => { clearInterval(interval); clearTimeout(timeout); };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-[100] bg-[#0d0d0d] border border-white/10 p-4 rounded-2xl shadow-2xl flex items-center gap-4 animate-bounce-slow max-w-[300px] backdrop-blur-md">
      <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold shrink-0 shadow-lg shadow-indigo-600/20">{data.name[0]}</div>
      <div>
        <p className="text-[11px] text-white font-bold leading-tight">{data.name} de {data.city}</p>
        <p className="text-[9px] text-green-500 uppercase font-black tracking-widest mt-1 flex items-center gap-1">
          <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></span>
          Acabou de garantir a licença
        </p>
      </div>
    </div>
  );
};

const Navbar = ({ onBackToHome, scrollTo }: { onBackToHome: () => void, scrollTo: (id: string) => void }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={onBackToHome}>
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center font-black text-white shadow-xl shadow-purple-500/20">L</div>
            <span className="text-xl md:text-2xl font-black tracking-tighter text-white uppercase italic">
              LOVABLE<span className="text-purple-500">PRO</span>
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-8 text-[9px] font-black uppercase tracking-[0.2em] text-gray-500">
            <button onClick={() => scrollTo('problema')} className="hover:text-purple-400 transition-colors">O Problema</button>
            <button onClick={() => scrollTo('tecnologia')} className="hover:text-purple-400 transition-colors">A Solução</button>
            <button onClick={() => scrollTo('lab')} className="hover:text-purple-400 transition-colors">O Lab</button>
            <button onClick={() => scrollTo('depoimentos')} className="hover:text-purple-400 transition-colors">Feedback</button>
            <button onClick={() => scrollTo('faq')} className="hover:text-purple-400 transition-colors">Dúvidas</button>
            <button onClick={() => scrollTo('preco')} className="px-6 py-2.5 bg-indigo-600 text-white rounded-full transition-all hover:bg-indigo-500 font-black shadow-lg shadow-indigo-600/20">
              OBTER LICENÇA
            </button>
          </div>
          <button onClick={() => scrollTo('preco')} className="md:hidden px-4 py-2 bg-purple-600 text-white text-[9px] rounded-full font-black uppercase">Comprar</button>
        </div>
      </div>
    </nav>
  );
};

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/5 last:border-0">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full py-6 flex justify-between items-center text-left focus:outline-none group">
        <span className="text-lg md:text-xl font-bold text-white uppercase italic tracking-tight group-hover:text-indigo-400 transition-colors">{question}</span>
        <span className={`text-2xl transition-transform duration-300 ${isOpen ? 'rotate-45 text-red-500' : 'text-indigo-500'}`}>+</span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
        <p className="text-gray-500 text-base leading-relaxed font-medium">{answer}</p>
      </div>
    </div>
  );
};

// ========================================================
// PÁGINA DE SUCESSO (ÁREA DE MEMBROS)
// ========================================================

const SuccessPage = () => {
  const [cpf, setCpf] = useState('');
  const [isValidated, setIsValidated] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);

  const handleValidate = async () => {
    const cleanCpf = cpf.replace(/\D/g, ''); 
    if (cleanCpf.length < 11) { setError('Digite o CPF completo.'); return; }
    setIsVerifying(true); setError('');
    
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/compradores?cpf=eq.${cleanCpf}&select=*`, {
        headers: { 'apikey': SUPABASE_ANON_KEY, 'Authorization': `Bearer ${SUPABASE_ANON_KEY}` }
      });
      const data = await res.json();
      if (data?.length > 0) {
        setShowConfetti(true);
        setTimeout(() => setIsValidated(true), 1500);
      } else {
        setError('CPF não encontrado no banco de dados.');
      }
    } catch (err) {
      setError('Erro de conexão. Verifique sua internet.');
    } finally {
      setIsVerifying(false);
    }
  };

  const formatCPF = (v: string) => {
    v = v.replace(/\D/g, "");
    if (v.length > 11) v = v.slice(0, 11);
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    return v;
  };

  if (showConfetti && !isValidated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black">
        <div className="text-6xl animate-bounce">🎉</div>
        <h2 className="text-white font-black uppercase italic text-3xl mt-4 animate-pulse tracking-tighter">ACESSO CONFIRMADO!</h2>
        <p className="text-indigo-400 text-[10px] font-black tracking-[0.4em] mt-2">PREPARANDO SEU PAINEL...</p>
      </div>
    );
  }

  if (!isValidated) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center px-4 bg-grid">
        <div className="max-w-md w-full bg-[#0d0d0d] border border-white/10 rounded-[3rem] p-10 md:p-14 shadow-3xl text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600"></div>
          <div className="w-16 h-16 bg-indigo-600/20 rounded-2xl flex items-center justify-center mx-auto mb-8 text-indigo-400">
             <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
          </div>
          <h2 className="text-2xl font-black text-white uppercase italic mb-2 tracking-tight">Portal do Aluno</h2>
          <p className="text-gray-500 text-[9px] mb-8 uppercase tracking-[0.2em] font-black px-4 leading-relaxed">Sincronização instantânea após o pagamento aprovado.</p>
          <div className="space-y-6">
            <div className="relative">
              <input 
                type="text" 
                placeholder="000.000.000-00"
                value={cpf}
                onChange={(e) => setCpf(formatCPF(e.target.value))}
                className="w-full bg-black border border-white/10 rounded-2xl py-6 px-6 text-white text-center font-mono text-2xl focus:border-indigo-500 outline-none transition-all placeholder:text-gray-800"
                maxLength={14}
              />
            </div>
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl animate-shake">
                <p className="text-red-500 text-[10px] font-black uppercase tracking-wider">{error}</p>
                <a href={LINK_WHATSAPP_SUPORTE} target="_blank" className="text-white text-[9px] underline font-bold mt-2 block uppercase tracking-widest">Suporte no WhatsApp</a>
              </div>
            )}
            <button onClick={handleValidate} disabled={isVerifying} className="w-full py-6 bg-indigo-600 text-white font-black rounded-2xl uppercase tracking-[0.2em] text-sm hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-3 disabled:opacity-50">
              {isVerifying ? 'VALIDANDO...' : 'DESBLOQUEAR AGORA'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-16 bg-grid flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-4 w-full">
        <div className="text-center mb-16">
           <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-10 shadow-3xl shadow-green-500/30">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" /></svg>
           </div>
           <h1 className="text-6xl md:text-8xl font-black text-white uppercase italic tracking-tighter mb-4">ACESSO LIBERADO</h1>
           <p className="text-gray-500 uppercase tracking-[0.5em] text-[10px] font-black italic">Licença Pro Ativada com Sucesso</p>
        </div>

        <div className="flex justify-center">
           <div className="bg-[#0d0d0d] border border-white/5 p-12 md:p-16 rounded-[4rem] text-center shadow-2xl max-w-md w-full relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-green-500"></div>
              <h4 className="text-white font-black uppercase mb-2 tracking-tighter italic text-3xl">SCRIPT V2.4</h4>
              <p className="text-gray-600 text-[11px] mb-12 uppercase font-black italic tracking-widest">Download Imediato (.ZIP)</p>
              <button className="w-full py-7 bg-green-600 text-white font-black rounded-3xl uppercase tracking-[0.2em] text-sm hover:bg-green-500 transition-all shadow-[0_20px_50px_rgba(34,197,94,0.3)] hover:-translate-y-1">BAIXAR ARQUIVOS</button>
           </div>
        </div>
      </div>
    </div>
  );
};

// ========================================================
// PÁGINA INICIAL (LANDING PAGE)
// ========================================================

const LandingPage = ({ scrollTo }: { scrollTo: (id: string) => void }) => {
  return (
    <>
      <SalesNotification />
      <FloatingAI />
      
      {/* Hero Section */}
      <section className="pt-32 pb-24 px-4 text-center bg-grid relative overflow-hidden">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-600/20 blur-[150px] pointer-events-none animate-pulse"></div>
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full mb-10">
             <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
             <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em]">Automação v2.4 Online</span>
          </div>
          <h1 className="text-6xl md:text-[8.5rem] font-black text-white leading-[0.8] uppercase italic tracking-tighter mb-10 select-none">
            CRÉDITOS <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-indigo-500 to-purple-600 drop-shadow-2xl">ILIMITADOS.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-14 font-medium leading-tight">
            A única tecnologia capaz de gerar saldo inesgotável para seus projetos no Lovable.dev de forma 100% segura.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button onClick={() => scrollTo('preco')} className="w-full sm:w-auto px-14 py-8 bg-indigo-600 text-white font-black rounded-[2rem] text-2xl shadow-[0_25px_60px_rgba(79,70,229,0.4)] hover:-translate-y-2 transition-all uppercase tracking-widest active:scale-95">LIBERAR MEU ACESSO</button>
            <div className="flex items-center gap-3 px-6 py-4 bg-white/5 border border-white/5 rounded-2xl">
               <div className="flex -space-x-2">
                  {[1,2,3].map(i => <div key={i} className="w-6 h-6 bg-gray-800 border-2 border-black rounded-full"></div>)}
               </div>
               <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">+582 Alunos Ativos</span>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problema" className="py-32 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative group">
               <div className="absolute inset-0 bg-indigo-600/10 blur-[100px] pointer-events-none"></div>
               <div className="relative bg-[#0d0d0d] border border-white/10 rounded-[4rem] p-12 shadow-3xl overflow-hidden">
                  <div className="flex justify-between items-center mb-12">
                     <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-600">LovablePro Status</span>
                     <div className="px-3 py-1 bg-green-500/10 text-green-500 text-[9px] font-black rounded-full uppercase tracking-widest">Running</div>
                  </div>
                  <div className="space-y-6">
                     <div className="h-4 bg-white/5 rounded-full w-full"></div>
                     <div className="h-24 bg-indigo-600/10 rounded-3xl border border-indigo-500/20 flex items-center justify-center">
                        <span className="text-3xl font-black text-white italic uppercase animate-pulse">GERANDO SALDO...</span>
                     </div>
                     <div className="h-4 bg-white/5 rounded-full w-2/3"></div>
                  </div>
               </div>
            </div>
            <div className="text-left">
               <h2 className="text-4xl md:text-6xl font-black text-white mb-8 uppercase italic leading-none tracking-tighter">ADEUS <br/><span className="text-indigo-500">CONTA NO VERMELHO.</span></h2>
               <p className="text-gray-400 text-lg mb-10 font-medium">Você sabe que testar ideias no Lovable é caro. Nossa automação usa o próprio sistema deles para gerar créditos legítimos sem que você precise gastar um centavo a mais.</p>
               <ul className="space-y-4">
                  {["Anti-Ban de última geração", "Updates automáticos", "Uso 100% oculto", "Suporte 24/7"].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-4 text-white font-bold uppercase italic text-sm tracking-tight">
                       <span className="w-5 h-5 bg-indigo-600/20 text-indigo-500 rounded-full flex items-center justify-center text-[10px] font-black">✓</span>
                       {item}
                    </li>
                  ))}
               </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Lab Section (Novidade!) */}
      <section id="lab" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 text-center">
           <h2 className="text-5xl md:text-7xl font-black text-white mb-4 uppercase italic tracking-tighter">DEMO DE IA.</h2>
           <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.5em] mb-16">Teste nossa tecnologia integrada</p>
           <GeminiLab />
        </div>
      </section>

      {/* Pricing Section */}
      <section id="preco" className="py-32 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-purple-600/10 blur-[180px] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="bg-[#0d0d0d] border border-indigo-500/30 rounded-[5rem] p-16 md:p-24 shadow-3xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 px-8 py-3 bg-indigo-600 text-white font-black text-[10px] uppercase tracking-widest rounded-bl-[2rem] italic">Oferta Vitalícia</div>
             <h3 className="text-3xl md:text-5xl font-black text-white mb-2 uppercase italic tracking-tighter">LICENÇA PROFISSIONAL</h3>
             <div className="mb-16">
                <span className="text-gray-700 line-through text-3xl font-black italic block mb-2 opacity-50 uppercase">R$ 497,00</span>
                <div className="flex items-center justify-center gap-4">
                   <span className="text-5xl md:text-6xl font-bold text-gray-500 italic">R$</span>
                   <span className="text-[8rem] md:text-[14rem] font-black text-white leading-none tracking-tighter italic drop-shadow-2xl">197</span>
                </div>
                <p className="text-indigo-400 font-black uppercase text-[10px] tracking-widest mt-4">Pagamento único • Sem Mensalidade</p>
             </div>
             <a href={SEU_LINK_KIWIFY} target="_blank" className="block w-full py-8 md:py-10 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-3xl md:text-4xl font-black rounded-[2.5rem] transition-all shadow-[0_30px_70px_rgba(99,102,241,0.5)] uppercase tracking-widest transform hover:scale-[1.02] active:scale-95 text-center">QUERO MEU ACESSO</a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-32 bg-white/[0.01]">
        <div className="max-w-4xl mx-auto px-4">
           <h2 className="text-4xl md:text-6xl font-black text-white mb-16 text-center uppercase italic tracking-tighter">DÚVIDAS.</h2>
           <div className="bg-[#0d0d0d] border border-white/5 rounded-[4rem] p-8 md:p-12 shadow-xl">
              <FAQItem question="O script pode banir minha conta?" answer="O algoritmo simula perfeitamente o comportamento humano, com delays variáveis. Taxa de banimento: 0% em 500+ usuários." />
              <FAQItem question="Como recebo o acesso?" answer="Aprovação instantânea (PIX/Cartão). O link chega no e-mail e você valida o CPF aqui no site." />
              <FAQItem question="Funciona no celular?" answer="O script é uma extensão para navegadores desktop (Chrome, Edge, Brave)." />
           </div>
        </div>
      </section>
    </>
  );
};

// ========================================================
// COMPONENTE PRINCIPAL (APP)
// ========================================================

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
    const path = window.location.pathname;
    const params = new URLSearchParams(window.location.search);
    if (path === '/success' || params.get('status') === 'success') {
      setView('success');
      window.history.replaceState({}, '', '/');
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-gray-100 font-['Plus_Jakarta_Sans'] selection:bg-indigo-500/30 selection:text-white">
      <Navbar onBackToHome={() => setView('home')} scrollTo={scrollTo} />
      <main>{view === 'home' ? <LandingPage scrollTo={scrollTo} /> : <SuccessPage />}</main>
      <footer className="py-24 border-t border-white/5 text-center opacity-50">
        <div className="max-w-7xl mx-auto px-4">
           <div className="text-2xl font-black text-white italic mb-10 tracking-tighter uppercase">LOVABLE<span className="text-indigo-500">PRO</span></div>
           <div className="text-[9px] text-gray-800 uppercase font-black tracking-[0.5em]">© 2025 Todos os Direitos Reservados</div>
        </div>
      </footer>
    </div>
  );
};

export default App;
