
import React from 'react';

// --- Componentes Internos para Garantir Carregamento ---

const Navbar = () => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-600/20">L</div>
            <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              LovablePro
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-300">
            <button onClick={() => scrollTo('beneficios')} className="hover:text-white transition-colors">Benefícios</button>
            <button onClick={() => scrollTo('como-funciona')} className="hover:text-white transition-colors">Como Funciona</button>
            <button onClick={() => scrollTo('preco')} className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full transition-all font-bold">Garantir Acesso</button>
          </div>
          <button onClick={() => scrollTo('preco')} className="md:hidden px-4 py-2 bg-indigo-600 text-white text-xs rounded-full font-bold uppercase">Comprar</button>
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
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-grid">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-indigo-600/20 blur-[120px] pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-8 animate-pulse">
            <span>ÚLTIMAS 14 VAGAS COM 60% DE DESCONTO</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white mb-8 leading-[0.9]">
            CRÉDITOS <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">ILIMITADOS</span><br />
            NO LOVABLE.DEV
          </h1>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Pare de queimar dinheiro com planos caros. Use nossa automação segura e exclusiva para ganhar créditos de forma legítima e escalar seus apps sem limites.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button onClick={() => scrollTo('preco')} className="w-full sm:w-auto px-10 py-5 bg-indigo-600 hover:bg-indigo-700 text-white text-xl font-black rounded-2xl transition-all transform hover:scale-105 shadow-2xl shadow-indigo-600/20">
              GARANTIR MINHA VAGA
            </button>
            <button onClick={() => scrollTo('como-funciona')} className="w-full sm:w-auto px-10 py-5 bg-white/5 hover:bg-white/10 text-white text-xl font-bold rounded-2xl border border-white/10 transition-all">
              VER COMO FUNCIONA
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ title, description, icon }: { title: string, description: string, icon: React.ReactNode }) => (
  <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-indigo-500/50 transition-all group">
    <div className="w-12 h-12 bg-indigo-600/20 rounded-xl flex items-center justify-center text-indigo-400 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
    <p className="text-gray-400 leading-relaxed">{description}</p>
  </div>
);

// --- Componente Principal App ---

