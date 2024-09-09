import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/**/*.tsx"],
    format: ["cjs", "esm"],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: true,
    external: ['react', 'react-dom'],
    injectStyle: true,
    loader: {
        '.png': 'dataurl'
    }
})