import { AppData, Category } from "@/lib/types";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Trash2, Plus } from "lucide-react";
import { useState } from "react";

interface CategoryManagerProps {
    data: AppData;
    onChange: (categories: Category[]) => void;
}

export function CategoryManager({ data, onChange }: CategoryManagerProps) {
    const [newCatName, setNewCatName] = useState("");

    const addCategory = () => {
        if (!newCatName.trim()) return;
        const newId = newCatName.toLowerCase().replace(/[^a-z0-9]/g, '-');
        // Ensure unique ID
        let finalId = newId;
        let i = 1;
        while (data.categories.find(c => c.id === finalId)) {
            finalId = `${newId}-${i++}`;
        }

        onChange([...data.categories, { id: finalId, name: newCatName }]);
        setNewCatName("");
    };

    const removeCategory = (id: string) => {
        if (confirm("Delete this category? Drinks in it may be orphaned.")) {
            onChange(data.categories.filter(c => c.id !== id));
        }
    };

    return (
        <div className="space-y-4">
            <Card className="p-4 bg-slate-900/50 space-y-4">
                <h3 className="font-semibold text-lg">Add Category</h3>
                <div className="flex gap-2">
                    <Input
                        placeholder="Category Name (e.g. Tequila)"
                        value={newCatName}
                        onChange={e => setNewCatName(e.target.value)}
                    />
                    <Button onClick={addCategory} disabled={!newCatName.trim()}>
                        <Plus className="w-4 h-4" />
                    </Button>
                </div>
            </Card>

            <div className="space-y-2">
                {data.categories.map(cat => (
                    <Card key={cat.id} className="p-3 flex items-center justify-between border-slate-800">
                        <span className="font-medium">{cat.name}</span>
                        <Button variant="ghost" size="icon" onClick={() => removeCategory(cat.id)} className="text-red-400 hover:text-red-300">
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </Card>
                ))}
            </div>
        </div>
    );
}
