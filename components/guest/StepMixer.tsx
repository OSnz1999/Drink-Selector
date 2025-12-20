import { Mixer, Drink } from "@/lib/types";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Check } from "lucide-react";
import { useState } from "react";
import { clsx } from "clsx";

interface StepMixerProps {
    mixers: Mixer[];
    drink?: Drink;
    isNaMode?: boolean;
    selectedMixers: string[];
    onNext: (ids: string[]) => void;
}

export function StepMixer({ mixers, drink, isNaMode, selectedMixers: initialSelected, onNext }: StepMixerProps) {
    const [selected, setSelected] = useState<string[]>(initialSelected);

    const toggle = (id: string) => {
        if (selected.includes(id)) {
            setSelected(selected.filter(s => s !== id));
        } else {
            setSelected([...selected, id]);
        }
    };

    const handleNext = () => {
        onNext(selected);
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300 flex flex-col h-full">
            <div className="text-center">
                <h2 className="text-xl font-semibold">
                    {isNaMode ? "Choose your drink" : "Choose your mixer"}
                </h2>
                <p className="text-sm text-slate-400">
                    {isNaMode
                        ? "Select one or more options."
                        : drink
                            ? `What would you like with ${drink.name}?`
                            : "Select your mixers."
                    }
                </p>
            </div>

            <div className="grid grid-cols-2 gap-3 flex-1 overflow-y-auto pb-20">
                {mixers.map(mixer => {
                    const isSelected = selected.includes(mixer.id);
                    return (
                        <button key={mixer.id} onClick={() => toggle(mixer.id)} className="text-left group select-none">
                            <Card className={clsx(
                                "p-4 h-20 flex items-center justify-between transition-all border",
                                isSelected
                                    ? "bg-orange-500/10 border-orange-500"
                                    : "bg-slate-900/40 border-slate-800 hover:border-slate-600"
                            )}>
                                <span className={clsx("font-medium", isSelected ? "text-orange-500" : "text-slate-200")}>
                                    {mixer.name}
                                </span>
                                {isSelected && <Check className="w-5 h-5 text-orange-500" />}
                            </Card>
                        </button>
                    );
                })}
            </div>

            <div className="fixed bottom-6 left-0 right-0 px-4 md:absolute md:bottom-0 md:px-0">
                <Button
                    fullWidth
                    size="lg"
                    onClick={handleNext}
                    disabled={selected.length === 0}
                    className="shadow-xl shadow-black/50"
                >
                    Continue
                </Button>
            </div>
        </div>
    );
}
