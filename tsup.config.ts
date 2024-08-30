import {defineConfig} from 'tsup';

export default defineConfig({
    entry: ['./src/**/*.tsx'],
    format: ['cjs', 'esm'],
    dts: true,
    sourcemap: true,
    splitting: true,
    clean: true,
    outDir: 'dist',
    external: ['react', 'react-dom'],
    minify: true,
    jsxFactory: 'react',
})