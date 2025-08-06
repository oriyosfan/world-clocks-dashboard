'use client';

import type { PropsWithChildren } from 'react';
import { useEffect, useState } from 'react';

export function ClientOnly({ children }: PropsWithChildren) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }
  return children;
}
