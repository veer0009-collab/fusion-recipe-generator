import React, { useState } from 'react';
import { X, Mail, Send, MessageSquare, CheckCircle2 } from 'lucide-react';
import Tooltip from './Tooltip';

interface ContactUsProps {
  onClose: () => void;
}

const ContactUs: React.FC<ContactUsProps> = ({ onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-us-title"
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
                <Mail className="w-6 h-6" aria-hidden="true" />
            </div>
            <h2 id="contact-us-title" className="text-2xl font-serif font-bold text-stone-800">Contact Us</h2>
          </div>
          <Tooltip content="Close" position="bottom">
            <button 
              onClick={onClose}
              className="p-2 hover:bg-stone-100 rounded-full transition-colors text-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              aria-label="Close Contact Us modal"
            >
              <X className="w-5 h-5" />
            </button>
          </Tooltip>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 md:p-8">
          
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-12 text-center space-y-4 animate-fade-in-up">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="w-10 h-10 text-emerald-600" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-stone-800">Message Sent!</h3>
              <p className="text-stone-600 max-w-sm">
                Thank you for reaching out. We've received your message and our team will get back to you as soon as possible.
              </p>
              <button 
                onClick={onClose}
                className="mt-6 px-8 py-3 bg-stone-900 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all focus:ring-4 focus:ring-stone-500/30 focus:outline-none"
              >
                Close
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="space-y-2">
                <p className="text-lg font-medium text-stone-800">We'd love to hear from you!</p>
                <p className="text-stone-600 leading-relaxed">
                  Have a question, a suggestion for a new feature, or just want to share your favorite fusion recipe? 
                  Our team is always happy to chat and we respond to all messages promptly.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label htmlFor="contact-name" className="text-xs font-bold text-stone-500 uppercase tracking-wider ml-1">Your Name</label>
                    <input 
                      id="contact-name"
                      required
                      type="text" 
                      placeholder="Jane Doe"
                      className="w-full px-4 py-3 rounded-xl bg-white border border-stone-200 text-stone-800 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-all placeholder-stone-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="contact-email" className="text-xs font-bold text-stone-500 uppercase tracking-wider ml-1">Email Address</label>
                    <input 
                      id="contact-email"
                      required
                      type="email" 
                      placeholder="jane@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-white border border-stone-200 text-stone-800 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-all placeholder-stone-400"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="contact-message" className="text-xs font-bold text-stone-500 uppercase tracking-wider ml-1">Message</label>
                  <textarea 
                    id="contact-message"
                    required
                    rows={4}
                    placeholder="Tell us what's on your mind..."
                    className="w-full px-4 py-3 rounded-xl bg-white border border-stone-200 text-stone-800 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-all resize-none placeholder-stone-400"
                  ></textarea>
                </div>

                <div className="pt-2 flex justify-end">
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3 bg-stone-900 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-2 disabled:opacity-70 disabled:transform-none focus:ring-4 focus:ring-stone-500/30 focus:outline-none"
                  >
                    {isSubmitting ? (
                      <>Sending...</>
                    ) : (
                      <>
                        Send Message <Send className="w-4 h-4" aria-hidden="true" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
        
        {/* Footer info (only show if not submitted) */}
        {!submitted && (
            <div className="p-6 border-t border-stone-200 bg-stone-50 flex items-center gap-3 text-stone-500 text-sm">
                <MessageSquare className="w-4 h-4" aria-hidden="true" />
                <span>You can also email us directly at <a href="mailto:hello@aikitchen.com" className="text-emerald-600 font-bold hover:underline focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-sm">hello@aikitchen.com</a></span>
            </div>
        )}
      </div>
    </div>
  );
};

export default ContactUs;