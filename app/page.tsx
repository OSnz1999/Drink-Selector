import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ArrowRight, Settings } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] py-10 relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-orange-500/10 to-transparent pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="text-center space-y-6 max-w-md z-10 mb-10">
        <div className="relative inline-block">
          <h1 className="text-6xl font-black tracking-tighter bg-gradient-to-tr from-orange-400 via-amber-200 to-white bg-clip-text text-transparent pb-2 drop-shadow-sm">
            EventBar
          </h1>
          <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
        </div>

        <p className="text-slate-400 text-lg font-light leading-relaxed">
          Skip the queue. Browse the menu, customize your drink, and order in seconds.
        </p>
      </div>

      <Card className="w-full max-w-sm space-y-6 bg-slate-900/80 backdrop-blur-xl border-slate-800 shadow-2xl p-6 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        <div className="space-y-4 relative z-10">
          <Link href="/guest" className="block w-full group/btn">
            {/* Using a standard div instead of relying on button internal flex to ensure layout */}
            <div className="bg-orange-600 hover:bg-orange-500 text-white rounded-xl p-4 flex items-center justify-between transition-all shadow-lg shadow-orange-900/20 group-hover/btn:shadow-orange-500/20 h-24 border border-orange-500/50">
              <div className="flex flex-col items-start gap-1">
                <span className="font-bold text-2xl tracking-tight">Start Order</span>
                <span className="text-sm text-orange-200/80 font-medium">I'm a Guest</span>
              </div>
              <div className="bg-white/20 p-3 rounded-full group-hover/btn:bg-white/30 transition-colors">
                <ArrowRight className="w-6 h-6" />
              </div>
            </div>
          </Link>

          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-slate-700/50"></div>
            <span className="flex-shrink-0 mx-4 text-slate-500 text-[10px] uppercase tracking-[0.2em] font-medium">Administration</span>
            <div className="flex-grow border-t border-slate-700/50"></div>
          </div>

          <Link href="/admin" className="block w-full">
            <Button variant="ghost" className="w-full border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white h-14" fullWidth>
              <Settings className="mr-3 w-4 h-4" />
              Manage Event
            </Button>
          </Link>
        </div>
      </Card>

      <div className="mt-12 text-center space-y-2 relative z-10">
        <p className="text-[10px] text-slate-600 uppercase tracking-widest opacity-50">
          Powered by Next.js
        </p>
      </div>
    </div>
  );
}
