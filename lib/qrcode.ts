import QRCode from 'qrcode';

export async function generateQRCode(data: string): Promise<string> {
    try {
        const qrDataUrl = await QRCode.toDataURL(data, {
            width: 300,
            margin: 2,
            color: {
                dark: '#000000',
                light: '#FFFFFF',
            },
        });
        return qrDataUrl;
    } catch (error) {
        console.error('Failed to generate QR code', error);
        throw error;
    }
}

export function generateBookingQRData(booking: {
    id: string;
    guestName: string;
    drinkName: string;
    mixerNames: string[];
}): string {
    return JSON.stringify({
        id: booking.id,
        guest: booking.guestName,
        drink: booking.drinkName,
        mixers: booking.mixerNames.join(', '),
        timestamp: new Date().toISOString(),
    });
}
