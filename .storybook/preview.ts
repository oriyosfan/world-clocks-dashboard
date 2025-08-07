import type { Preview } from '@storybook/nextjs-vite';
import '../src/app/globals.css';
import 'antd/dist/reset.css';

import { StorybookWrapper } from '../src/components/providers/DesignSystemThemeProvider';

const preview: Preview = {
  decorators: [StorybookWrapper],
  parameters: {
    controls: {
      expanded: true,
      matchers: { color: /(background|color)$/i, date: /Date$/i },
    },
    a11y: {
      test: 'todo',
    },
  },
};

export default preview;
