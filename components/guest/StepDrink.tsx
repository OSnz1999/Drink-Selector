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
                    <button key={drink.id} onClick={() => onSelect(drink.id)} className="text-left group w-full">
                        <Card className="p-0 overflow-hidden h-40 flex flex-col hover:border-orange-500 transition-colors border border-transparent bg-slate-900">
                            <div className="flex-1 bg-gradient-to-b from-slate-800 to-slate-900 relative flex items-center justify-center p-4">
                                {drink.image ? (
                                    <img src={drink.image} alt={drink.name} className="max-h-full max-w-full object-contain drop-shadow-xl" />
                                ) : (
                                    <div className="text-center opacity-30">
                                        <span className="text-4xl block mb-1">🥃</span>
                                    </div>
                                )}
                            </div>
                            <div className="p-3 bg-slate-950 border-t border-slate-800">
                                <span className="font-semibold text-sm text-slate-100">{drink.name}</span>
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
