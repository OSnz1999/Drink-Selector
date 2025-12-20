import { AppData } from './types';

export function exportData(data: AppData): string {
    return JSON.stringify(data, null, 2);
}

export function downloadJSON(data: AppData, filename: string = 'eventbar-data.json') {
    const jsonString = exportData(data);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

export async function importData(file: File): Promise<AppData> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target?.result as string);
                // Basic validation
                if (!data.drinks || !data.categories || !data.mixers || !data.events) {
                    throw new Error('Invalid data format');
                }
                resolve(data);
            } catch (error) {
                reject(new Error('Failed to parse JSON file'));
            }
        };

        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsText(file);
    });
}

export function exportBookingsCSV(data: AppData): string {
    const headers = ['ID', 'Guest Name', 'Event', 'Drink', 'Mixers', 'Timestamp'];
    const rows = data.bookings?.map(b => [
        b.id,
        b.guestName,
        b.eventName,
        b.drinkName,
        b.mixerNames.join('; '),
        new Date(b.timestamp).toLocaleString(),
    ]) || [];

    const csv = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
    ].join('\n');

    return csv;
}

export function downloadCSV(data: AppData, filename: string = 'eventbar-bookings.csv') {
    const csv = exportBookingsCSV(data);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}
