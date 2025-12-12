import React from 'react';
import { X, Info, Heart, Sparkles } from 'lucide-react';
import Tooltip from './Tooltip';

interface AboutUsProps {
  onClose: () => void;
}

const AboutUs: React.FC<AboutUsProps> = ({ onClose }) => {
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="about-us-title"
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
        aria-hidden="true"
      ></div>

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-[#FDFBF7] rounded-[2rem] shadow-2xl flex flex-col max-h-[90vh] animate-fade-in-up border border-stone-100 overflow-hidden">
        
        {/* Header */}
        <div className="p-6 md:p-8 border-b border-stone-200 flex items-center justify-between bg-white/90 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 rounded-lg text-amber-700">
                <Info className="w-6 h-6" aria-hidden="true" />
            </div>
            <h2 id="about-us-title" className="text-2xl font-serif font-bold text-stone-800">About AI Kitchen</h2>
          </div>
          <Tooltip content="Close" position="bottom">
            <button 
              onClick={onClose}
              className="p-2 hover:bg-stone-100 rounded-full transition-colors text-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              aria-label="Close About Us modal"
            >
              <X className="w-5 h-5" />
            </button>
          </Tooltip>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 md:p-8 space-y-6 text-stone-600 leading-relaxed">
          <p className="text-lg font-medium text-stone-800">
            Welcome to <span className="text-emerald-600 font-bold">AI Kitchen</span>, where culinary creativity meets artificial intelligence.
          </p>

          <section>
            <h3 className="text-stone-800 font-bold text-lg mb-2 flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-500 fill-current" aria-hidden="true" /> Our Mission
            </h3>
            <p>
              We believe that cooking should be an adventure, not a chore. Our mission is to help you break free from recipe ruts by generating unique, unexpected, and delicious fusion dishes instantly. We want to turn the question "What's for dinner?" into "Let's create something new!"
            </p>
          </section>

          <section>
            <h3 className="text-stone-800 font-bold text-lg mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" aria-hidden="true" /> Innovation in the Kitchen
            </h3>
            <p>
              Powered by advanced AI, our platform understands flavor profiles, textures, and cooking techniques. It doesn't just randomly mix ingredients; it thinks like a professional chef to create harmonious combinations that actually work, complete with easy-to-follow instructions.
            </p>
          </section>

          <section>
            <h3 className="text-stone-800 font-bold text-lg mb-2">Inspiring Home Cooks</h3>
            <p>
              Whether you are a seasoned pro or just starting out, AI Kitchen is here to inspire you. We celebrate the joy of experimenting with flavors and the excitement of tasting something entirely original. We invite you to explore, experiment, and enjoy.
            </p>
          </section>

           <div className="pt-4 text-center">
            <p className="font-serif italic text-stone-500 text-lg">Happy Cooking!</p>
          </div>
        </div>
        
        {/* Footer */}
        <div className="p-6 border-t border-stone-200 bg-stone-50 flex justify-end">
            <button 
                onClick={onClose}
                className="px-6 py-2.5 bg-stone-900 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all focus:ring-4 focus:ring-stone-500/30 focus:outline-none"
            >
                Back to Kitchen
            </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;