const App: React.FC = () => {
  const purchaseUrl = "https://wa.me/5500000000000?text=Olá!%20Quero%20garantir%20minha%20automação%20LovablePro";

  return (
    <div className="min-h-screen selection:bg-indigo-500 selection:text-white bg-[#050505] text-gray-100">
      <Navbar />
      
      <main>
        <Hero />
        
        {/* Pain Point */}
        <section id="como-funciona" className="py-24 bg-white/[0.02]">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl md:text-4xl font-bold text-center text-gray-300 mb-16">
              "Ficar sem créditos no meio de uma ideia brilhante é o <span className="text-red-500 uppercase">fim da produtividade</span>."
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="p-6 bg-indigo-600/10 border-l-4 border-indigo-500 rounded-r-xl">
                  <h3 className="text-2xl font-bold text-white mb-2">O custo oculto do Lovable</h3>
                  <p className="text-gray-400">Cada teste que você faz consome créditos valiosos. No final do mês, você acaba gastando centenas de dólares apenas para iterar seu código.</p>
                </div>
                <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                  <p className="text-indigo-400 font-bold mb-2">A Solução LovablePro:</p>
                  <p className="text-gray-300">Nossa automação utiliza o sistema de indicações para gerar créditos extras de forma orgânica e contínua para sua conta.</p>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute inset-0 bg-indigo-600 blur-[60px] opacity-10 group-hover:opacity-20 transition-opacity"></div>
                <div className="relative p-8 bg-[#0d0d0d] rounded-3xl border border-white/10 shadow-2xl">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">Status da Conta</span>
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-full">ATIVO</span>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400">Créditos Gerados hoje</span>
                        <span className="text-indigo-400 font-bold">+250</span>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-r from-indigo-600 to-purple-500"></div>
                      </div>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl border border-white/5 text-center text-xs text-gray-500">
                      Automação rodando em segundo plano...
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="beneficios" className="py-24">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Desenvolva sem Limites</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">Três pilares que tornam nossa ferramenta a escolha número #1 de desenvolvedores Pro.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard 
                title="Economia Absurda"
                description="Economize até R$ 1.200,00 por ano em planos extras. Um único investimento para liberdade total."
                icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
              />
              <FeatureCard 
                title="Segurança Máxima"
                description="Não usamos exploits. Usamos o sistema oficial de convites. Sua conta permanece 100% segura e limpa."
                icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04c-.443 4.905.682 9.516 4.318 13.064A11.956 11.956 0 0012 21.056a11.956 11.956 0 007.302-2.012c3.636-3.548 4.761-8.159 4.318-13.064z" /></svg>}
              />
              <FeatureCard 
                title="Setup Instantâneo"
                description="Receba um vídeo tutorial e o script pronto. Em menos de 5 minutos você já terá os primeiros créditos caindo."
                icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
              />
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="preco" className="py-24 bg-indigo-600/5">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-[#0d0d0d] rounded-3xl border border-indigo-500/30 overflow-hidden shadow-2xl">
              <div className="p-8 md:p-12 text-center bg-indigo-600/10">
                <h2 className="text-3xl font-bold text-white mb-2">Acesso Vitalício</h2>
                <p className="text-indigo-400 font-medium">Oferta de Lançamento - Vagas Limitadas</p>
              </div>
              <div className="p-8 md:p-12 text-center">
                <div className="mb-8">
                  <span className="text-gray-500 line-through text-lg">De R$ 497,00</span>
                  <div className="flex items-center justify-center space-x-2 mt-2">
                    <span className="text-4xl font-bold text-white">R$</span>
                    <span className="text-7xl font-black text-white">197</span>
                  </div>
                  <p className="text-gray-400 mt-2">Pagamento único, uso para sempre.</p>
                </div>
                <ul className="max-w-xs mx-auto text-left space-y-4 mb-10">
                  {["Automação Lovable Pro", "Vídeo Aula Passo-a-Passo", "Suporte VIP WhatsApp", "Atualizações Vitalícias"].map((item, i) => (
                    <li key={i} className="flex items-center space-x-3 text-gray-300">
                      <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <a href={purchaseUrl} target="_blank" rel="noopener noreferrer" className="block w-full py-6 bg-indigo-600 hover:bg-indigo-700 text-white text-2xl font-black rounded-2xl transition-all shadow-xl shadow-indigo-600/40 transform hover:scale-[1.02]">
                  QUERO MEU ACESSO AGORA
                </a>
                <p className="mt-6 text-xs text-gray-600 uppercase tracking-widest font-bold">Garantia Incondicional de 7 Dias</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Dúvidas Frequentes</h2>
            <div className="space-y-4">
              {[
                { q: "É seguro para minha conta?", a: "Sim. A automação simula o comportamento de um usuário real enviando convites. Não há violação de termos pois usamos uma função nativa da plataforma." },
                { q: "Preciso de um computador potente?", a: "Não. A automação é leve e roda no navegador ou via script simples que consome quase nada de memória." },
                { q: "E se a Lovable mudar o sistema?", a: "Nós monitoramos a plataforma diariamente. Caso haja mudanças, você receberá a atualização do script sem custo adicional." }
              ].map((faq, i) => (
                <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                  <h4 className="font-bold text-white mb-2">{faq.q}</h4>
                  <p className="text-sm text-gray-400">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-white/5 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-sm text-gray-600">&copy; 2024 LovablePro. Todos os direitos reservados.</p>
          <p className="mt-4 text-[10px] text-gray-800 max-w-2xl mx-auto leading-tight uppercase">
            ESTE SITE NÃO É AFILIADO AO LOVABLE.DEV. SOMOS UMA FERRAMENTA DE TERCEIROS PARA OTIMIZAÇÃO DE PROCESSOS.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
