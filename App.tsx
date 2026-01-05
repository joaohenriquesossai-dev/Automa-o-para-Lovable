
import React, { useState } from 'react';

// ========================================================
// CONFIGURAÇÕES E LINKS
// ========================================================
const SEU_LINK_KIWIFY = "https://pay.kiwify.com.br/GPsLBgH";
const LINK_WHATSAPP_SUPORTE = "https://wa.me/5500000000000"; 
const SUPABASE_URL = "https://kcohmzqukmkoutnjadgu.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_vXP2EU9mKXwKXicuI0vfdA_k8iZvV2e";
const LINK_ONEDRIVE_PASTA = "https://onedrive.live.com/?id=%2Fpersonal%2Ff68a9c476d0e6856%2FDocuments%2FDOWNLOAD&viewid=5250e9b2%2D3a9e%2D420d%2D83fb%2D2e7170ed3be3&view=0"; 

// ========================================================
// COMPONENTES ATÔMICOS DE DESIGN
// ========================================================

const Glow = ({ className = "" }: { className?: string }) => (
  <div className={`absolute pointer-events-none blur-[120px] rounded-full opacity-20 ${className}`} />
);

const SectionLabel = ({ children }: { children?: React.ReactNode }) => (
  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full mb-6">
    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse"></div>
    <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em]">{children}</span>
  </div>
);

const UrgencyBanner = () => (
  <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 py-2 px-4 text-center shadow-lg border-b border-white/10 animate-pulse-slow">
    <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.15em] text-white">
      {"🔥 Oferta de Lançamento: De "}
      <span className="line-through opacity-70">R$ 497,00</span>
      {" por apenas "}
      <span className="text-yellow-300 drop-shadow-sm">R$ 197,00</span>
      {" | "}
      <span className="bg-white/20 px-2 py-0.5 rounded ml-1">Restam apenas 9 vagas</span>
    </p>
  </div>
);

const Navbar = ({ onBackToHome, scrollTo }: { onBackToHome: () => void, scrollTo: (id: string) => void }) => (
  <nav className="fixed top-8 md:top-10 left-0 right-0 z-50 bg-black/60 backdrop-blur-md border-b border-white/5">
    <div className="max-w-7xl mx-auto px-6 lg:px-12">
      <div className="flex justify-between items-center h-20">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={onBackToHome}>
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl flex items-center justify-center font-black text-white shadow-lg shadow-indigo-500/20">L</div>
          <span className="text-2xl font-black tracking-tighter text-white uppercase">
            LOVABLE<span className="text-indigo-500">PRO</span>
          </span>
        </div>
        <div className="hidden lg:flex items-center space-x-10 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
          <button onClick={() => scrollTo('metodologia')} className="hover:text-white transition-colors">A Lógica</button>
          <button onClick={() => scrollTo('passos')} className="hover:text-white transition-colors">Como Funciona</button>
          <button onClick={() => scrollTo('beneficios')} className="hover:text-white transition-colors">Vantagens</button>
          <button onClick={() => scrollTo('faq')} className="hover:text-white transition-colors">FAQ</button>
          <button onClick={() => scrollTo('preco')} className="px-8 py-3 bg-white text-black rounded-full transition-all hover:bg-indigo-500 hover:text-white font-black">
            DESBLOQUEAR ACESSO
          </button>
        </div>
        <button onClick={() => scrollTo('preco')} className="lg:hidden px-5 py-2.5 bg-indigo-600 text-white text-[10px] rounded-full font-black uppercase">Comprar</button>
      </div>
    </div>
  </nav>
);

// ========================================================
// PÁGINA DE SUCESSO (ESTILO VAULT)
// ========================================================

