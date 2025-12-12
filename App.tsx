import React, { useState, useEffect } from 'react';
import { generateFusionRecipe } from './services/geminiService';
import { FusionRecipe } from './types';
import RecipeCard from './components/RecipeCard';
import LoadingScreen from './components/LoadingScreen';
import FloatingIcons from './components/FloatingIcons';
import SavedRecipesList from './components/SavedRecipesList';
import PrivacyPolicy from './components/PrivacyPolicy';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import Tooltip from './components/Tooltip';
import { ArrowRight, ChefHat, Plus, BookOpen, Wand2 } from 'lucide-react';

const App: React.FC = () => {
  const [food1, setFood1] = useState('');
  const [food2, setFood2] = useState('');
  const [recipe, setRecipe] = useState<FusionRecipe | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInputActive, setIsInputActive] = useState(false);
  
  // State for saved recipes and UI
  const [savedRecipes, setSavedRecipes] = useState<FusionRecipe[]>([]);
  const [showSavedList, setShowSavedList] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showContact, setShowContact] = useState(false);

  // Load saved recipes from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('foodFusionSaved');
    if (saved) {
      try {
        setSavedRecipes(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved recipes", e);
      }
    }
  }, []);

  // Save recipes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('foodFusionSaved', JSON.stringify(savedRecipes));
  }, [savedRecipes]);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!food1.trim() || !food2.trim()) return;

    setLoading(true);
    setError(null);
    setRecipe(null);
    setShowSavedList(false); // Close saved list if open

    try {
      const result = await generateFusionRecipe({ food1, food2 });
      setRecipe(result);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFood1('');
    setFood2('');
    setRecipe(null);
    setError(null);
  };

  const handleInputInteraction = (active: boolean) => {
    setIsInputActive(active);
  };

  const toggleSaveRecipe = () => {
    if (!recipe) return;

    const isAlreadySaved = savedRecipes.some(r => r.dishName === recipe.dishName);

    if (isAlreadySaved) {
      setSavedRecipes(prev => prev.filter(r => r.dishName !== recipe.dishName));
    } else {
      const newSavedRecipe = {
        ...recipe,
        id: Date.now().toString(), // Simple ID generation
        savedAt: Date.now()
      };
      setSavedRecipes(prev => [newSavedRecipe, ...prev]);
    }
  };

  const handleDeleteSaved = (id: string) => {
    setSavedRecipes(prev => prev.filter(r => r.id !== id));
  };

  const handleSelectSaved = (savedRecipe: FusionRecipe) => {
    setRecipe(savedRecipe);
    setShowSavedList(false);
  };

  const isCurrentRecipeSaved = recipe 
    ? savedRecipes.some(r => r.dishName === recipe.dishName)
    : false;

  return (
    <div className="min-h-screen flex flex-col items-center relative overflow-x-hidden">
      
      {/* Background Elements */}
      <div className="fixed inset-0 bg-[#FDFBF7] z-[-2]"></div>
      
      {/* Animated Organic Blobs - More Vibrant for Creative UI */}
      <div className={`fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-amber-200/40 rounded-full blur-[100px] pointer-events-none animate-blob transition-all duration-1000 ${isInputActive ? 'bg-amber-300/50 scale-110' : ''}`}></div>
      <div className={`fixed bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-emerald-200/40 rounded-full blur-[100px] pointer-events-none animate-blob transition-all duration-1000 ${isInputActive ? 'bg-emerald-300/40 scale-110' : ''}`} style={{ animationDelay: '2s' }}></div>
      <div className={`fixed top-[20%] right-[20%] w-[30vw] h-[30vw] bg-rose-200/30 rounded-full blur-[80px] pointer-events-none animate-blob transition-all duration-1000 ${isInputActive ? 'bg-rose-200/50 scale-110' : ''}`} style={{ animationDelay: '4s' }}></div>

      <FloatingIcons active={isInputActive} />

      {/* Main Content */}
      <div className="w-full max-w-6xl px-4 py-8 md:py-12 z-10 flex flex-col items-center min-h-[calc(100vh-80px)]">
        
        {/* Header Section */}
        <header className={`text-center mb-12 transition-all duration-700 w-full flex flex-col items-center relative ${recipe ? 'scale-90 opacity-0 h-0 overflow-hidden mb-0' : 'scale-100 opacity-100'}`}>
          <div className="inline-flex items-center gap-3 px-6 py-2 bg-white/60 backdrop-blur-md rounded-full border border-white/50 shadow-sm mb-6 animate-fade-in-up">
            <ChefHat className="w-5 h-5 text-stone-600" aria-hidden="true" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-stone-600">The AI Kitchen</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-serif font-black text-stone-900 mb-6 leading-[0.9] tracking-tight animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Fusion <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-800 relative">
              Recipes
              <span className="absolute -top-4 -right-8 text-3xl animate-bounce delay-700 hidden md:inline-block">✨</span>
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-stone-600 font-light max-w-xl mx-auto leading-relaxed animate-fade-in-up mb-8" style={{ animationDelay: '0.2s' }}>
            Enter two ingredients. Our AI chef will invent a delicious dish that combines them perfectly.
          </p>
        </header>

        {/* Cookbook Button (Always Visible) */}
        <div className="absolute top-6 right-6 z-20">
             <Tooltip content="Open My Cookbook" position="bottom">
               <button 
                  onClick={() => setShowSavedList(true)}
                  className="bg-white/80 backdrop-blur-md p-3.5 rounded-full border border-stone-200 shadow-sm hover:shadow-lg transition-all text-stone-600 hover:text-emerald-600 group focus:ring-2 focus:ring-emerald-500 focus:outline-none relative"
                >
                  <BookOpen className="w-6 h-6" />
                  {savedRecipes.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-stone-900 text-white text-[10px] font-bold flex items-center justify-center rounded-full shadow-sm animate-scale-in">
                      {savedRecipes.length}
                    </span>
                  )}
                </button>
             </Tooltip>
        </div>

        {/* Dynamic Content Area */}
        <main className="w-full flex justify-center perspective-1000 flex-1 flex flex-col justify-center">
          
          {loading ? (
            <LoadingScreen />
          ) : recipe ? (
            <div className="w-full flex justify-center">
                 <RecipeCard 
                  recipe={recipe} 
                  onReset={handleReset} 
                  isSaved={isCurrentRecipeSaved}
                  onToggleSave={toggleSaveRecipe}
                />
            </div>
          ) : (
            <form 
              onSubmit={handleGenerate} 
              className="w-full max-w-4xl mx-auto animate-fade-in-up"
              style={{ animationDelay: '0.3s' }}
            >
              <div className="relative">
                {/* Decorative background for the form */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/40 to-white/10 backdrop-blur-xl rounded-[3rem] border border-white/40 shadow-2xl transform rotate-1"></div>
                
                <div className="relative bg-white/80 backdrop-blur-2xl p-6 md:p-12 rounded-[3rem] border border-white shadow-xl transition-all duration-500 hover:shadow-2xl">
                    <div className="flex flex-col md:flex-row items-stretch gap-4 md:gap-0 relative">
                        
                        {/* Input 1 */}
                        <div className="flex-1 relative group">
                            <label htmlFor="food-1" className="block text-xs font-bold text-stone-400 uppercase tracking-widest mb-3 ml-4">First Ingredient</label>
                            <input
                                id="food-1"
                                type="text"
                                value={food1}
                                onChange={(e) => setFood1(e.target.value)}
                                onFocus={() => handleInputInteraction(true)}
                                onBlur={() => handleInputInteraction(false)}
                                placeholder="e.g. Avocado"
                                className="w-full h-20 md:h-24 px-8 rounded-[2rem] bg-stone-50 border-2 border-transparent text-stone-800 placeholder-stone-300 text-2xl md:text-3xl font-serif font-bold focus:outline-none focus:bg-white focus:border-amber-200 focus:shadow-[0_0_0_4px_rgba(251,191,36,0.1)] transition-all duration-300"
                            />
                        </div>

                        {/* Connector */}
                        <div className="relative h-12 md:h-auto flex items-center justify-center -my-2 md:my-0 md:-mx-4 z-10">
                             <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full bg-stone-900 text-white flex items-center justify-center shadow-lg border-4 border-white transform transition-all duration-500 ${food1 && food2 ? 'scale-110 bg-gradient-to-tr from-emerald-600 to-teal-600 rotate-90' : 'rotate-0'}`}>
                                <Plus className="w-6 h-6 md:w-8 md:h-8" strokeWidth={3} />
                             </div>
                        </div>

                        {/* Input 2 */}
                        <div className="flex-1 relative group">
                            <label htmlFor="food-2" className="block text-xs font-bold text-stone-400 uppercase tracking-widest mb-3 ml-4 md:text-right md:mr-4">Second Ingredient</label>
                            <input
                                id="food-2"
                                type="text"
                                value={food2}
                                onChange={(e) => setFood2(e.target.value)}
                                onFocus={() => handleInputInteraction(true)}
                                onBlur={() => handleInputInteraction(false)}
                                placeholder="e.g. Toast"
                                className="w-full h-20 md:h-24 px-8 rounded-[2rem] bg-stone-50 border-2 border-transparent text-stone-800 placeholder-stone-300 text-2xl md:text-3xl font-serif font-bold focus:outline-none focus:bg-white focus:border-emerald-200 focus:shadow-[0_0_0_4px_rgba(52,211,153,0.1)] transition-all duration-300 md:text-right"
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="mt-6 bg-red-50/50 border border-red-100 text-red-600 px-6 py-3 rounded-2xl text-sm flex items-center gap-2 animate-fade-in-up text-center justify-center" role="alert">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500" aria-hidden="true"></span>
                            {error}
                        </div>
                    )}

                    <div className="mt-8 md:mt-10">
                         <button
                            type="submit"
                            disabled={!food1 || !food2}
                            className="w-full group relative h-16 md:h-20 rounded-2xl bg-stone-900 overflow-hidden shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none transition-all duration-300 transform hover:-translate-y-1"
                        >
                             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                             <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-800 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                             
                             <div className="relative flex items-center justify-center gap-3 text-white">
                                <span className="text-xl font-bold tracking-wide">Generate Fusion</span>
                                <div className="bg-white/20 rounded-full p-2 group-hover:bg-white/30 transition-colors">
                                     <Wand2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                                </div>
                             </div>
                        </button>
                    </div>
                </div>
              </div>
            </form>
          )}
        </main>

        <footer className={`mt-8 text-center space-y-4 pb-4 transition-opacity duration-500 ${recipe ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
          <div className="flex flex-wrap justify-center gap-6">
            <button 
              onClick={() => setShowAbout(true)}
              className="text-stone-400 text-xs font-bold hover:text-stone-600 transition-colors uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-stone-400 rounded-sm"
            >
              About
            </button>
            <span className="text-stone-300">•</span>
            <button 
              onClick={() => setShowContact(true)}
              className="text-stone-400 text-xs font-bold hover:text-stone-600 transition-colors uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-stone-400 rounded-sm"
            >
              Contact
            </button>
             <span className="text-stone-300">•</span>
            <button 
              onClick={() => setShowPrivacy(true)}
              className="text-stone-400 text-xs font-bold hover:text-stone-600 transition-colors uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-stone-400 rounded-sm"
            >
              Privacy
            </button>
          </div>
          <p className="text-stone-300 text-[10px] uppercase tracking-wider">Powered by Gemini 2.5</p>
        </footer>
      </div>

      {/* Saved Recipes Drawer/Modal */}
      {showSavedList && (
        <SavedRecipesList 
          recipes={savedRecipes} 
          onClose={() => setShowSavedList(false)}
          onSelect={handleSelectSaved}
          onDelete={handleDeleteSaved}
        />
      )}

      {/* Privacy Policy Modal */}
      {showPrivacy && (
        <PrivacyPolicy onClose={() => setShowPrivacy(false)} />
      )}
      
      {/* About Us Modal */}
      {showAbout && (
        <AboutUs onClose={() => setShowAbout(false)} />
      )}

      {/* Contact Us Modal */}
      {showContact && (
        <ContactUs onClose={() => setShowContact(false)} />
      )}
    </div>
  );
};

export default App;