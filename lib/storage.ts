'use server';

import fs from 'fs/promises';
import path from 'path';
import { AppData } from './types';
import { INITIAL_DATA } from './initial-data';

const DB_PATH = path.join(process.cwd(), 'data', 'db.json');

async function ensureDb() {
    try {
        await fs.access(DB_PATH);
    } catch {
        await fs.writeFile(DB_PATH, JSON.stringify(INITIAL_DATA, null, 2));
    }
}

export async function getAppData(): Promise<AppData> {
    await ensureDb();
    const content = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(content);
}

export async function saveAppData(data: AppData): Promise<void> {
    await ensureDb();
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
}

export async function resetAppData(): Promise<void> {
    await fs.writeFile(DB_PATH, JSON.stringify(INITIAL_DATA, null, 2));
}