const SuccessPage = () => {
  const [cpfInput, setCpfInput] = useState('');
  const [userData, setUserData] = useState<any>(null);
  const [isValidated, setIsValidated] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');

  const handleValidate = async () => {
    const cleanCpf = cpfInput.replace(/\D/g, ''); 
    if (cleanCpf.length < 11) { setError('DIGITE OS 11 DÍGITOS DO CPF.'); return; }
    setIsVerifying(true);
    setError('');
    
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/compradores?cpf=eq.${cleanCpf}&select=nome,email,cpf`, {
        headers: { 'apikey': SUPABASE_ANON_KEY, 'Authorization': `Bearer ${SUPABASE_ANON_KEY}` }
      });
      const data = await res.json();
      if (data && data.length > 0) {
        setUserData(data[0]);
        setIsValidated(true);
      } else {
        setError('ACESSO NÃO ENCONTRADO NO BANCO DE DADOS.');
      }
    } catch (err) {
      setError('ERRO DE CONEXÃO.');
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

  if (!isValidated) {
    return (
      <div className="min-h-screen pt-48 flex items-center justify-center px-4 bg-[#000]">
        <Glow className="top-1/4 left-1/4 w-96 h-96 bg-indigo-600" />
        <div className="max-w-md w-full glass rounded-[3rem] p-12 border border-white/10 text-center relative z-10">
          <div className="w-20 h-20 bg-indigo-600/10 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-indigo-500/30">
             <svg className="w-10 h-10 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
          </div>
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">AUTENTICAÇÃO</h2>
          <p className="text-gray-500 text-[10px] mb-10 uppercase tracking-widest font-black">Insira o CPF utilizado na Kiwify</p>
          <div className="space-y-6">
            <input 
              type="text" 
              placeholder="000.000.000-00"
              value={cpfInput}
              onChange={(e) => setCpfInput(formatCPF(e.target.value))}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-6 text-white text-center font-mono text-2xl focus:border-indigo-500 outline-none"
            />
            {error && <p className="text-red-500 text-[10px] font-black uppercase">{error}</p>}
            <button 
              onClick={handleValidate} 
              disabled={isVerifying}
              className="w-full py-6 bg-indigo-600 text-white font-black rounded-2xl uppercase tracking-widest hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-600/20"
            >
              {isVerifying ? 'CONECTANDO...' : 'LIBERAR SOFTWARE'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-56 pb-20 bg-[#000] px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <SectionLabel>Conexão Criptografada</SectionLabel>
          <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-[0.85] mb-6">LICENÇA <br/> <span className="text-indigo-500">AUTORIZADA.</span></h1>
          <p className="text-gray-400 font-bold uppercase tracking-[0.3em] text-[12px]">Bem-vindo à Automação, {userData.nome.split(' ')[0]}.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
           <div className="glass p-12 rounded-[4rem] border border-white/10 relative overflow-hidden flex flex-col items-center text-center">
              <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500"></div>
              <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mb-8 border border-white/10">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              </div>
              <h4 className="text-2xl font-black text-white uppercase mb-4">Arquivos do Software</h4>
              <p className="text-gray-500 text-xs mb-10 font-bold uppercase tracking-widest leading-relaxed">Clique no botão abaixo para acessar a pasta oficial de downloads no OneDrive.</p>
              <a href={LINK_ONEDRIVE_PASTA} target="_blank" className="w-full py-8 bg-white text-black font-black rounded-3xl uppercase tracking-widest hover:bg-indigo-500 hover:text-white transition-all shadow-2xl">ACESSAR DOWNLOADS</a>
           </div>
           <div className="glass p-12 rounded-[4rem] border border-white/5 flex flex-col justify-center">
              <h5 className="text-indigo-400 font-black uppercase text-[10px] tracking-[0.5em] mb-8">TITULAR DA LICENÇA</h5>
              <div className="space-y-6">
                <div>
                  <label className="text-gray-600 text-[9px] font-black uppercase mb-2 block">E-mail Cadastrado:</label>
                  <p className="text-white font-mono text-lg truncate">{userData.email}</p>
                </div>
                <div className="pt-6 border-t border-white/5">
                   <p className="text-gray-500 text-[10px] font-bold uppercase leading-relaxed">
                     Seu acesso é monitorado. Compartilhar os arquivos pode resultar no cancelamento imediato da sua licença vitalícia.
                   </p>
                </div>
              </div>
              <a href={LINK_WHATSAPP_SUPORTE} target="_blank" className="mt-12 text-[10px] font-black text-gray-700 hover:text-white uppercase tracking-widest underline transition-all">Falar com Suporte Técnico</a>
           </div>
        </div>
      </div>
    </div>
  );
};

// ========================================================
// LANDING PAGE (HIGH-END DESIGN)
// ========================================================

const LandingPage = ({ scrollTo, onGoToSuccess }: any) => (
  <div className="bg-[#000]">
    {/* HERO SECTION */}
    <section className="relative pt-64 pb-32 px-6 overflow-hidden min-h-screen flex items-center">
      <Glow className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] bg-indigo-600" />
      <Glow className="bottom-0 right-0 w-[40rem] h-[40rem] bg-purple-600 opacity-10" />
      
      <div className="max-w-7xl mx-auto w-full relative z-10 text-center">
        <SectionLabel>🔥 Usado por desenvolvedores pro</SectionLabel>
        <h1 className="text-[9vw] md:text-[7.5rem] font-[1000] text-white leading-[0.9] uppercase tracking-tighter mb-12">
          GANHE ATÉ 5.000+ <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-white to-purple-600">CRÉDITOS POR MÊS.</span>
        </h1>
        <p className="text-xl md:text-3xl text-gray-400 max-w-4xl mx-auto mb-16 font-medium leading-tight">
          Sistema de automação inteligente que gera créditos sempre que você precisar, para focar no que realmente importa: criar projetos incríveis!
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <button onClick={() => scrollTo('preco')} className="group relative px-16 py-9 bg-white text-black font-black rounded-[2rem] text-2xl uppercase tracking-tighter hover:bg-indigo-600 hover:text-white transition-all shadow-[0_0_50px_rgba(255,255,255,0.1)] hover:shadow-indigo-500/40">
            LIBERAR MEU ACESSO
            <div className="absolute inset-0 rounded-[2rem] border-2 border-white scale-105 opacity-0 group-hover:opacity-100 transition-all"></div>
          </button>
          <button onClick={onGoToSuccess} className="px-10 py-6 text-gray-500 font-black uppercase text-sm tracking-widest hover:text-white transition-colors border border-white/10 rounded-[2rem] hover:bg-white/5">
            Área do Cliente
          </button>
        </div>
      </div>
    </section>

    {/* METODOLOGIA / PROVA VISUAL */}
    <section id="metodologia" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
             <div className="absolute -inset-10 bg-indigo-600/10 blur-[100px]"></div>
             <div className="relative glass p-10 rounded-[4rem] border border-white/10 shadow-3xl">
                <div className="flex gap-2 mb-8">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="space-y-6">
                   <div className="bg-black/50 p-6 rounded-2xl border border-white/5">
                      <p className="text-indigo-400 font-mono text-sm mb-2">{" >> "} initializing_automator.sh</p>
                      <p className="text-white font-mono text-sm">[SUCCESS] Connection established with Lovable Engine</p>
                      <p className="text-white font-mono text-sm">[INFO] Credit Bypass: ACTIVE</p>
                      <div className="mt-4 h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-500 w-[78%] animate-pulse"></div>
                      </div>
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
                        <span className="text-[10px] text-gray-500 font-black uppercase block mb-1">Status</span>
                        <span className="text-green-500 font-black text-xl uppercase">VITALÍCIO</span>
                      </div>
                      <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
                        <span className="text-[10px] text-gray-500 font-black uppercase block mb-1">Requisições</span>
                        <span className="text-indigo-500 font-black text-xl uppercase">INFINITAS</span>
                      </div>
                   </div>
                </div>
             </div>
          </div>
          <div>
            <SectionLabel>Estratégia Técnica</SectionLabel>
            <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none mb-8">O FIM DAS <br/> MENSALIDADES.</h2>
            <p className="text-gray-400 text-lg mb-12 font-medium leading-relaxed">
              Nossa tecnologia atua na camada de comunicação da plataforma, permitindo que você execute builds complexos e deploys em massa sem se preocupar com o contador de créditos. É a liberdade técnica que você precisava para escalar sua agência ou projetos pessoais.
            </p>
            <button onClick={() => scrollTo('passos')} className="text-indigo-500 font-black uppercase text-xs tracking-widest hover:text-white transition-colors underline">Como funciona em 3 passos →</button>
          </div>
        </div>
      </div>
    </section>

    {/* COMO FUNCIONA EM 3 PASSOS */}
    <section id="passos" className="py-32 px-6 relative overflow-hidden bg-[#030303]/50">
      <Glow className="top-1/2 left-0 w-96 h-96 bg-indigo-500/10" />
      <div className="max-w-7xl mx-auto relative">
         <div className="text-center mb-24">
            <SectionLabel>Processo de Ativação</SectionLabel>
            <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter">COMO FUNCIONA EM <span className="text-indigo-500">3 PASSOS SIMPLES.</span></h2>
         </div>
         
         <div className="relative">
            {/* Linha Animada Conectora (Desktop) */}
            <div className="absolute top-[4.5rem] left-[10%] right-[10%] h-0.5 bg-white/5 hidden md:block overflow-hidden">
               <div className="w-full h-full bg-gradient-to-r from-transparent via-indigo-500 to-transparent animate-shimmer-step"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-12 relative z-10">
               {/* PASSO 1 */}
               <div className="flex flex-col items-center text-center group">
                  <div className="w-24 h-24 bg-[#080808] border border-white/10 rounded-3xl flex items-center justify-center text-4xl mb-8 group-hover:border-indigo-500/50 group-hover:bg-indigo-600 transition-all duration-500 relative">
                     <span className="absolute -top-4 -right-4 bg-indigo-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">PASSO 1</span>
                     🔗
                  </div>
                  <h4 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">Conecte sua Conta</h4>
                  <p className="text-gray-500 font-medium uppercase tracking-widest text-xs leading-relaxed">Faça login com sua conta Lovable de forma segura em nossa plataforma criptografada.</p>
               </div>

               {/* PASSO 2 */}
               <div className="flex flex-col items-center text-center group">
                  <div className="w-24 h-24 bg-[#080808] border border-white/10 rounded-3xl flex items-center justify-center text-4xl mb-8 group-hover:border-indigo-500/50 group-hover:bg-indigo-600 transition-all duration-500 relative">
                     <span className="absolute -top-4 -right-4 bg-indigo-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">PASSO 2</span>
                     🎬
                  </div>
                  <h4 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">Assista ao tutorial</h4>
                  <p className="text-gray-500 font-medium uppercase tracking-widest text-xs leading-relaxed">Siga os passos simples do nosso guia em vídeo e instale a extensão Lovable Pro.</p>
               </div>

               {/* PASSO 3 */}
               <div className="flex flex-col items-center text-center group">
                  <div className="w-24 h-24 bg-[#080808] border border-white/10 rounded-3xl flex items-center justify-center text-4xl mb-8 group-hover:border-indigo-500/50 group-hover:bg-indigo-600 transition-all duration-500 relative">
                     <span className="absolute -top-4 -right-4 bg-indigo-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">PASSO 3</span>
                     🎉
                  </div>
                  <h4 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">Receba Créditos</h4>
                  <p className="text-gray-500 font-medium uppercase tracking-widest text-xs leading-relaxed">Acompanhe seus créditos crescendo no dashboard de sua conta ao atualizar a página.</p>
               </div>
            </div>
         </div>
      </div>
      <style>{`
        @keyframes shimmer-step {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer-step {
          animation: shimmer-step 4s linear infinite;
        }
      `}</style>
    </section>

    {/* SEÇÃO BENEFÍCIOS (GRID DINÂMICO) */}
    <section id="beneficios" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <SectionLabel>Por que usar Lovable Pro</SectionLabel>
          <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter">EFICIÊNCIA <span className="text-indigo-500">MÁXIMA.</span></h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <BenefitCard 
            icon="🤖" 
            title="500 Créditos Extras por Dia" 
            description="Automação roda sempre que você pedir, gerando créditos quando você mais precisa. Sem limite de acumulação." 
          />
          <BenefitCard 
            icon="💰" 
            title="Economize mais de R$ 277/Mês" 
            description="Valor equivalente aos créditos comparado ao plano oficial Lovable Pro. Invista seu dinheiro no que importa." 
          />
          <BenefitCard 
            icon="⚡" 
            title="Setup em poucos Minutos" 
            description="Conecte sua conta, ative a automação e pronto. Zero código, zero complicação técnica." 
          />
        </div>
      </div>
    </section>

    {/* POR QUE VOCÊ PODE CONFIAR */}
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
           <SectionLabel>Segurança & Transparência</SectionLabel>
           <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter">POR QUE VOCÊ <span className="text-indigo-500">PODE CONFIAR.</span></h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
           <TrustCard 
              icon="🔒"
              title="100% Seguro"
              description="Dados nunca compartilhados, além de o sistema utilizar apenas seu código de convite para integração."
              color="indigo"
           />
           <TrustCard 
              icon="✅"
              title="Dentro das Políticas"
              description="Totalmente compatível com os termos de uso Lovable. Operamos dentro da legalidade técnica da plataforma."
              color="emerald"
           />
           <TrustCard 
              icon="💳"
              title="Garantia Total de eficácia"
              description="Se você seguir todos os passos corretamente, não tem erro. Nosso software é validado por centenas de usuários."
              color="purple"
           />
           <TrustCard 
              icon="🚀"
              title="Suporte Rápido"
              description="Resposta em até 2 horas no plano Premium. Nosso time técnico está sempre à disposição para ajudar."
              color="blue"
           />
        </div>
      </div>
    </section>

    {/* SEÇÃO COMPARATIVO */}
    <section id="comparativo" className="py-32 px-6 bg-[#030303]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <SectionLabel>Tabela de Performance</SectionLabel>
          <h2 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter">O JOGO <span className="text-indigo-500">MUDOU.</span></h2>
        </div>
        <div className="grid md:grid-cols-2 gap-px bg-white/5 rounded-[4rem] overflow-hidden border border-white/5">
           <div className="p-16 bg-black">
              <h4 className="text-gray-500 font-black uppercase text-xs tracking-widest mb-10">O Desenvolvedor Comum</h4>
              <ul className="space-y-8">
                 <li className="flex items-center gap-4 text-gray-600 font-bold uppercase text-sm">
                    <span className="text-red-500 text-xl">✕</span> Pagando R$ 200+ por mês
                 </li>
                 <li className="flex items-center gap-4 text-gray-600 font-bold uppercase text-sm">
                    <span className="text-red-500 text-xl">✕</span> Projetos travados no meio do dia
                 </li>
                 <li className="flex items-center gap-4 text-gray-600 font-bold uppercase text-sm">
                    <span className="text-red-500 text-xl">✕</span> Medo de errar o prompt e gastar crédito
                 </li>
              </ul>
           </div>
           <div className="p-16 bg-[#080808] relative group">
              <div className="absolute inset-0 bg-indigo-600/5 opacity-0 group-hover:opacity-100 transition-all"></div>
              <h4 className="text-indigo-500 font-black uppercase text-xs tracking-widest mb-10">LOVABLE PRO</h4>
              <ul className="space-y-8 relative z-10">
                 <li className="flex items-center gap-4 text-white font-black uppercase text-sm">
                    <span className="text-green-500 text-xl">✓</span> Pagamento Único (Vitalício)
                 </li>
                 <li className="flex items-center gap-4 text-white font-black uppercase text-sm">
                    <span className="text-green-500 text-xl">✓</span> Saldo Infinito Gerado via Script
                 </li>
                 <li className="flex items-center gap-4 text-white font-black uppercase text-sm">
                    <span className="text-green-500 text-xl">✓</span> Escala Ilimitada de Aplicações
                 </li>
              </ul>
           </div>
        </div>
      </div>
    </section>

    {/* OFERTA FINAL */}
    <section id="preco" className="py-40 px-6 relative overflow-hidden">
      <Glow className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[50rem] bg-indigo-600 opacity-20" />
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="glass p-12 md:p-24 rounded-[5rem] border border-white/10 text-center shadow-3xl">
           <SectionLabel>Inscrições Abertas</SectionLabel>
           <h3 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter mb-10">PLANO <br/> VITALÍCIO</h3>
           
           <div className="mb-12 max-w-lg mx-auto text-left space-y-4">
              <div className="flex items-start gap-4">
                 <span className="text-indigo-500 text-xl mt-1">✓</span>
                 <p className="text-gray-300 text-sm font-medium uppercase tracking-tight">Geração ilimitada <span className="text-gray-500">(com base na sua disponibilidade de utilizar a ferramenta, média de 600 créditos/dia)</span></p>
              </div>
              <div className="flex items-start gap-4">
                 <span className="text-indigo-500 text-xl mt-1">✓</span>
                 <p className="text-gray-300 text-sm font-medium uppercase tracking-tight">Suporte por email</p>
              </div>
              <div className="flex items-start gap-4">
                 <span className="text-indigo-500 text-xl mt-1">✓</span>
                 <p className="text-gray-300 text-sm font-medium uppercase tracking-tight">Tira dúvidas via email</p>
              </div>
           </div>

           <div className="mb-16">
              <span className="text-gray-700 line-through text-4xl font-black block mb-2 opacity-50 uppercase tracking-tighter">R$ 497,00</span>
              <div className="flex items-center justify-center gap-3">
                 <span className="text-5xl md:text-6xl font-black text-indigo-500 mt-6">R$</span>
                 <span className="text-[12rem] md:text-[18rem] font-[1000] text-white leading-none tracking-tighter">197</span>
              </div>
              <p className="text-indigo-400 font-black uppercase text-[12px] tracking-[0.5em] mt-8">PAGAMENTO ÚNICO • SEM TAXAS MENSAIS</p>
           </div>
           
           <a href={SEU_LINK_KIWIFY} target="_blank" className="block w-full py-10 bg-white text-black text-4xl font-black rounded-[3rem] transition-all shadow-[0_20px_60px_rgba(255,255,255,0.1)] hover:bg-indigo-600 hover:text-white uppercase tracking-widest hover:-translate-y-2">
              DESBLOQUEAR AGORA
           </a>
           
           <p className="mt-12 text-[11px] text-gray-500 font-bold uppercase tracking-widest leading-relaxed px-4">
             📝 Nota: não há garantia, por se tratar de disponibilização de arquivos via download.
           </p>
        </div>
      </div>
    </section>

    {/* FAQ SECTION */}
    <section id="faq" className="py-32 px-6">
       <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-8xl font-black text-white mb-24 text-center uppercase tracking-tighter">DÚVIDAS.</h2>
          <div className="space-y-4">
             <FAQItem question="COMO RECEBO O ACESSO?" answer="Imediatamente após a aprovação do pagamento. Você será redirecionado para o nosso portal tático e poderá validar seu CPF para baixar os scripts." />
             <FAQItem question="PRECISO SER PROGRAMADOR?" answer="Não. O software foi desenhado para ser plug-and-play. Acompanha um tutorial em vídeo de 3 minutos mostrando como ativar a automação no seu navegador." />
             <FAQItem question="TEM GARANTIA?" answer="Devido à natureza do produto (entrega imediata de arquivos e scripts via download), este item não possui política de reembolso após o acesso aos arquivos ser liberado." />
          </div>
       </div>
    </section>

    {/* FINAL CALL TO ACTION */}
    <section className="py-40 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden bg-gradient-to-br from-indigo-700 via-purple-700 to-indigo-900 rounded-[5rem] p-12 md:p-32 text-center shadow-[0_0_100px_rgba(79,70,229,0.3)]">
          <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-white/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-[6rem] font-[1000] text-white uppercase tracking-tighter leading-[0.9] mb-12">
              PRONTO PARA MULTIPLICAR <br/> SEUS CRÉDITOS LOVABLE?
            </h2>
            <p className="text-xl md:text-2xl text-indigo-100/70 font-bold uppercase tracking-widest mb-16 max-w-3xl mx-auto">
              Junte-se a todos os desenvolvedores que já automatizaram seus créditos e escalaram seus projetos ao nível profissional.
            </p>
            <a 
              href={SEU_LINK_KIWIFY} 
              target="_blank" 
              className="inline-block px-20 py-10 bg-white text-black text-3xl font-black rounded-[2.5rem] hover:bg-black hover:text-white transition-all transform hover:scale-110 uppercase tracking-tighter shadow-2xl"
            >
              Começar minha Automação
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
);

const BenefitCard = ({ icon, title, description }: { icon: string, title: string, description: string }) => (
  <div className="group relative glass p-10 rounded-[3rem] border border-white/5 hover:border-indigo-500/50 transition-all duration-500 hover:-translate-y-2">
    <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[3rem]"></div>
    <div className="text-5xl mb-8 group-hover:scale-110 transition-transform duration-500 inline-block">{icon}</div>
    <h4 className="text-xl font-black text-white uppercase tracking-tighter mb-4">{title}</h4>
    <p className="text-gray-500 font-medium leading-relaxed text-sm">{description}</p>
  </div>
);

const TrustCard = ({ icon, title, description, color }: { icon: string, title: string, description: string, color: string }) => (
  <div className="group glass p-10 rounded-[3rem] border border-white/5 flex items-start gap-8 hover:bg-white/5 transition-all">
     <div className={`w-20 h-20 min-w-[5rem] bg-${color}-500/10 rounded-3xl flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-500`}>
        {icon}
     </div>
     <div>
        <h4 className="text-2xl font-black text-white uppercase tracking-tighter mb-3">{title}</h4>
        <p className="text-gray-500 text-sm font-medium leading-relaxed uppercase tracking-wider">{description}</p>
     </div>
  </div>
);

const FAQItem = ({ question, answer }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="glass rounded-3xl border border-white/5 overflow-hidden transition-all duration-500">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full p-8 flex justify-between items-center text-left hover:bg-white/5 transition-colors">
        <span className="text-xl font-black text-white uppercase tracking-tighter">{question}</span>
        <span className={`text-2xl font-black transition-transform duration-500 ${isOpen ? 'rotate-45 text-red-500' : 'text-indigo-500'}`}>+</span>
      </button>
      <div className={`transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100 p-8 pt-0' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <p className="text-gray-400 font-medium leading-relaxed uppercase text-sm tracking-widest">{answer}</p>
      </div>
    </div>
  );
};

// ========================================================
// APP WRAPPER
// ========================================================

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'success'>('home');

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
       if (view !== 'home') {
          setView('home');
          setTimeout(() => {
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 100);
       } else {
          element.scrollIntoView({ behavior: 'smooth' });
       }
    }
  };

  return (
    <div className="min-h-screen bg-black text-gray-100 font-['Plus_Jakarta_Sans'] selection:bg-indigo-500 selection:text-white">
      <style>{`
        .glass { background: rgba(255, 255, 255, 0.02); backdrop-filter: blur(12px); }
        .shadow-3xl { box-shadow: 0 50px 100px -20px rgba(0, 0, 0, 0.5); }
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.9; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s infinite;
        }
      `}</style>
      <UrgencyBanner />
      <Navbar onBackToHome={() => setView('home')} scrollTo={scrollTo} />
      <main>
        {view === 'home' ? (
          <LandingPage scrollTo={scrollTo} onGoToSuccess={() => setView('success')} />
        ) : (
          <SuccessPage />
        )}
      </main>
      <footer className="py-32 border-t border-white/5 text-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 opacity-30">
           <div className="text-4xl font-black text-white mb-10 tracking-tighter uppercase">LOVABLE<span className="text-indigo-500">PRO</span></div>
           <p className="text-[10px] text-gray-700 uppercase font-black tracking-[0.8em]">© 2025 TECNOLOGIA DE AUTOMAÇÃO ELITE • TODOS OS DIREITOS RESERVADOS</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
