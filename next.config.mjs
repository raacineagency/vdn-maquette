process.env.__NEXT_SHOW_IGNORE_LISTED = 'true';

console.log('[CONFIG-DEBUG] NEXT_ADAPTER_PATH:', process.env.NEXT_ADAPTER_PATH);
console.log('[CONFIG-DEBUG] Vercel-related env vars:', Object.keys(process.env).filter(k => k.includes('VERCEL') || k.includes('NEXT') || k.includes('ADAPTER')));

/** @type {import('next').NextConfig} */
const config = {
  distDir: '.next',
  /* config options here */
};

const nextConfig = new Proxy(config, {
  get(target, prop, receiver) {
    console.log(`[CONFIG-DEBUG] Property accessed: ${String(prop)} = ${target[prop]}`);
    return Reflect.get(target, prop, receiver);
  }
});

export default nextConfig;

