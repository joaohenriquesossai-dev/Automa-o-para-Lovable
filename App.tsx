
import React, { useState, useEffect } from 'react';

// --- Componentes de Interface ---

const Navbar = () => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center font-black text-white shadow-xl shadow-purple-500/20">L</div>
            <span className="text-2xl font-black tracking-tighter text-white">
              LOVABLE<span className="text-purple-500">PRO</span>
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-10 text-[11px] font-black uppercase tracking-[0.3em] text-gray-400">
            <button onClick={() => scrollTo('problema')} className="hover:text-purple-400 transition-colors">O Problema</button>
            <button onClick={() => scrollTo('tecnologia')} className="hover:text-purple-400 transition-colors">A Solução</button>
            <button onClick={() => scrollTo('preco')} className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-full transition-all shadow-lg shadow-purple-600/40 transform hover:scale-105 active:scale-95 font-black uppercase tracking-widest">
              Obter Licença
            </button>
          </div>
          <button onClick={() => scrollTo('preco')} className="md:hidden px-5 py-2.5 bg-purple-600 text-white text-[10px] rounded-full font-black uppercase">Comprar</button>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative pt-40 pb-20 lg:pt-56 lg:pb-32 overflow-hidden bg-grid">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[600px] bg-purple-600/10 blur-[180px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Badge removido conforme solicitação do usuário */}
        
        <h1 className="text-6xl md:text-[10rem] font-black tracking-tighter text-white mb-6 leading-[0.8] select-none uppercase">
          CRÉDITOS <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-indigo-500 to-purple-500 drop-shadow-sm">ILIMITADOS</span><br />
          NO LOVABLE.DEV
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-400 mb-14 max-w-3xl mx-auto font-medium leading-tight">
          Pare de queimar dinheiro com planos caros. Use nossa automação segura e exclusiva para ganhar créditos de forma legítima e escalar seus projetos.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button onClick={() => scrollTo('preco')} className="w-full sm:w-auto px-14 py-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xl font-black rounded-2xl transition-all shadow-2xl shadow-purple-600/50 transform hover:-translate-y-1">
            LIBERAR MEU ACESSO
          </button>
        </div>
      </div>
    </section>
  );
};

