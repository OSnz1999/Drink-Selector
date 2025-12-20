'use client';

import { Toaster as Sonner } from 'sonner';

export function Toaster() {
    return (
        <Sonner
            position="top-center"
            toastOptions={{
                style: {
                    background: 'rgba(15, 23, 42, 0.98)',
                    border: '1px solid rgba(51, 65, 85, 0.5)',
                    color: '#f8fafc',
                    backdropFilter: 'blur(12px)',
                },
                className: 'toast',
            }}
            theme="dark"
            richColors
        />
    );
}
