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
