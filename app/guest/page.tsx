import { getAppData } from "@/lib/storage";
import { GuestWizard } from "@/components/guest/GuestWizard";

export default async function GuestPage() {
    const data = await getAppData();

    return (
        <div className="py-4">
            <GuestWizard initialData={data} />
        </div>
    );
}
