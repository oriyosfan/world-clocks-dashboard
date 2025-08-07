'use client';

import { Button } from '@/components/ui';
import { ThemeToggle } from '@/features/theme-toggle';
export default function Home() {
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-sans sm:p-20">
      <div className="fixed top-3 left-3 z-50">
        <ThemeToggle />
      </div>
      <h1>Hello World</h1>
      <Button>Click me</Button>
    </div>
  );
}
