import { getAppData } from "@/lib/storage";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export default async function AdminPage() {
    const data = await getAppData();

    return (
        <div className="py-2 pb-10">
            <div className="text-center mb-6 pt-4">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-amber-200 bg-clip-text text-transparent inline-block">
                    Manager
                </h1>
            </div>
            <AdminDashboard initialData={data} />
        </div>
    );
}
