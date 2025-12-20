"use client";

import { useState } from "react";
import { AppData, Drink, Mixer, Category, EventConfig } from "@/lib/types";
import { submitBookingAction } from "@/lib/actions";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { StepEvent } from "./StepEvent";
import { StepType } from "./StepType";
import { StepCategory } from "./StepCategory";
import { StepDrink } from "./StepDrink";
import { StepDetails } from "./StepDetails";
import { StepMixer } from "./StepMixer";
import { StepSummary } from "./StepSummary";
import { ChevronLeft } from "lucide-react";

type Step = "EVENT" | "TYPE" | "CATEGORY" | "DRINK" | "MIXER" | "NA_DRINK" | "DETAILS" | "SUMMARY";

interface GuestWizardProps {
    initialData: AppData;
}

export type WizardState = {
    eventId: string | null;
    eventName: string | null;
    type: "alcoholic" | "non-alcoholic" | null;
    categoryId: string | null;
    drinkId: string | null;
    mixerIds: string[];
    guestName: string;
    selfieUrl: string | null;
};

export function GuestWizard({ initialData }: GuestWizardProps) {
    const [step, setStep] = useState<Step>("EVENT");
    const [state, setState] = useState<WizardState>({
        eventId: null,
        eventName: null,
        type: null,
        categoryId: null,
        drinkId: null,
        mixerIds: [],
        guestName: "",
        selfieUrl: null,
    });

    const updateState = (patch: Partial<WizardState>) => {
        setState((prev) => ({ ...prev, ...patch }));
    };

    const goBack = () => {
        switch (step) {
            case "TYPE": setStep("EVENT"); break;
            case "CATEGORY": setStep("TYPE"); break;
            case "DRINK": setStep("CATEGORY"); break;
            case "MIXER": setStep("DRINK"); break;
            case "NA_DRINK": setStep("TYPE"); break;
            case "SUMMARY":
                if (state.type === "alcoholic") setStep("MIXER");
                else setStep("NA_DRINK");
                break;
            default: break;
        }
    };

    return (
        <div className="space-y-4">

            {/* Header / Nav */}
            <div className="flex items-center justify-between">
                {step !== "EVENT" && step !== "SUMMARY" && (
                    <Button variant="ghost" size="icon" onClick={goBack} className="w-10 h-10">
                        <ChevronLeft className="w-6 h-6" />
                    </Button>
                )}
                {step === "EVENT" && <div />} {/* Spacer */}

                <div className="text-sm font-medium text-slate-400 uppercase tracking-widest">
                    {step === "EVENT" && "Step 1/6"}
                    {step === "TYPE" && "Step 2/6"}
                    {step === "CATEGORY" && "Step 3/6"}
                    {step === "DRINK" && "Step 4/6"}
                    {(step === "MIXER" || step === "NA_DRINK") && "Step 5/6"}
                    {step === "DETAILS" && "Step 6/6"}
                    {step === "SUMMARY" && "Confirmed"}
                </div>
                <div className="w-10" /> {/* Spacer */}
            </div>

            {/* Content */}
            <div className="min-h-[60vh] flex flex-col">
                {step === "EVENT" && (
                    <StepEvent
                        data={initialData}
                        onNext={(eventId, eventName) => {
                            updateState({ eventId, eventName });
                            setStep("TYPE");
                        }}
                    />
                )}

                {step === "TYPE" && (
                    <StepType
                        onSelect={(type) => {
                            updateState({ type });
                            if (type === "alcoholic") setStep("CATEGORY");
                            else setStep("NA_DRINK");
                        }}
                    />
                )}

                {step === "CATEGORY" && (
                    <StepCategory
                        categories={initialData.categories}
                        onSelect={(categoryId) => {
                            updateState({ categoryId });
                            setStep("DRINK");
                        }}
                    />
                )}

                {step === "DRINK" && (
                    <StepDrink
                        drinks={initialData.drinks.filter(d => d.categoryId === state.categoryId)}
                        onSelect={(drinkId) => {
                            updateState({ drinkId });
                            setStep("MIXER");
                        }}
                    />
                )}

                {step === "MIXER" && (
                    <StepMixer
                        mixers={initialData.mixers} // Filtered inside component based on drink config
                        drink={initialData.drinks.find(d => d.id === state.drinkId)}
                        selectedMixers={state.mixerIds}
                        onNext={(mixerIds) => {
                            updateState({ mixerIds });
                            setStep("DETAILS");
                        }}
                    />
                )}

                {step === "NA_DRINK" && (
                    <StepMixer
                        mixers={initialData.mixers.filter(m => initialData.nonAlcoholicMixerIds.includes(m.id))}
                        isNaMode
                        selectedMixers={state.mixerIds}
                        onNext={(mixerIds) => {
                            updateState({ mixerIds });
                            setStep("DETAILS");
                        }}
                    />
                )}

                {step === "DETAILS" && (
                    <StepDetails
                        onNext={async (guestName, selfieUrl) => {
                            // Prepare booking data
                            const drink = initialData.drinks.find(d => d.id === state.drinkId);
                            const mixers = initialData.mixers.filter(m => state.mixerIds.includes(m.id));

                            const bookingData = {
                                id: Math.random().toString(36).substr(2, 9),
                                guestName: guestName || "Guest",
                                selfieUrl: selfieUrl || undefined,
                                eventId: state.eventId!,
                                eventName: state.eventName!,
                                drinkId: state.drinkId || "na",
                                drinkName: state.type === "alcoholic" ? (drink?.name || "Unknown") : "Non-Alcoholic",
                                mixerIds: state.mixerIds,
                                mixerNames: mixers.map(m => m.name)
                            };

                            updateState({ guestName, selfieUrl });

                            // Optimistic update or wait? Wait is safer for prototype.
                            await submitBookingAction(bookingData);
                            setStep("SUMMARY");
                        }}
                    />
                )}

                {step === "SUMMARY" && (
                    <StepSummary
                        state={state}
                        data={initialData}
                        onRestart={() => {
                            setStep("TYPE"); // Keep Event, reset drink
                            updateState({
                                type: null, categoryId: null, drinkId: null, mixerIds: [], selfieUrl: null
                            });
                        }}
                    />
                )}
            </div>
        </div>
    );
}
