import "./globals.css";
import { Analytics } from '@vercel/analytics/next';

export const metadata = {
  title: "Rate My Idea",
  description: "Instantly rate your startup or product idea with one click.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900 font-sans">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
