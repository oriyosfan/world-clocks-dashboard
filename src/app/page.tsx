'use client';
import { ClockDashboard } from '@/features/clock';
import { ThemeToggle } from '@/features/theme-toggle';

export default function Home() {
  return (
    <div className="min-h-screen items-center justify-items-center p-8 pb-20 sm:p-20">
      <div className="fixed top-3 left-3 z-50">
        <ThemeToggle />
      </div>
      <h5 className="mb-4 text-2xl font-bold">🌍 World Clock App</h5>
      <ClockDashboard />
    </div>
  );
}
