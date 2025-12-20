import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ArrowRight, Settings } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] gap-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-orange-400 to-amber-200 bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(to right, #fb923c, #fcd34d)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Drink Selector
        </h1>
        <p className="text-muted-foreground text-lg">
          Avoid the queue. Pre-select your drink.
        </p>
      </div>

      <Card className="w-full space-y-6 bg-opacity-50">
        <div className="space-y-4">
          <Link href="/guest" className="block w-full">
            <Button size="lg" className="w-full text-lg h-16" fullWidth>
              Start Ordering
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>

          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-slate-700"></div>
            <span className="flex-shrink-0 mx-4 text-slate-500 text-xs uppercase tracking-wider">Staff Access</span>
            <div className="flex-grow border-t border-slate-700"></div>
          </div>

          <Link href="/admin" className="block w-full">
            <Button variant="secondary" className="w-full" fullWidth>
              <Settings className="mr-2 w-4 h-4" />
              Event Manager
            </Button>
          </Link>
        </div>
      </Card>

      <p className="text-xs text-slate-600">
        © {new Date().getFullYear()} Event Bar Services
      </p>
    </div>
  );
}
