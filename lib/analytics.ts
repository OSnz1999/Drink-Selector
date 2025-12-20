import { AppData } from './types';

export interface AnalyticsData {
    totalBookings: number;
    popularDrinks: Array<{
        id: string;
        name: string;
        count: number;
    }>;
    popularMixers: Array<{
        id: string;
        name: string;
        count: number;
    }>;
    bookingsByEvent: Array<{
        eventId: string;
        eventName: string;
        count: number;
    }>;
    recentActivity: Array<{
        time: string;
        count: number;
    }>;
}

export function generateAnalytics(data: AppData): AnalyticsData {
    const bookings = data.bookings || [];

    // Count drink popularity
    const drinkCounts = new Map<string, number>();
    bookings.forEach(booking => {
        const count = drinkCounts.get(booking.drinkId) || 0;
        drinkCounts.set(booking.drinkId, count + 1);
    });

    const popularDrinks = Array.from(drinkCounts.entries())
        .map(([id, count]) => ({
            id,
            name: data.drinks.find(d => d.id === id)?.name || 'Unknown',
            count,
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

    // Count mixer popularity
    const mixerCounts = new Map<string, number>();
    bookings.forEach(booking => {
        booking.mixerIds.forEach(mixerId => {
            const count = mixerCounts.get(mixerId) || 0;
            mixerCounts.set(mixerId, count + 1);
        });
    });

    const popularMixers = Array.from(mixerCounts.entries())
        .map(([id, count]) => ({
            id,
            name: data.mixers.find(m => m.id === id)?.name || 'Unknown',
            count,
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

    // Count bookings by event
    const eventCounts = new Map<string, number>();
    bookings.forEach(booking => {
        const count = eventCounts.get(booking.eventId) || 0;
        eventCounts.set(booking.eventId, count + 1);
    });

    const bookingsByEvent = Array.from(eventCounts.entries())
        .map(([eventId, count]) => ({
            eventId,
            eventName: data.events.find(e => e.id === eventId)?.name || 'Unknown',
            count,
        }));

    // Recent activity (last 24 hours, grouped by hour)
    const now = new Date();
    const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const hourlyActivity = new Map<string, number>();

    bookings
        .filter(b => new Date(b.timestamp) > last24Hours)
        .forEach(booking => {
            const hour = new Date(booking.timestamp).getHours();
            const timeLabel = `${hour}:00`;
            const count = hourlyActivity.get(timeLabel) || 0;
            hourlyActivity.set(timeLabel, count + 1);
        });

    const recentActivity = Array.from(hourlyActivity.entries())
        .map(([time, count]) => ({ time, count }))
        .sort((a, b) => a.time.localeCompare(b.time));

    return {
        totalBookings: bookings.length,
        popularDrinks,
        popularMixers,
        bookingsByEvent,
        recentActivity,
    };
}
