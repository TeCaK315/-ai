import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Sales Automation Platform - ROI Dashboard',
  description: 'Track and optimize your sales automation ROI with AI-powered insights and recommendations',
  keywords: 'sales automation, ROI calculator, AI optimization, sales analytics',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background text-text min-h-screen antialiased">
        <div className="min-h-screen bg-gradient-to-br from-background via-gray-900 to-background">
          {children}
        </div>
      </body>
    </html>
  );
}