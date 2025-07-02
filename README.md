1. Run npm i
2. Run npm start

## 🚀 Production build & performance

| Optimization Method | Implementation                          | Details                           |
|---------------------|-----------------------------------------|-----------------------------------|
| Bundle analysis     | `rollup-plugin-visualizer` plugin       | Run `npm run build` to view the analysis |
| Code splitting      | Dynamic imports with `React.lazy`, manual chunks | Modals, Forms, Audioplayer        |
| Tree shaking        | Rollup option `treeshake: 'smallest'`   | More optimized bundling without unnecessary code |
| Source maps         | Vite build option  `sourcemap: 'hidden'`| Source map files for debugging without comments in the bundled files |
| Env variables       | Environment variables via `.env` file   | `import.meta.env` to get variables with `VITE_` prefix |
