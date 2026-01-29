
import os

target_file = "c:/Users/USER_PC/Downloads/buscanomes---descubra-o-nome-perfeito/App.tsx"

new_footer_content = """      <MobileNavbar view={view} setView={setView} onSearchClick={() => { setView('browse'); window.scrollTo(0, 0); document.querySelector('input')?.focus(); }} />

      {/* PRE-FOOTER SUPPORT SECTION */}
      <section className="bg-gradient-to-r from-orange-50 to-amber-50 border-t border-orange-100 py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div>
            <h3 className="text-2xl font-black text-slate-800 mb-2 tracking-tight">Gostou do Projeto?</h3>
            <p className="text-slate-600 max-w-lg">
              Ajude a manter o BuscaNomes no ar. Sua contribuição voluntária é essencial para cobrir os custos de servidor e desenvolvimento.
            </p>
          </div>
          <button
            onClick={() => setView('donation')}
            className="px-8 py-4 bg-orange-500 text-white rounded-xl font-bold shadow-lg shadow-orange-500/30 hover:bg-orange-600 hover:scale-105 transition-all text-sm uppercase tracking-widest flex items-center gap-2"
          >
            <Heart size={20} fill="currentColor" />
            Quero Apoiar
          </button>
        </div>
        
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-200/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>
      </section>

      {/* PROFESSIONAL FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-16 pb-32 lg:pb-16 relative z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            
            {/* Column 1: Brand */}
            <div className="md:col-span-1 text-center md:text-left">
              <div
                className="w-16 h-16 mx-auto md:mx-0 mb-6 flex items-center justify-center rounded-xl overflow-hidden bg-white/5 cursor-pointer hover:bg-white/10 transition-all border border-white/10"
                onClick={resetToHome}
              >
                <img src="/assets/logoanimado.gif" alt="BuscaNomes" className="w-full h-full object-cover" />
              </div>
              <p className="text-sm leading-relaxed mb-6">
                Descubra o nome perfeito para o seu bebê com a ajuda da nossa inteligência artificial e banco de dados completo.
              </p>
            </div>

            {/* Column 2: Links (Placeholder) */}
            <div className="text-center md:text-left">
              <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Navegação</h4>
              <ul className="space-y-3 text-sm">
                <li><button onClick={() => setView('browse')} className="hover:text-orange-400 transition-colors">Início</button></li>
                <li><button onClick={() => setView('generator')} className="hover:text-orange-400 transition-colors">Gerador de Nomes</button></li>
                <li><button onClick={() => setView('favorites')} className="hover:text-orange-400 transition-colors">Meus Favoritos</button></li>
                <li><button onClick={() => setView('donation')} className="hover:text-orange-400 transition-colors">Apoiar Projeto</button></li>
              </ul>
            </div>

            {/* Column 3: Legal/Info (Placeholder) */}
            <div className="text-center md:text-left">
              <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Sobre</h4>
              <ul className="space-y-3 text-sm">
                <li><span className="opacity-50 cursor-not-allowed">Política de Privacidade</span></li>
                <li><span className="opacity-50 cursor-not-allowed">Termos de Uso</span></li>
                <li><span className="opacity-50 cursor-not-allowed">Sobre Nós</span></li>
                <li><span className="opacity-50 cursor-not-allowed">Contato</span></li>
              </ul>
            </div>

            {/* Column 4: Socials & Credits */}
            <div className="text-center md:text-left">
               <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Desenvolvedor</h4>
               <p className="text-white font-bold mb-4">Isaque Santos Dev</p>
               
               <div className="flex justify-center md:justify-start gap-4 mb-6">
                <a href="https://isaquesantosdev.com/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                </a>
                <a href="https://github.com/IsaqueCodeX" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-black hover:text-white transition-all text-white">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </a>
                <a href="https://www.linkedin.com/in/isaque-santos-720b8b15a" target="_blank" rel="noopener noreferrer" className="px-5 py-2 rounded-full bg-slate-100 text-slate-600 font-bold text-sm hover:bg-[#0077b5] hover:text-white transition-all flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  LinkedIn
                </a>
              </div>
            </div>

          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
             <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
              © 2026 BuscaNomes - Versão 2.1
             </p>
             <p className="text-slate-500 italic font-serif text-sm">"Deus Seja Louvado"</p>
          </div>
        </div>
      </footer>"""

try:
    with open(target_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Split by MobileNavbar to safeguard position
    parts = content.split('<MobileNavbar view={view} setView={setView} onSearchClick={() => { setView(\\'browse\\'); window.scrollTo(0, 0); document.querySelector(\\'input\\')?.focus(); }} />')
    
    if len(parts) > 1:
        # Keep the first part and the MobileNavbar tag itself
        # Reconstruct: Part 0 + NEW_CONTENT + closure
        # Wait, my new_content INCLUDES the MobileNavbar tag at the start? Yes.
        
        # Correct logic:
        # 1. Take everything BEFORE <MobileNavbar ...
        # 2. Append new_footer_content
        # 3. Append the remaining closing tags (</div> ); export default App;)
        
        pre_nav = parts[0]
        
        # Now we need the end of the file.
        # The new footer content ends at </footer>
        # We need to ensure we close the main div and function.
        
        final_content = pre_nav + new_footer_content + "\\n    </div >\\n  );\\n};\\n\\nexport default App;"
        
        with open(target_file, 'w', encoding='utf-8') as f:
            f.write(final_content)
        print("Successfully updated App.tsx via python script.")
    else:
        print("Could not find anchor tag in file.")

except Exception as e:
    print(f"Error: {e}")
