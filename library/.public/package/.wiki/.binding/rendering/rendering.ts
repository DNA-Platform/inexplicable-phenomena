import { spawnSync } from 'node:child_process';
import { join } from 'node:path';

export const rendering = (binding: string): string[] => {
    const entry = join(binding, 'rendering', 'render.mjs');
    const ran = spawnSync(process.execPath, [entry], {
        cwd: binding,
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'inherit'],
        env: { ...process.env, NODE_ENV: 'development' },
    });
    if (ran.status !== 0) throw new Error(`rendering failed (exit ${ran.status ?? 'signal'})`);
    const last = ran.stdout.trim().split('\n').at(-1) ?? '[]';
    return JSON.parse(last) as string[];
};
