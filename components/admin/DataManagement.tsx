'use client';

import { Download, Upload, FileDown } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { AppData } from '@/lib/types';
import { downloadJSON, downloadCSV, importData } from '@/lib/export-import';
import { toast } from 'sonner';
import { useRef } from 'react';

interface DataManagementProps {
    data: AppData;
    onImport: (data: AppData) => void;
}

export function DataManagement({ data, onImport }: DataManagementProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleExportJSON = () => {
        try {
            downloadJSON(data);
            toast.success('Data exported successfully!');
        } catch (error) {
            toast.error('Failed to export data');
        }
    };

    const handleExportCSV = () => {
        try {
            downloadCSV(data);
            toast.success('Bookings exported to CSV!');
        } catch (error) {
            toast.error('Failed to export bookings');
        }
    };

    const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            const importedData = await importData(file);
            onImport(importedData);
            toast.success('Data imported successfully!', {
                description: 'Remember to save changes.',
            });
        } catch (error) {
            toast.error('Failed to import data', {
                description: error instanceof Error ? error.message : 'Invalid file format',
            });
        }

        // Reset input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <Card className="p-6 bg-slate-900/40 border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Data Management</h3>
            <div className="space-y-3">
                <div className="flex gap-3">
                    <Button
                        variant="secondary"
                        onClick={handleExportJSON}
                        className="flex-1 gap-2"
                    >
                        <Download className="w-4 h-4" />
                        Export All Data (JSON)
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={handleExportCSV}
                        className="flex-1 gap-2"
                    >
                        <FileDown className="w-4 h-4" />
                        Export Bookings (CSV)
                    </Button>
                </div>

                <div>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".json"
                        onChange={handleImport}
                        className="hidden"
                    />
                    <Button
                        variant="secondary"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full gap-2"
                    >
                        <Upload className="w-4 h-4" />
                        Import Data (JSON)
                    </Button>
                </div>

                <p className="text-xs text-slate-500 mt-2">
                    Export your data for backup or import previously saved configurations.
                </p>
            </div>
        </Card>
    );
}
