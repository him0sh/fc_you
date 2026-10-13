import type { Config } from 'tailwindcss';
const config: Config = { content: ['./app/**/*.{js,ts,jsx,tsx,mdx}','./components/**/*.{js,ts,jsx,tsx,mdx}'], theme: { extend: { colors: { ink:'#07111d', panel:'#0d1b2a', blue:'#39a9ff', mint:'#70f0c1' }, boxShadow:{ glow:'0 0 35px rgba(57,169,255,.12)' } } }, plugins: [] };
export default config;
