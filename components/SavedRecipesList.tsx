import React from 'react';
import { FusionRecipe } from '../types';
import Tooltip from './Tooltip';
import { X, Trash2, ChefHat, ArrowRight } from 'lucide-react';

interface SavedRecipesListProps {
  recipes: FusionRecipe[];
  onClose: () => void;
  onSelect: (recipe: FusionRecipe) => void;
  onDelete: (id: string) => void;
}

const SavedRecipesList: React.FC<SavedRecipesListProps> = ({ recipes, onClose, onSelect, onDelete }) => {
  return (
    <div 
      className="fixed inset-0 z-50 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-labelledby="saved-recipes-title"
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
        aria-hidden="true"
      ></div>

      {/* Drawer */}
      <div className="relative w-full max-w-md h-full bg-[#FDFBF7] shadow-2xl flex flex-col animate-fade-in-up border-l border-stone-200">
        <div className="p-6 border-b border-stone-200 flex items-center justify-between bg-white/90 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <ChefHat className="w-6 h-6 text-emerald-600" aria-hidden="true" />
            <h2 id="saved-recipes-title" className="text-2xl font-serif font-bold text-stone-800">My Cookbook</h2>
          </div>
          <Tooltip content="Close Cookbook" position="bottom">
            <button 
              onClick={onClose}
              className="p-2 hover:bg-stone-100 rounded-full transition-colors text-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              aria-label="Close saved recipes"
            >
              <X className="w-5 h-5" />
            </button>
          </Tooltip>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {recipes.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-stone-500 space-y-4">
              <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center">
                <ChefHat className="w-8 h-8 opacity-40" aria-hidden="true" />
              </div>
              <p className="font-medium">No saved recipes yet.</p>
              <p className="text-sm max-w-xs opacity-70">Generate some delicious fusion dishes and tap the heart icon to save them here!</p>
            </div>
          ) : (
            recipes.map((recipe) => (
              <div 
                key={recipe.id} 
                className="bg-white rounded-2xl p-4 border border-stone-100 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="flex gap-4">
                  <div className="w-20 h-20 rounded-xl bg-stone-100 overflow-hidden flex-shrink-0">
                    {recipe.imageUrl ? (
                      <img src={recipe.imageUrl} alt={recipe.dishName} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-stone-300">
                        <ChefHat className="w-8 h-8" aria-hidden="true" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif font-bold text-stone-800 truncate">{recipe.dishName}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider
                        ${recipe.difficulty === 'Easy' ? 'bg-emerald-100 text-emerald-700' : 
                          recipe.difficulty === 'Moderate' ? 'bg-amber-100 text-amber-700' : 
                          'bg-rose-100 text-rose-700'}`}>
                        {recipe.difficulty}
                      </span>
                      <span className="text-xs text-stone-500 font-medium">{recipe.viralScore}/100 Viral</span>
                    </div>
                    
                    <div className="flex items-center gap-3 mt-4">
                      <Tooltip content="View full details">
                        <button 
                          onClick={() => onSelect(recipe)}
                          className="flex-1 text-xs font-bold text-stone-600 bg-stone-50 hover:bg-stone-100 py-2 rounded-lg transition-colors flex items-center justify-center gap-1 focus:outline-none focus:ring-2 focus:ring-stone-400"
                          aria-label={`View full recipe for ${recipe.dishName}`}
                        >
                          View Recipe <ArrowRight className="w-3 h-3" aria-hidden="true" />
                        </button>
                      </Tooltip>
                      <Tooltip content="Delete Recipe">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            if (recipe.id) onDelete(recipe.id);
                          }}
                          className="p-2 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500"
                          aria-label={`Delete ${recipe.dishName}`}
                        >
                          <Trash2 className="w-4 h-4" aria-hidden="true" />
                        </button>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedRecipesList;