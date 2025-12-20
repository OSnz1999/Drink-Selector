import { AppData, EventConfig } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Calendar } from "lucide-react";

interface StepEventProps {
    data: AppData;
    onNext: (eventId: string, eventName: string) => void;
}

export function StepEvent({ data, onNext }: StepEventProps) {
    // Simple event listing for now.
    // In future, could check Date to only show active events.
    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-2xl font-semibold mb-2">Welcome!</h2>
                <p className="text-slate-400">Please select your event to get started.</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {data.events.map((evt) => (
                    <button
                        key={evt.id}
                        onClick={() => onNext(evt.id, evt.name)}
                        className="w-full text-left"
                    >
                        <Card className="hover:bg-slate-800 transition-colors border-2 border-transparent hover:border-orange-500/50 flex items-center p-4 bg-slate-900">
                            <div className="bg-orange-500/10 p-3 rounded-full mr-4 text-orange-500 shrink-0">
                                <Calendar className="w-6 h-6" />
                            </div>
                            <div>
                                <div className="font-semibold text-lg text-white">{evt.name}</div>
                                <div className="text-sm text-slate-400">{evt.date === today ? "Happening Today" : evt.date}</div>
                            </div>
                        </Card>
                    </button>
                ))}
            </div>

            {data.events.length === 0 && (
                <div className="text-center text-slate-500 p-8 border border-dashed border-slate-700 rounded-xl">
                    No events scheduled.
                </div>
            )}
        </div>
    );
}
