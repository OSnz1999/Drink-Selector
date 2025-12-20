'use server';

import fs from 'fs/promises';
import path from 'path';
import { AppData } from './types';
import { INITIAL_DATA } from './initial-data';

const DB_PATH = path.join(process.cwd(), 'data', 'db.json');

// In-memory cache to persist state across hot-reloads (if module isn't cleared) 
// and to serve as source of truth when FS is read-only (Vercel).
let cachedData: AppData | null = null;

async function ensureData(): Promise<AppData> {
    if (cachedData) return cachedData;

    try {
        await fs.access(DB_PATH);
        const content = await fs.readFile(DB_PATH, 'utf-8');
        cachedData = JSON.parse(content);
    } catch (error) {
        console.warn("Could not read db.json (or file missing), utilizing initial data.", error);
        // Fallback to initial data if file missing or unreadable
        // We clone to avoid mutating the exported constant if we modify cachedData later
        cachedData = JSON.parse(JSON.stringify(INITIAL_DATA));
    }

    return cachedData!;
}

export async function getAppData(): Promise<AppData> {
    return await ensureData();
}

export async function saveAppData(data: AppData): Promise<void> {
    // 1. Update in-memory cache immediately so the UI reflects the change
    cachedData = data;

    // 2. Try to persist to disk, but handle "Read-only file system" errors gracefully
    try {
        // Ensure directory exists if we are in a writable env
        const dir = path.dirname(DB_PATH);
        try { await fs.access(dir); } catch { await fs.mkdir(dir, { recursive: true }).catch(() => { }); }

        await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
    } catch (error: any) {
        // Check for specific error codes if needed, but for now we just log warning
        if (error.code === 'EROFS' || error.message.includes('read-only')) {
            console.warn("Detected read-only file system (Vercel). Data saved to memory only.", error.message);
        } else {
            console.error("Failed to save db.json:", error);
        }
    }
}

export async function resetAppData(): Promise<void> {
    const freshData = JSON.parse(JSON.stringify(INITIAL_DATA));
    await saveAppData(freshData);
}
