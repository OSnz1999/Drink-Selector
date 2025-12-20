'use server';

import { put } from '@vercel/blob';
import { getAppData, saveAppData } from './storage';
import { Booking } from './types';

export async function uploadImageAction(formData: FormData): Promise<string> {
    const file = formData.get('file') as File;
    if (!file) {
        throw new Error('No file provided');
    }

    // If no token is configured, return a mock URL for development
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
        console.warn("Missing BLOB_READ_WRITE_TOKEN, returning mock URL");
        // Use a distinct placeholder service or just a data URI if small? No, data URI is too big.
        // Use placehold.co
        return `https://placehold.co/400x600?text=${encodeURIComponent(file.name)}`;
    }

    const blob = await put(file.name, file, {
        access: 'public',
    });

    return blob.url;
}

export async function submitBookingAction(booking: Omit<Booking, "timestamp">): Promise<boolean> {
    try {
        const data = await getAppData();
        const newBooking: Booking = {
            ...booking,
            timestamp: new Date().toISOString()
        };
        // Prepend to list
        data.bookings = [newBooking, ...(data.bookings || [])];
        await saveAppData(data);
        return true;
    } catch (e) {
        console.error("Failed to submit booking", e);
        return false;
    }
}
