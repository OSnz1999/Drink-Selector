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
        </main>
      </body>
    </html>
  );
}
