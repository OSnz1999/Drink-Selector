import { AppData, Drink } from "@/lib/types";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Trash2, Plus, Edit2, Upload, Loader2, X } from "lucide-react";
import { useState, useRef } from "react";
import { uploadImageAction } from "@/lib/actions";

interface DrinkManagerProps {
    data: AppData;
    onChange: (drinks: Drink[]) => void;
}

export function DrinkManager({ data, onChange }: DrinkManagerProps) {
    const [editingId, setEditingId] = useState<string | null>(null);

    // Form state
    const [name, setName] = useState("");
    const [catId, setCatId] = useState("");
    const [image, setImage] = useState("");
    const [mixerIds, setMixerIds] = useState<string[]>([]);
    const [uploading, setUploading] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const startEdit = (drink?: Drink) => {
        if (drink) {
            setEditingId(drink.id);
            setName(drink.name);
            setCatId(drink.categoryId);
            setImage(drink.image || "");
            setMixerIds(drink.mixerIds || []);
        } else {
            setEditingId("new");
            setName("");
            setCatId(data.categories[0]?.id || "");
            setImage("");
            setMixerIds([]);
        }
    };

    const cancelEdit = () => {
        setEditingId(null);
    };

    const saveDrink = () => {
        if (!name || !catId) return;

        const newDrink: Drink = {
            id: editingId === "new" ? Math.random().toString(36).substr(2, 9) : editingId!,
            name,
            categoryId: catId,
            image,
            mixerIds
        };

        if (editingId === "new") {
            onChange([...data.drinks, newDrink]);
        } else {
            onChange(data.drinks.map(d => d.id === editingId ? newDrink : d));
        }
        setEditingId(null);
    };

    const removeDrink = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (confirm("Delete this drink?")) {
            onChange(data.drinks.filter(d => d.id !== id));
        }
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        try {
            const formData = new FormData();
            formData.append("file", file);
            const url = await uploadImageAction(formData);
            setImage(url);
        } catch (err) {
            alert("Upload failed");
        } finally {
            setUploading(false);
        }
    };

    const toggleMixer = (mId: string) => {
        if (mixerIds.includes(mId)) setMixerIds(mixerIds.filter(id => id !== mId));
        else setMixerIds([...mixerIds, mId]);
    };

    if (editingId) {
        return (
            <Card className="bg-slate-900 border-orange-500/50 p-4 space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-lg">{editingId === "new" ? "New Drink" : "Edit Drink"}</h3>
                    <Button variant="ghost" size="icon" onClick={cancelEdit}><X className="w-5 h-5" /></Button>
                </div>

                <div className="grid gap-4">
                    <div>
                        <label className="text-sm text-slate-400">Name</label>
                        <Input value={name} onChange={e => setName(e.target.value)} placeholder="Drink Name" />
                    </div>

                    <div>
                        <label className="text-sm text-slate-400">Category</label>
                        <select
                            className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white"
                            value={catId}
                            onChange={e => setCatId(e.target.value)}
                        >
                            {data.categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                    </div>

                    <div>
                        <label className="text-sm text-slate-400">Image</label>
                        <div className="flex gap-2 items-center mt-1">
                            {image && <img src={image} className="w-12 h-12 rounded object-cover border border-slate-700" />}
                            <Button type="button" variant="secondary" size="sm" onClick={() => fileInputRef.current?.click()} disabled={uploading}>
                                {uploading ? <Loader2 className="animate-spin w-4 h-4" /> : <Upload className="w-4 h-4 mr-2" />}
                                Upload
                            </Button>
                            <input type="file" ref={fileInputRef} className="hidden" onChange={handleUpload} accept="image/*" />
                            {image && <Button variant="ghost" size="icon" onClick={() => setImage("")}><Trash2 className="w-4 h-4" /></Button>}
                        </div>
                    </div>

                    <div>
                        <label className="text-sm text-slate-400 block mb-2">Allowed Mixers</label>
                        <div className="flex flex-wrap gap-2">
                            {data.mixers.map(m => (
                                <button
                                    key={m.id}
                                    onClick={() => toggleMixer(m.id)}
                                    className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${mixerIds.includes(m.id) ? 'bg-orange-500 border-orange-500 text-black font-semibold' : 'bg-slate-950 border-slate-700 text-slate-400 hover:border-slate-500'}`}
                                >
                                    {m.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="pt-2 flex gap-2">
                        <Button onClick={saveDrink} disabled={!name || !catId} fullWidth>Save Drink</Button>
                    </div>
                </div>
            </Card>
        );
    }

    return (
        <div className="space-y-4">
            <Button onClick={() => startEdit()} fullWidth className="bg-slate-800 hover:bg-slate-700 border-dashed border border-slate-600 h-12">
                <Plus className="w-5 h-5 mr-2" /> Add New Drink
            </Button>

            <div className="space-y-8">
                {data.categories.map(category => {
                    const categoryDrinks = data.drinks.filter(d => d.categoryId === category.id);
                    if (categoryDrinks.length === 0) return null;

                    return (
                        <div key={category.id} className="space-y-3">
                            <h3 className="text-lg font-semibold text-slate-400 border-b border-slate-800 pb-1">{category.name}</h3>
                            <div className="grid gap-3">
                                {categoryDrinks.map(drink => (
                                    <Card
                                        key={drink.id}
                                        className="p-3 flex items-center gap-3 border-slate-800 hover:border-slate-600 cursor-pointer group bg-slate-900/40"
                                        onClick={() => startEdit(drink)}
                                    >
                                        <div className="w-12 h-12 bg-slate-950 rounded border border-slate-800 flex items-center justify-center overflow-hidden shrink-0">
                                            {drink.image ? (
                                                <img src={drink.image} className="w-full h-full object-cover" alt={drink.name} />
                                            ) : (
                                                <span className="text-2xl opacity-50">🥃</span>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="font-semibold truncate text-slate-200">{drink.name}</div>
                                            <div className="text-xs text-slate-500">{drink.mixerIds.length} mixers</div>
                                        </div>
                                        <Button variant="ghost" size="icon" onClick={(e) => removeDrink(drink.id, e)} className="text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    );
                })}

                {data.drinks.length === 0 && (
                    <div className="text-center py-10 text-slate-500">
                        No drinks added yet.
                    </div>
                )}
            </div>
        </div>
    );
}
