export const base = '';

export const routes = {
  home: base,
  contacts: base + '/contacts',
  projects: base + '/projects',
  experience: base + '/experience',
} as const;