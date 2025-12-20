'use client';

import { AppData } from '@/lib/types';
import { generateAnalytics } from '@/lib/analytics';
import { Card } from '@/components/ui/Card';
import { TrendingUp, Users, Wine, Droplets } from 'lucide-react';

interface AnalyticsDashboardProps {
    data: AppData;
}

export function AnalyticsDashboard({ data }: AnalyticsDashboardProps) {
    const analytics = generateAnalytics(data);

    const stats = [
        {
            label: 'Total Orders',
            value: analytics.totalBookings,
            icon: Users,
            color: 'text-blue-400',
            bgColor: 'bg-blue-500/10',
        },
        {
            label: 'Unique Drinks',
            value: data.drinks.length,
            icon: Wine,
            color: 'text-orange-400',
            bgColor: 'bg-orange-500/10',
        },
        {
            label: 'Mixer Options',
            value: data.mixers.length,
            icon: Droplets,
            color: 'text-cyan-400',
            bgColor: 'bg-cyan-500/10',
        },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold mb-2">Analytics Overview</h2>
                <p className="text-slate-400 text-sm">Track your event's drink ordering trends</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={stat.label} className="p-4 bg-slate-900/40 border-slate-800">
                            <div className="flex items-center gap-3">
                                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                                    <Icon className={`w-5 h-5 ${stat.color}`} />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold">{stat.value}</div>
                                    <div className="text-xs text-slate-500">{stat.label}</div>
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>

            {/* Popular Drinks */}
            {analytics.popularDrinks.length > 0 && (
                <Card className="p-6 bg-slate-900/40 border-slate-800">
                    <div className="flex items-center gap-2 mb-4">
                        <TrendingUp className="w-5 h-5 text-orange-400" />
                        <h3 className="font-semibold text-lg">Most Popular Drinks</h3>
                    </div>
                    <div className="space-y-3">
                        {analytics.popularDrinks.map((drink, index) => (
                            <div key={drink.id} className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 font-bold text-sm">
                                    #{index + 1}
                                </div>
                                <div className="flex-1">
                                    <div className="font-medium">{drink.name}</div>
                                    <div className="text-xs text-slate-500">{drink.count} orders</div>
                                </div>
                                <div className="h-2 flex-1 bg-slate-800 rounded-full overflow-hidden max-w-[100px]">
                                    <div
                                        className="h-full bg-gradient-to-r from-orange-500 to-amber-400"
                                        style={{
                                            width: `${(drink.count / analytics.popularDrinks[0].count) * 100}%`,
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            )}

            {/* Popular Mixers */}
            {analytics.popularMixers.length > 0 && (
                <Card className="p-6 bg-slate-900/40 border-slate-800">
                    <div className="flex items-center gap-2 mb-4">
                        <Droplets className="w-5 h-5 text-cyan-400" />
                        <h3 className="font-semibold text-lg">Popular Mixers</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {analytics.popularMixers.map((mixer) => (
                            <div
                                key={mixer.id}
                                className="px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm"
                            >
                                {mixer.name} ({mixer.count})
                            </div>
                        ))}
                    </div>
                </Card>
            )}

            {/* Events Breakdown */}
            {analytics.bookingsByEvent.length > 0 && (
                <Card className="p-6 bg-slate-900/40 border-slate-800">
                    <h3 className="font-semibold text-lg mb-4">Orders by Event</h3>
                    <div className="space-y-3">
                        {analytics.bookingsByEvent.map((event) => (
                            <div key={event.eventId} className="flex items-center justify-between">
                                <span className="text-slate-300">{event.eventName}</span>
                                <span className="font-semibold text-orange-400">{event.count} orders</span>
                            </div>
                        ))}
                    </div>
                </Card>
            )}

            {analytics.totalBookings === 0 && (
                <Card className="p-12 text-center bg-slate-900/20 border-slate-800">
                    <div className="text-slate-500 space-y-2">
                        <TrendingUp className="w-12 h-12 mx-auto opacity-50" />
                        <p className="font-medium">No orders yet</p>
                        <p className="text-sm">Analytics will appear once guests start ordering</p>
                    </div>
                </Card>
            )}
        </div>
    );
}
