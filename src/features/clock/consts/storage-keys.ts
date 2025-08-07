/**
 * LocalStorage keys used throughout the application
 * This ensures consistency and prevents typos
 */

export const STORAGE_KEYS = {
  SELECTED_CLOCKS: 'world-clocks-selected-clocks',
  USER_PREFERENCES: 'world-clocks-user-preferences',
  THEME_SETTINGS: 'world-clocks-theme-settings',
} satisfies Record<string, string>;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];
