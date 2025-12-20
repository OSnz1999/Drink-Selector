import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Beer, Coffee } from "lucide-react"; // Using Coffee as placeholder for non-alc if needed

interface StepTypeProps {
    onSelect: (type: "alcoholic" | "non-alcoholic") => void;
}

export function StepType({ onSelect }: StepTypeProps) {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center">
                <h2 className="text-2xl font-semibold">What would you like?</h2>
                <p className="text-slate-400 mt-1">Tap one option to continue.</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
                <button className="text-left w-full h-32 group" onClick={() => onSelect("alcoholic")}>
                    <Card className="h-full flex items-center p-6 border-2 border-transparent group-hover:border-orange-500 transition-all bg-gradient-to-br from-slate-900 to-slate-950">
                        <div className="bg-orange-500 w-12 h-12 rounded-full flex items-center justify-center mr-5 text-black shadow-lg shadow-orange-500/20">
                            <Beer className="w-6 h-6 fill-current" />
                        </div>
                        <div>
                            <div className="font-bold text-xl">Alcoholic</div>
                            <div className="text-sm text-slate-400">Spirit, beer, or wine</div>
                        </div>
                    </Card>
                </button>

                <button className="text-left w-full h-32 group" onClick={() => onSelect("non-alcoholic")}>
                    <Card className="h-full flex items-center p-6 border-2 border-transparent group-hover:border-blue-400 transition-all bg-gradient-to-br from-slate-900 to-slate-950">
                        <div className="bg-blue-400 w-12 h-12 rounded-full flex items-center justify-center mr-5 text-black shadow-lg shadow-blue-400/20">
                            <Coffee className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="font-bold text-xl">Non-Alcoholic</div>
                            <div className="text-sm text-slate-400">Soft drinks, juices, soda</div>
                        </div>
                    </Card>
                </button>
            </div>
        </div>
    );
}
