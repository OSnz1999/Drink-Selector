import { useState, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { Camera, Upload, User, Loader2 } from "lucide-react";
import { uploadImageAction } from "@/lib/actions";

interface StepDetailsProps {
    onNext: (name: string, selfieUrl: string | null) => void;
}

export function StepDetails({ onNext }: StepDetailsProps) {
    const [name, setName] = useState("");
    const [selfieUrl, setSelfieUrl] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            const formData = new FormData();
            formData.append("file", file);
            const url = await uploadImageAction(formData);
            setSelfieUrl(url);
        } catch (err) {
            console.error("Upload failed", err);
            alert("Failed to upload image. Please try again.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="text-center">
                <h2 className="text-xl font-semibold">Almost there!</h2>
                <p className="text-sm text-slate-400">Help the bartender identify you.</p>
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium ml-1">Your Name (Optional)</label>
                    <div className="relative">
                        <User className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                        <Input
                            placeholder="e.g. John"
                            className="pl-10"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium ml-1">Selfie (Optional but encouraged!)</label>
                    <Card
                        className="border-dashed border-2 border-slate-700 bg-slate-900/30 flex flex-col items-center justify-center p-6 gap-3 cursor-pointer hover:bg-slate-900/50 hover:border-slate-500 transition-colors"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                        />

                        {uploading ? (
                            <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
                        ) : selfieUrl ? (
                            <div className="relative w-full h-40 rounded-lg overflow-hidden">
                                <img src={selfieUrl} alt="Selfie" className="w-full h-full object-cover" />
                            </div>
                        ) : (
                            <>
                                <div className="bg-slate-800 p-3 rounded-full">
                                    <Camera className="w-6 h-6 text-slate-300" />
                                </div>
                                <div className="text-xs text-slate-400 text-center">
                                    Tap to take a selfie or upload a photo.
                                    <br />
                                    <span className="opacity-50">Used only for this order.</span>
                                </div>
                            </>
                        )}
                    </Card>
                </div>
            </div>

            <Button fullWidth size="lg" onClick={() => onNext(name, selfieUrl)} disabled={uploading}>
                Show my order
            </Button>
        </div>
    );
}
