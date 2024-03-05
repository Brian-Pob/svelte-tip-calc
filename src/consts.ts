import { dev } from '$app/environment';

export const URL = dev
  ? 'http://localhost:5173' : 'https://svelte-tip-calc.vercel.app'