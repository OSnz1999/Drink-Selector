import { WizardState, GuestWizard } from "./GuestWizard"; // Need types? Actually lets just use props
import { AppData } from "@/lib/types";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, RotateCcw } from "lucide-react";

export interface StepSummaryProps {
    state: WizardState; // We'll need to export WizardState from somewhere or redefine
    data: AppData;
    onRestart: () => void;
}

export function StepSummary({ state, data, onRestart }: StepSummaryProps) {
    const event = data.events.find(e => e.id === state.eventId);
    const drink = data.drinks.find(d => d.id === state.drinkId);

    // Mixers
    const mixers = data.mixers.filter(m => state.mixerIds.includes(m.id));
    const mixerNames = mixers.map(m => m.name).join(" + ");

    const isAlc = state.type === "alcoholic";
    const mainTitle = isAlc ? drink?.name : "Non-Alcoholic";

    return (
        <div className="space-y-6 animate-in zoom-in-95 duration-500">
            <div className="text-center space-y-2">
                <div className="mx-auto w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-white">Order Ready!</h2>
                <p className="text-slate-400">Show this screen to the bartender.</p>
            </div>

            <Card className="bg-gradient-to-b from-slate-800 to-slate-900 border-orange-500/30 overflow-hidden relative">
                {/* Top colored strip */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-orange-500 to-yellow-500" />

                <div className="p-6 space-y-6">
                    <div className="text-center border-b border-slate-700/50 pb-6">
                        <div className="uppercase tracking-widest text-xs text-slate-500 mb-1">{event?.name || "Event"}</div>
                        <div className="text-3xl font-bold text-white mb-2 leading-tight">
                            {mainTitle}
                        </div>
                        {mixerNames && (
                            <div className="text-lg text-orange-400 font-medium">
                                with {mixerNames}
                            </div>
                        )}
                    </div>

                    {state.selfieUrl && (
                        <div className="flex justify-center">
                            <div className="w-32 h-32 rounded-full border-4 border-slate-700 overflow-hidden shadow-xl">
                                <img src={state.selfieUrl} className="w-full h-full object-cover" />
                            </div>
                        </div>
                    )}

                    <div className="text-center">
                        {state.guestName && (
                            <div className="text-xl font-semibold">{state.guestName}</div>
                        )}
                        <div className="text-xs text-slate-500 mt-1 uppercase tracking-widest">
                            Guest
                        </div>
                    </div>
                </div>
            </Card>

            <div className="pt-4">
                <Button variant="secondary" fullWidth onClick={onRestart}>
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Start New Order
                </Button>
            </div>
        </div>
    );
}
