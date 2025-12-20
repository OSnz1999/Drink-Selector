import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'EventBar - Smart Drink Ordering',
    description: 'Skip the queue. Browse the menu, customize your drink, and order in seconds.',
    manifest: '/manifest.json',
    themeColor: '#f97316',
    appleWebApp: {
        capable: true,
        statusBarStyle: 'black-translucent',
        title: 'EventBar',
    },
    viewport: {
        width: 'device-width',
        initialScale: 1,
        maximumScale: 1,
        userScalable: false,
    },
};
