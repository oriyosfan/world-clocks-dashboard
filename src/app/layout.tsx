import { AntdRegistry } from '@ant-design/nextjs-registry';
import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';

import '@/app/globals.css';
import { DesignSystemThemeProvider } from '@/components/providers/DesignSystemThemeProvider';

export const metadata: Metadata = { title: 'Neon World Clocks' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AntdRegistry>
            <DesignSystemThemeProvider>{children}</DesignSystemThemeProvider>
          </AntdRegistry>
        </ThemeProvider>
      </body>
    </html>
  );
}
