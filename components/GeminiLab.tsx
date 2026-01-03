
import React, { useState, useRef } from 'react';
import { analyzeText, analyzeImage, complexReasoning } from '../services/gemini';

const GeminiLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'analyze' | 'vision' | 'reason'>('analyze');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAction = async () => {
    if (!input && activeTab !== 'vision') return;
    setIsLoading(true);
    setOutput('');

    try {
      let result = '';
      if (activeTab === 'analyze') {
        result = await analyzeText(input);
      } else if (activeTab === 'vision' && previewUrl) {
        result = await analyzeImage(previewUrl, input || "What's in this image?");
      } else if (activeTab === 'reason') {
        result = await complexReasoning(input);
      }
      setOutput(result);
    } catch (error) {
      setOutput(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section id="lab" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">The Interactive Lab</h2>
          <p className="text-slate-400">Experience Gemini intelligence live. Toggle between Flash and Pro modes.</p>
        </div>

        <div className="glass rounded-3xl p-1 md:p-2 mb-8 flex gap-2 overflow-x-auto">
          <button 
            onClick={() => setActiveTab('analyze')}
            className={`flex-1 py-3 px-4 rounded-2xl flex items-center justify-center gap-2 transition-all whitespace-nowrap ${activeTab === 'analyze' ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-white/5 text-slate-400'}`}
          >
            <span>⚡</span> Analyze Text (Flash)
          </button>
          <button 
            onClick={() => setActiveTab('vision')}
            className={`flex-1 py-3 px-4 rounded-2xl flex items-center justify-center gap-2 transition-all whitespace-nowrap ${activeTab === 'vision' ? 'bg-purple-600 text-white shadow-lg' : 'hover:bg-white/5 text-slate-400'}`}
          >
            <span>👁️</span> Vision (Flash-Image)
          </button>
          <button 
            onClick={() => setActiveTab('reason')}
            className={`flex-1 py-3 px-4 rounded-2xl flex items-center justify-center gap-2 transition-all whitespace-nowrap ${activeTab === 'reason' ? 'bg-pink-600 text-white shadow-lg' : 'hover:bg-white/5 text-slate-400'}`}
          >
            <span>🧠</span> Reasoning (Pro)
          </button>
        </div>

        <div className="glass rounded-3xl p-6 md:p-8 space-y-6">
          {activeTab === 'vision' && (
            <div className="flex flex-col items-center gap-4">
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-48 md:h-64 border-2 border-dashed border-white/20 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-purple-500/50 hover:bg-purple-500/5 transition-all overflow-hidden relative"
              >
                {previewUrl ? (
                  <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <>
                    <span className="text-4xl mb-2">📸</span>
                    <p className="text-slate-400 font-medium">Click to upload an image</p>
                  </>
                )}
                <input type="file" ref={fileInputRef} onChange={onFileChange} hidden accept="image/*" />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-slate-400 mb-2 uppercase tracking-wider">
              {activeTab === 'vision' ? 'What do you want to know about this?' : 'Enter Prompt or Content'}
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={activeTab === 'reason' ? "Explain quantum entanglement in simple terms..." : "Paste long text to summarize or ask a question..."}
              className="w-full bg-slate-900 border border-white/10 rounded-2xl p-4 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white placeholder:text-slate-600"
            />
          </div>

          <button 
            onClick={handleAction}
            disabled={isLoading}
            className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all ${isLoading ? 'bg-slate-800 cursor-not-allowed' : 'bg-white text-slate-950 hover:bg-slate-200'}`}
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-slate-400 border-t-white rounded-full animate-spin"></div>
                {activeTab === 'reason' ? 'Reasoning...' : 'Processing...'}
              </>
            ) : (
              'Execute Task'
            )}
          </button>

          {output && (
            <div className="pt-6 border-t border-white/10 animate-fade-in">
              <label className="block text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wider">Model Response</label>
              <div className="bg-slate-950/50 rounded-2xl p-6 text-slate-300 leading-relaxed whitespace-pre-wrap border border-white/5 shadow-inner">
                {output}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default GeminiLab;
