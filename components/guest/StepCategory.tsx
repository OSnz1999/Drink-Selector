import { Category } from "@/lib/types";
import { Card } from "@/components/ui/Card";

interface StepCategoryProps {
    categories: Category[];
    onSelect: (id: string) => void;
}

export function StepCategory({ categories, onSelect }: StepCategoryProps) {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="text-center">
                <h2 className="text-xl font-semibold">Choose a category</h2>
                <p className="text-sm text-slate-400">Pick your base drink type.</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
                {categories.map(cat => (
                    <button key={cat.id} onClick={() => onSelect(cat.id)} className="text-left group">
                        <Card className="p-4 h-24 flex flex-col justify-center items-center text-center hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-600">
                            <span className="font-semibold text-lg">{cat.name}</span>
                        </Card>
                    </button>
                ))}
            </div>
        </div>
    );
}
