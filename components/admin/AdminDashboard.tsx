"use client";

import { useState } from "react";
import { AppData } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { DrinkManager } from "./DrinkManager";
import { CategoryManager } from "./CategoryManager";
import { EventManager } from "./EventManager";
import { BookingList } from "./BookingList";
import { saveAppData } from "@/lib/storage";
import { Loader2, Save } from "lucide-react";

interface AdminDashboardProps {
    initialData: AppData;
}

type Tab = "DRINKS" | "CATEGORIES" | "EVENTS" | "BOOKINGS";

export function AdminDashboard({ initialData }: AdminDashboardProps) {
    const [data, setData] = useState<AppData>(initialData);
    const [activeTab, setActiveTab] = useState<Tab>("DRINKS");
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    const handleSave = async () => {
        setSaving(true);
        setMessage(null);
        try {
            await saveAppData(data);
            setMessage("Saved successfully!");
            setTimeout(() => setMessage(null), 3000);
        } catch (err) {
            console.error(err);
            setMessage("Failed to save.");
        } finally {
            setSaving(false);
        }
    };

    const updateData = (patch: Partial<AppData>) => {
        setData(prev => ({ ...prev, ...patch }));
    };

    return (
        <div className="space-y-6">
            <div className="flex gap-2 justify-center flex-wrap px-4">
                <Button
                    variant={activeTab === "DRINKS" ? "primary" : "secondary"}
                    size="sm"
                    onClick={() => setActiveTab("DRINKS")}
                >
                    Drinks
                </Button>
                <Button
                    variant={activeTab === "CATEGORIES" ? "primary" : "secondary"}
                    size="sm"
                    onClick={() => setActiveTab("CATEGORIES")}
                >
                    Categories
                </Button>
                <Button
                    variant={activeTab === "EVENTS" ? "primary" : "secondary"}
                    size="sm"
                    onClick={() => setActiveTab("EVENTS")}
                >
                    Events
                </Button>
                <Button
                    variant={activeTab === "BOOKINGS" ? "primary" : "secondary"}
                    size="sm"
                    onClick={() => setActiveTab("BOOKINGS")}
                >
                    Bookings
                </Button>
            </div>

            <div className="min-h-[50vh]">
                {activeTab === "DRINKS" && (
                    <DrinkManager
                        data={data}
                        onChange={(drinks) => updateData({ drinks })}
                    />
                )}

                {activeTab === "CATEGORIES" && (
                    <CategoryManager
                        data={data}
                        onChange={(categories) => updateData({ categories })}
                    />
                )}

                {activeTab === "EVENTS" && (
                    <EventManager
                        data={data}
                        onChange={(events) => updateData({ events })}
                    />
                )}

                {activeTab === "BOOKINGS" && (
                    <BookingList data={data} />
                )}
            </div>

            <div className="fixed bottom-6 right-6 md:relative md:bottom-auto md:right-auto md:flex md:justify-end">
                <Button
                    onClick={handleSave}
                    disabled={saving}
                    className="shadow-xl bg-green-600 hover:bg-green-700 text-white"
                >
                    {saving ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                    Save Changes
                </Button>
            </div>
            {message && (
                <div className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-slate-800 border border-slate-700 px-4 py-2 rounded-full text-sm shadow-lg animate-in fade-in slide-in-from-bottom-2">
                    {message}
                </div>
            )}
        </div>
    );
}
