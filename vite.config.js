import { defineConfig } from "vite";
import htmlPurge from 'vite-plugin-purgecss';
import path, { extname, resolve } from 'node:path';
import * as glob from 'glob';
import { ViteMinifyPlugin } from 'vite-plugin-minify';

const getInput = () => {
    return Object.fromEntries(
        [
            ...glob.sync(
                './**/*.html',
                {
                    ignore: [
                        './dist/**',
                        './node_modules/**'
                    ]
                }
            ).map(
                file => [
                    file.slice(0, file.length - path, extname(file).length),
                    resolve(__dirname, file)
                ]
            )
        ]
    );
}

export default defineConfig(
    {
        appType: 'mpa',
        base: process.env.DEPLOY_BASE_URL,
        build: {
            rollupOptions: {
                input: getInput()
            },
            minify: true
        },
        plugins: [
            htmlPurge({}),
            ViteMinifyPlugin(),
        ]
    }
);