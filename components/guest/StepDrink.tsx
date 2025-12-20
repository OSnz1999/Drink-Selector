import { Drink } from "@/lib/types";
import { Card } from "@/components/ui/Card";
import Image from "next/image";

interface StepDrinkProps {
    drinks: Drink[];
    onSelect: (id: string) => void;
}

export function StepDrink({ drinks, onSelect }: StepDrinkProps) {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="text-center">
                <h2 className="text-xl font-semibold">Choose your drink</h2>
                <p className="text-sm text-slate-400">Select a brand.</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {drinks.map(drink => (
                    <button key={drink.id} onClick={() => onSelect(drink.id)} className="text-left group w-full focus:outline-none">
                        <Card className="p-0 overflow-hidden h-48 flex flex-col hover:border-orange-500 transition-all duration-300 border border-slate-800 bg-slate-900 group-focus:ring-2 group-focus:ring-orange-500 shadow-lg hover:shadow-orange-900/10">
                            <div className="flex-1 bg-gradient-to-b from-slate-800 to-slate-900 relative flex items-center justify-center p-6 group-hover:scale-105 transition-transform duration-500">
                                {drink.image ? (
                                    <img src={drink.image} alt={drink.name} className="max-h-full max-w-full object-contain drop-shadow-2xl" />
                                ) : (
                                    <div className="text-center opacity-30 flex flex-col items-center">
                                        <span className="text-5xl block mb-2 filter grayscale">🥃</span>
                                    </div>
                                )}
                            </div>
                            <div className="p-4 bg-slate-950 border-t border-slate-800 relative z-10">
                                <span className="font-bold text-base text-slate-100 block leading-tight group-hover:text-orange-400 transition-colors">
                                    {drink.name}
                                </span>
                            </div>
                        </Card>
                    </button>
                ))}
            </div>

            {drinks.length === 0 && (
                <div className="text-center text-slate-500 py-8">
                    No drinks found in this category.
                </div>
            )}
        </div>
    );
}
