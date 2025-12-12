import React from 'react';
import { ChefHat, Sparkles } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="w-full max-w-lg bg-white/90 backdrop-blur-2xl p-16 rounded-[3rem] border border-white shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] flex flex-col items-center justify-center text-center space-y-10 animate-fade-in-up mt-8 relative overflow-hidden">
      
      {/* Decorative background blurs inside the card */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100 rounded-full blur-3xl opacity-50 -mr-10 -mt-10"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-100 rounded-full blur-3xl opacity-50 -ml-10 -mb-10"></div>

      <div className="relative">
        <div className="absolute inset-0 bg-stone-900 rounded-full animate-ping opacity-10"></div>
        <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center relative z-10 shadow-xl border-4 border-stone-50">
          <ChefHat className="w-12 h-12 text-stone-800 animate-pulse" />
          <div className="absolute -top-2 -right-2 bg-emerald-100 p-2 rounded-full border-2 border-white animate-bounce" style={{ animationDelay: '0.5s' }}>
             <Sparkles className="w-4 h-4 text-emerald-600" />
          </div>
        </div>
      </div>
      
      <div className="space-y-3 z-10">
        <h3 className="text-3xl font-serif font-black text-stone-900 tracking-tight">Consulting the Chef</h3>
        <p className="text-stone-500 font-medium text-lg max-w-xs mx-auto">Mixing your ingredients with a dash of digital magic...</p>
      </div>

      <div className="flex gap-2 items-center justify-center z-10">
          <div className="w-3 h-3 bg-stone-300 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 bg-stone-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
    </div>
  );
};

export default LoadingScreen;