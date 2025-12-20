import { AppData, EventConfig } from "@/lib/types";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Trash2, Plus } from "lucide-react";
import { useState } from "react";

interface EventManagerProps {
    data: AppData;
    onChange: (events: EventConfig[]) => void;
}

export function EventManager({ data, onChange }: EventManagerProps) {
    const [name, setName] = useState("");
    const [date, setDate] = useState("");

    const addEvent = () => {
        if (!name || !date) return;
        const newId = Math.random().toString(36).substr(2, 9);
        onChange([...data.events, { id: newId, name, date }]);
        setName("");
        setDate("");
    };

    const removeEvent = (id: string) => {
        if (confirm("Delete this event?")) {
            onChange(data.events.filter(e => e.id !== id));
        }
    };

    return (
        <div className="space-y-4">
            <Card className="p-4 bg-slate-900/50 space-y-4">
                <h3 className="font-semibold text-lg">Add Event</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Input placeholder="Event Name" value={name} onChange={e => setName(e.target.value)} />
                    <Input type="date" value={date} onChange={e => setDate(e.target.value)} />
                </div>
                <Button onClick={addEvent} disabled={!name || !date} fullWidth>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Event
                </Button>
            </Card>

            <div className="space-y-2">
                {data.events.map(evt => (
                    <Card key={evt.id} className="p-3 flex items-center justify-between border-slate-800">
                        <div>
                            <div className="font-medium">{evt.name}</div>
                            <div className="text-xs text-slate-400">{evt.date}</div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => removeEvent(evt.id)} className="text-red-400 hover:text-red-300">
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </Card>
                ))}
            </div>
        </div>
    );
}
