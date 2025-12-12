import React from 'react';
import { X, ShieldCheck } from 'lucide-react';
import Tooltip from './Tooltip';

interface PrivacyPolicyProps {
  onClose: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onClose }) => {
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-policy-title"
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
            <div className="p-2 bg-emerald-100 rounded-lg text-emerald-700">
                <ShieldCheck className="w-6 h-6" aria-hidden="true" />
            </div>
            <h2 id="privacy-policy-title" className="text-2xl font-serif font-bold text-stone-800">Privacy Policy</h2>
          </div>
          <Tooltip content="Close" position="bottom">
            <button 
              onClick={onClose}
              className="p-2 hover:bg-stone-100 rounded-full transition-colors text-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              aria-label="Close Privacy Policy modal"
            >
              <X className="w-5 h-5" />
            </button>
          </Tooltip>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 md:p-8 space-y-6 text-stone-600 leading-relaxed">
          <p className="text-lg font-medium text-stone-800">
            Welcome to Food Fusion Recipe Generator! We respect your privacy and believe in transparency. Here is how we handle your data.
          </p>

          <section>
            <h3 className="text-stone-800 font-bold text-lg mb-2">1. No Personal Data Collection</h3>
            <p>
              We do not collect your name, email address, phone number, or any other personally identifiable information. You can use our recipe generator completely anonymously.
            </p>
          </section>

          <section>
            <h3 className="text-stone-800 font-bold text-lg mb-2">2. Your Cookbook Data</h3>
            <p>
              When you use the "Save" feature to add a recipe to "My Cookbook," we store this data locally on your own device (using your browser's Local Storage). This data is never sent to our servers. It stays safely with you.
            </p>
          </section>

          <section>
            <h3 className="text-stone-800 font-bold text-lg mb-2">3. Artificial Intelligence</h3>
            <p>
              Our recipes are generated using Google's Gemini API. The food combinations you enter are sent to the AI to create the recipe, but we do not associate this with your personal identity.
            </p>
          </section>

          <section>
            <h3 className="text-stone-800 font-bold text-lg mb-2">4. Cookies & Usage</h3>
            <p>
              We use standard, non-intrusive technologies to make the website work smoothly. We do not track your activity across other websites.
            </p>
          </section>

           <section>
            <h3 className="text-stone-800 font-bold text-lg mb-2">5. Contact Us</h3>
            <p>
              If you have any questions about this policy, please feel free to reach out to us.
            </p>
          </section>
        </div>
        
        {/* Footer */}
        <div className="p-6 border-t border-stone-200 bg-stone-50 flex justify-end">
            <button 
                onClick={onClose}
                className="px-6 py-2.5 bg-stone-900 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all focus:ring-4 focus:ring-stone-500/30 focus:outline-none"
            >
                Understood
            </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;