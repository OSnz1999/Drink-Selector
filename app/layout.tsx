import type { Metadata } from 'next';
import './globals.css';
import { clsx } from "clsx";

export const metadata: Metadata = {
  title: 'Drink Selector',
  description: 'Pre-book your drinks for the event.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={clsx("antialiased")} suppressHydrationWarning>
        <main className="container">
          {children}

          <div className="fixed bottom-2 right-2 z-50 opacity-0 hover:opacity-100 transition-opacity">
            <a href="/admin" className="p-2 bg-slate-800/50 rounded-full text-xs text-slate-500 hover:text-white hover:bg-slate-700 block">
              Admin
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
