import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { startProdServer } from '../runtime/vinext/dist/server/prod-server.js';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const port = Number.parseInt(process.env.PORT ?? '4181', 10);
const host = process.env.HOST ?? '127.0.0.1';

if (!Number.isInteger(port) || port < 1 || port > 65_535) {
  throw new Error(`Invalid PORT value: ${process.env.PORT ?? '<empty>'}`);
}

await startProdServer({
  host,
  outDir: resolve(projectRoot, 'dist'),
  port,
});