const App: React.FC = () => {
  const purchaseUrl = "https://wa.me/5500000000000?text=Olá!%20Quero%20acessar%20a%20extensão%20exclusiva%20LovablePro";
  const [credits, setCredits] = useState(250);

  useEffect(() => {
    const interval = setInterval(() => {
      setCredits(prev => prev + Math.floor(Math.random() * 2));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-gray-100 font-['Plus_Jakarta_Sans']">
      <Navbar />
      
      <main>
        <Hero />

        {/* Problema e Dor */}
        <section id="problema" className="py-24 bg-white/[0.02]">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <blockquote className="text-3xl md:text-5xl font-black text-white mb-10 leading-tight uppercase tracking-tighter italic border-l-8 border-purple-600 pl-8">
                  "Ficar sem créditos no meio de uma ideia brilhante é o <span className="text-purple-500">fim da produtividade."</span>
                </blockquote>
                
                <h3 className="text-2xl font-bold text-white mb-4 uppercase">O custo oculto do Lovable</h3>
                <p className="text-gray-400 text-lg leading-relaxed mb-8">
                  Cada teste que você faz consome créditos valiosos. No final do mês, você acaba gastando <span className="text-white font-bold">centenas de dólares</span> apenas para iterar seu código. 
                  Sua criatividade não deveria ser taxada por clique.
                </p>

                <div className="p-8 bg-indigo-900/10 border border-indigo-500/20 rounded-3xl">
                  <h4 className="text-xl font-bold text-indigo-400 mb-2 uppercase tracking-widest">A Solução LovablePro:</h4>
                  <p className="text-gray-400 leading-relaxed">
                    Nossa automação utiliza o sistema de indicações para gerar <span className="text-white font-bold">créditos extras de forma orgânica e contínua</span> diretamente para sua conta principal.
                  </p>
                </div>
              </div>

              {/* Dashboard Animado */}
              <div className="relative">
                <div className="absolute inset-0 bg-purple-600/20 blur-[100px] pointer-events-none"></div>
                <div className="relative bg-[#0d0d0d] border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-3xl">
                  <div className="flex justify-between items-center mb-12">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Monitor de Sistema</p>
                      <h4 className="text-2xl font-black text-white uppercase tracking-tighter">Status da Conta</h4>
                    </div>
                    <div className="flex items-center gap-3 px-5 py-2 bg-green-500/10 border border-green-500/30 rounded-full">
                      <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-ping"></div>
                      <span className="text-green-500 font-black text-xs uppercase tracking-widest">ATIVO</span>
                    </div>
                  </div>

                  <div className="space-y-10">
                    <div className="bg-[#050505] p-8 rounded-3xl border border-white/5">
                      <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">Créditos Gerados hoje</p>
                      <div className="text-6xl font-black text-white tracking-tighter italic">
                        +{credits}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-purple-400">
                        <span>Processamento em Lote</span>
                        <span>88% Eficiência</span>
                      </div>
                      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 w-[88%] animate-pulse"></div>
                      </div>
                      <p className="text-center text-xs text-gray-600 font-medium animate-pulse">
                        Automação rodando em segundo plano...
                      </p>
                    </div>
                  </div>

                  <div className="mt-10 pt-8 border-t border-white/5 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-600/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    </div>
                    <p className="text-xs text-gray-500 leading-tight">
                      Sistema de indicações orgânicas detectado e <span className="text-white">sincronizado com sucesso</span>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Engenharia Blindada */}
        <section id="tecnologia" className="py-32 border-y border-white/5 bg-white/[0.01]">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div>
                <h2 className="text-4xl md:text-6xl font-black text-white mb-10 leading-none uppercase tracking-tighter italic underline decoration-purple-600/30">Engenharia<br /><span className="text-purple-500">Privada v2.4</span></h2>
                <div className="space-y-10">
                  <div className="group">
                    <h4 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors flex items-center gap-3">
                      <div className="w-2 h-6 bg-purple-600 rounded-full"></div>
                      Exclusividade Microsoft Edge
                    </h4>
                    <p className="text-gray-500 leading-relaxed text-base">Nossa arquitetura foi desenhada para o gerenciamento de memória do Edge. Tentativas manuais em outros navegadores causam <span className="text-gray-300 italic">instabilidade de sessão</span>. Nós estabilizamos o fluxo de injeção.</p>
                  </div>
                  <div className="group">
                    <h4 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors flex items-center gap-3">
                       <div className="w-2 h-6 bg-purple-600 rounded-full"></div>
                       A Complexidade do Multi-Publish
                    </h4>
                    <p className="text-gray-500 leading-relaxed text-base">Automatizar a publicação de dezenas de páginas simultaneamente requer sincronização de pacotes. É um sistema que você não consegue replicar manualmente sem acionar erros de API.</p>
                  </div>
                  <div className="group">
                    <h4 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors flex items-center gap-3">
                       <div className="w-2 h-6 bg-purple-600 rounded-full"></div>
                       Segurança por Isolamento
                    </h4>
                    <p className="text-gray-500 leading-relaxed text-base">O método utiliza sua conta oficial apenas como destino dos créditos. O script opera em ambientes controlados, garantindo que sua produção principal esteja sempre segura.</p>
                  </div>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute inset-0 bg-purple-600/20 blur-[120px] group-hover:bg-purple-600/30 transition-all"></div>
                <div className="relative bg-[#0d0d0d] p-1 border border-white/10 rounded-[3rem] shadow-3xl overflow-hidden">
                   <div className="bg-[#050505] rounded-[2.8rem] p-10 border border-white/5">
                      <div className="flex items-center gap-3 mb-10">
                        <div className="w-3 h-3 rounded-full bg-red-500/40"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/40"></div>
                        <div className="w-3 h-3 rounded-full bg-purple-500/40"></div>
                        <span className="text-[10px] text-gray-700 font-mono ml-auto tracking-[0.4em] font-bold uppercase">EDGE_OPTIMIZED_CORE</span>
                      </div>
                      <div className="space-y-6 font-mono text-xs md:text-sm">
                        <p className="text-gray-600 flex gap-4"><span className="text-purple-800 font-bold">14:22:05</span> Validando Hardware Capacity...</p>
                        <p className="text-gray-600 flex gap-4"><span className="text-purple-800 font-bold">14:22:09</span> Preparando hooks de publicação...</p>
                        <p className="text-purple-400 font-bold flex gap-4"><span className="text-purple-800">14:22:15</span> Escalando instâncias automáticas...</p>
                        <div className="py-4 px-6 bg-purple-500/5 border border-purple-500/20 text-purple-400 rounded-xl mt-6">
                           <p className="font-black text-center uppercase tracking-widest text-[10px] md:text-xs">MODO HIGH-PERFORMANCE ATIVO</p>
                           <p className="text-[10px] text-purple-500/50 text-center mt-1">Escalando de acordo com seu hardware</p>
                        </div>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Oferta Final */}
        <section id="preco" className="py-32">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h2 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter uppercase leading-none">VAGAS<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">LIMITADAS.</span></h2>
            
            <div className="bg-[#0d0d0d] rounded-[4rem] border border-purple-500/30 p-12 md:p-24 relative overflow-hidden shadow-3xl mt-16">
              <div className="flex flex-col items-center">
                <div className="inline-flex items-center gap-2 px-6 py-2 bg-purple-600/20 text-purple-400 rounded-full text-[10px] font-black tracking-widest uppercase mb-12">Oportunidade de Lançamento</div>
                
                <span className="text-gray-600 line-through text-2xl font-bold mb-4 italic">De R$ 497,00</span>
                <div className="flex items-center gap-4 mb-12">
                  <span className="text-5xl font-bold text-gray-500">R$</span>
                  <span className="text-[10rem] md:text-[12rem] font-black text-white tracking-tighter leading-none italic">197</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8 text-left mb-16 border-t border-white/10 pt-16 w-full max-w-3xl">
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <p className="text-gray-300 font-bold text-lg leading-tight uppercase tracking-tighter">Extensão v2.4 (Edge Only)</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <p className="text-gray-300 font-bold text-lg leading-tight uppercase tracking-tighter">Motor Multi-Publish</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <p className="text-gray-300 font-bold text-lg leading-tight uppercase tracking-tighter">Mentoria com Anderson Felipe</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <p className="text-gray-300 font-bold text-lg leading-tight uppercase tracking-tighter">Suporte VIP Vitalício</p>
                  </div>
                </div>

                <a href={purchaseUrl} target="_blank" rel="noopener noreferrer" className="w-full py-8 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-3xl font-black rounded-3xl transition-all shadow-2xl shadow-purple-600/50 transform hover:scale-[1.02] active:scale-95 text-center uppercase tracking-widest">
                  ADQUIRIR AGORA
                </a>
                <p className="mt-8 text-[11px] text-gray-700 uppercase font-black tracking-[0.5em]">Pagamento Seguro • Acesso Imediato</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-purple-500 font-black text-2xl mb-10 tracking-tighter uppercase italic">Lovable<span className="text-white">Pro</span></div>
          <p className="text-[11px] text-gray-800 max-w-2xl mx-auto uppercase tracking-tighter leading-relaxed font-bold">
            ESTE É UM PRODUTO DE ENGENHARIA DE TERCEIROS DESTINADO À PRODUTIVIDADE. NÃO POSSUÍMOS VÍNCULOS OFICIAIS COM A PLATAFORMA LOVABLE.DEV. AO ADQUIRIR, VOCÊ CONCORDA QUE É UM INSTRUMENTO TÉCNICO DE USO RESPONSÁVEL E ÉTICO.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
