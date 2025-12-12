import React from 'react';
import { FusionRecipe } from '../types';
import Tooltip from './Tooltip';
import { Share2, Clock, ChefHat, Flame, RotateCcw, Heart, Star } from 'lucide-react';

interface RecipeCardProps {
  recipe: FusionRecipe;
  onReset: () => void;
  isSaved?: boolean;
  onToggleSave?: () => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onReset, isSaved = false, onToggleSave }) => {
  
  const handleShare = async () => {
    const shareText = `Check out this recipe: ${recipe.dishName} - Created by AI.`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: recipe.dishName,
          text: shareText,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share canceled');
      }
    } else {
      navigator.clipboard.writeText(`${shareText}\n\n${window.location.href}`);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="w-full max-w-3xl relative group perspective-1000 mt-4 md:mt-8 mb-16">
      
      {/* Backing Card for 3D effect */}
      <div className="absolute inset-0 bg-stone-900 rounded-[2rem] transform translate-y-4 translate-x-4 opacity-10 blur-xl"></div>
      
      {/* Main Card */}
      <div className="relative bg-[#FFFEF9] rounded-[2rem] shadow-2xl overflow-hidden animate-fade-in-up border border-stone-200 transform md:-rotate-1 transition-transform duration-500 hover:rotate-0 flex flex-col">
        
        {/* Paper Texture Overlay */}
        <div className="absolute inset-0 opacity-40 pointer-events-none mix-blend-multiply z-10" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E")` }}></div>

        {/* Image Side (Top) */}
        <div className="w-full relative aspect-video md:h-[28rem] bg-stone-100">
            {recipe.imageUrl ? (
            <img 
                src={recipe.imageUrl} 
                alt={recipe.dishName} 
                className="w-full h-full object-cover" 
            />
            ) : (
            <div className="w-full h-full flex items-center justify-center">
                <ChefHat className="w-20 h-20 text-stone-300" aria-hidden="true" />
            </div>
            )}
            
            {/* Subtle Gradient for text readability if needed, though text is below now */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/30 to-transparent pointer-events-none"></div>
            
            {/* Floating Badge */}
            <div className="absolute top-6 left-6 z-20">
                <div className="bg-white/95 backdrop-blur shadow-lg px-4 py-2 rounded-full border border-stone-100 flex items-center gap-2">
                    <Star className="w-4 h-4 text-amber-500 fill-current" />
                    <span className="text-xs font-bold uppercase tracking-wider text-stone-800">{recipe.difficulty}</span>
                </div>
            </div>
        </div>

        {/* Content Side (Bottom) */}
        <div className="p-8 md:p-12 relative z-0">
             {/* Decorative top right */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50/50 rounded-bl-[4rem] -z-10"></div>

             <div className="space-y-8">
                 
                 {/* Header */}
                 <div>
                     <h2 className="text-4xl md:text-5xl font-serif font-black text-stone-900 leading-[1.1] mb-4">
                         {recipe.dishName}
                     </h2>
                     <p className="text-stone-500 font-medium italic text-lg leading-relaxed border-l-4 border-emerald-500/30 pl-4">
                         "{recipe.description}"
                     </p>
                 </div>

                 {/* Stats Bar */}
                 <div className="flex items-center gap-6 py-6 border-y border-stone-100">
                     <div className="flex-1 border-r border-stone-100">
                         <div className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">Viral Score</div>
                         <div className="flex items-center gap-2">
                             <span className="text-3xl font-serif font-bold text-stone-800">{recipe.viralScore}</span>
                             <Flame className={`w-5 h-5 ${recipe.viralScore > 80 ? 'text-rose-500' : 'text-amber-500'}`} />
                         </div>
                     </div>
                     <div className="flex-[1.5]">
                         <div className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">Flavor Notes</div>
                         <div className="flex flex-wrap gap-2">
                             {recipe.flavorProfile.slice(0, 3).map((flavor, i) => (
                                 <span key={i} className="px-2 py-1 bg-stone-100 rounded text-xs font-bold text-stone-600">{flavor}</span>
                             ))}
                         </div>
                     </div>
                 </div>

                 {/* Ingredients & Steps */}
                 <div className="space-y-8">
                     <div>
                         <h3 className="flex items-center gap-3 text-lg font-bold text-stone-900 uppercase tracking-wider mb-4">
                            <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center"><UtensilsIcon className="w-4 h-4" /></span>
                            Ingredients
                         </h3>
                         <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                             {recipe.ingredients.map((ing, i) => (
                                 <li key={i} className="text-stone-600 text-sm font-medium flex items-start gap-2">
                                     <span className="text-emerald-400 mt-1">•</span> {ing}
                                 </li>
                             ))}
                         </ul>
                     </div>

                     <div>
                         <h3 className="flex items-center gap-3 text-lg font-bold text-stone-900 uppercase tracking-wider mb-4">
                            <span className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center"><Clock className="w-4 h-4" /></span>
                            Method
                         </h3>
                         <div className="space-y-6">
                            {recipe.instructions.map((section, idx) => (
                                <div key={idx}>
                                    <h4 className="font-serif font-bold text-stone-800 mb-2 border-b border-stone-100 pb-1 inline-block">{section.phase}</h4>
                                    <ol className="list-decimal list-inside space-y-2 text-stone-600 text-sm leading-relaxed marker:font-bold marker:text-stone-400">
                                        {section.steps.map((step, stepIdx) => (
                                            <li key={stepIdx}>{step}</li>
                                        ))}
                                    </ol>
                                </div>
                            ))}
                         </div>
                     </div>
                 </div>
             </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-stone-50/50 p-6 md:px-12 md:py-8 border-t border-stone-100 flex flex-col md:flex-row gap-4 items-center relative z-20">
             <Tooltip content="Create a new fusion recipe">
               <button 
                  onClick={onReset}
                  className="w-full md:w-auto px-8 py-3 rounded-xl font-bold text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-all flex items-center justify-center gap-2 focus:ring-4 focus:ring-stone-200 focus:outline-none"
               >
                  <RotateCcw className="w-4 h-4" aria-hidden="true" /> Mix Again
               </button>
             </Tooltip>

             <div className="flex-1"></div>

             <div className="flex gap-3 w-full md:w-auto">
                {onToggleSave && (
                    <Tooltip content={isSaved ? "Remove from your cookbook" : "Save this recipe for later"}>
                      <button
                      onClick={onToggleSave}
                      className={`flex-1 md:flex-none px-6 py-3 rounded-xl font-bold border transition-all flex items-center justify-center gap-2 focus:ring-4 focus:outline-none
                          ${isSaved 
                          ? 'bg-rose-50 text-rose-600 border-rose-200 hover:bg-rose-100 focus:ring-rose-200' 
                          : 'bg-white text-stone-600 border-stone-200 hover:bg-white hover:border-stone-300 focus:ring-stone-200 shadow-sm'
                          }`}
                      aria-pressed={isSaved}
                      >
                      <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} aria-hidden="true" /> 
                      {isSaved ? 'Saved' : 'Save'}
                      </button>
                    </Tooltip>
                )}

                <Tooltip content="Share with friends">
                  <button 
                      onClick={handleShare}
                      className="flex-1 md:flex-none px-8 py-3 rounded-xl font-bold text-white bg-stone-900 hover:bg-stone-800 shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 focus:ring-4 focus:ring-stone-500/30 focus:outline-none transform hover:-translate-y-0.5"
                  >
                      <Share2 className="w-4 h-4" aria-hidden="true" /> Share
                  </button>
                </Tooltip>
             </div>
        </div>
      </div>
    </div>
  );
};

// Helper icon component since Utensils isn't directly exported sometimes
const UtensilsIcon = ({ className, "aria-hidden": ariaHidden }: { className?: string, "aria-hidden"?: boolean | "true" | "false" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden={ariaHidden}><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>
);

export default RecipeCard;