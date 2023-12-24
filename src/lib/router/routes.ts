export const base = '/johncuba';

export const routes = {
  home: base,
  contacts: base + '/contacts',
  projects: base + '/projects',
  experience: base + '/experience',
} as const;