import type { NextConfig } from 'next';
import { normalizeBasePath } from './src/config/base-path';

const nextConfig: NextConfig = {
  basePath: normalizeBasePath(process.env.DOTGRAVITY_BASE_PATH),
};

export default nextConfig;
