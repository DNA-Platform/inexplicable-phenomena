import { defineConfig, mergeConfig } from 'vitest/config';
import { configuration } from './vite.config';

export default mergeConfig(configuration({ isPreview: false }), defineConfig({
    test: {
        include: ['specification/**/*.test.ts'],
        environment: 'node',
        isolate: false,
        fileParallelism: false,
    },
}));
