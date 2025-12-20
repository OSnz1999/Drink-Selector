import { AppData, Booking } from "@/lib/types";
import { Card } from "@/components/ui/Card";
import { User, Clock } from "lucide-react";

interface BookingListProps {
    data: AppData;
    onChange?: (bookings: Booking[]) => void; // If we want to delete/clear
}

export function BookingList({ data }: BookingListProps) {
    const bookings = data.bookings || [];

    if (bookings.length === 0) {
        return (
            <div className="text-center text-slate-500 py-10">
                No bookings yet.
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {bookings.map((booking) => (
                <Card key={booking.id} className="p-4 flex gap-4 bg-slate-900/40 border-slate-800">
                    <div className="w-16 h-16 bg-slate-800 rounded-lg overflow-hidden shrink-0">
                        {booking.selfieUrl ? (
                            <img src={booking.selfieUrl} className="w-full h-full object-cover" alt="Guest" />
                        ) : (
                            <div className="flex items-center justify-center h-full text-slate-500 bg-slate-800/50">
                                <User className="w-6 h-6" />
                            </div>
                        )}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                            <div className="font-bold text-lg">{booking.guestName || "Guest"}</div>
                            <div className="text-xs text-slate-500 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {new Date(booking.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                        </div>
                        <div className="text-orange-400 font-medium">{booking.drinkName}</div>
                        <div className="text-sm text-slate-400">
                            {booking.mixerNames.length > 0 ? `+ ${booking.mixerNames.join(", ")}` : "No mixer"}
                        </div>
                        <div className="text-xs text-slate-600 mt-1 uppercase">
                            {booking.eventName}
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
}
