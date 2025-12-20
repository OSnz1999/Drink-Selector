"use client";

import { useState } from "react";
import { AppData } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { DrinkManager } from "./DrinkManager";
import { CategoryManager } from "./CategoryManager";
import { EventManager } from "./EventManager";
import { BookingList } from "./BookingList";
import { AnalyticsDashboard } from "./AnalyticsDashboard";
import { saveAppData } from "@/lib/storage";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";

interface AdminDashboardProps {
    initialData: AppData;
}

type Tab = "ANALYTICS" | "DRINKS" | "CATEGORIES" | "EVENTS" | "BOOKINGS";

export function AdminDashboard({ initialData }: AdminDashboardProps) {
    const [data, setData] = useState<AppData>(initialData);
    const [activeTab, setActiveTab] = useState<Tab>("ANALYTICS");
    const [saving, setSaving] = useState(false);

    const handleSave = async () => {
        setSaving(true);
        try {
            await saveAppData(data);
            toast.success('Changes saved successfully!', {
                description: 'Your updates have been saved.',
            });
        } catch (err) {
            console.error(err);
            toast.error('Failed to save changes', {
                description: 'Please try again.',
            });
        } finally {
            setSaving(false);
        }
    };

    const updateData = (patch: Partial<AppData>) => {
        setData(prev => ({ ...prev, ...patch }));
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-amber-200 bg-clip-text text-transparent">
                        Event Manager
                    </h1>
                    <p className="text-slate-400 text-sm mt-1">Manage your event drinks and settings</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 justify-center flex-wrap px-4 border-b border-slate-800">
                <Button
                    variant={activeTab === "ANALYTICS" ? "primary" : "secondary"}
                    size="sm"
                    onClick={() => setActiveTab("ANALYTICS")}
                    className={activeTab === "ANALYTICS" ? "border-b-2 border-orange-500 rounded-b-none" : ""}
                >
                    Analytics
                </Button>
                <Button
                    variant={activeTab === "DRINKS" ? "primary" : "secondary"}
                    size="sm"
                    onClick={() => setActiveTab("DRINKS")}
                    className={activeTab === "DRINKS" ? "border-b-2 border-orange-500 rounded-b-none" : ""}
                >
                    Drinks
                </Button>
                <Button
                    variant={activeTab === "CATEGORIES" ? "primary" : "secondary"}
                    size="sm"
                    onClick={() => setActiveTab("CATEGORIES")}
                    className={activeTab === "CATEGORIES" ? "border-b-2 border-orange-500 rounded-b-none" : ""}
                >
                    Categories
                </Button>
                <Button
                    variant={activeTab === "EVENTS" ? "primary" : "secondary"}
                    size="sm"
                    onClick={() => setActiveTab("EVENTS")}
                    className={activeTab === "EVENTS" ? "border-b-2 border-orange-500 rounded-b-none" : ""}
                >
                    Events
                </Button>
                <Button
                    variant={activeTab === "BOOKINGS" ? "primary" : "secondary"}
                    size="sm"
                    onClick={() => setActiveTab("BOOKINGS")}
                    className={activeTab === "BOOKINGS" ? "border-b-2 border-orange-500 rounded-b-none" : ""}
                >
                    Bookings
                </Button>
            </div>

            {/* Tab Content */}
            <div className="min-h-[50vh]">
                {activeTab === "ANALYTICS" && (
                    <AnalyticsDashboard data={data} />
                )}

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

            {/* Save Button */}
            <div className="fixed bottom-6 right-6 md:relative md:bottom-auto md:right-auto md:flex md:justify-end">
                <Button
                    onClick={handleSave}
                    disabled={saving}
                    className="shadow-xl bg-green-600 hover:bg-green-700 text-white gap-2"
                >
                    {saving ? <Loader2 className="animate-spin w-4 h-4" /> : <Save className="w-4 h-4" />}
                    {saving ? "Saving..." : "Save Changes"}
                </Button>
            </div>
        </div>
    );
}
