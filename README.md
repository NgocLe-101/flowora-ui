# Flowora UI
Frontend application for Flowora built with Vite + React + TypeScript.
Quick start
1. Install dependencies
```bash
cd flowora-ui
npm install
```
2. Configure API base URL (optional)
Create a `.env` file in `flowora-ui/` with the following (example):
```bash
  VITE_API_URL=http://localhost:3000
```
The UI will use this environment variable to contact the API during development and production builds.
3. Run dev server
```bash
  npm run dev
```
The dev server typically runs on http://localhost:5173

Build and preview
```bash
  npm run build
  npm run preview
```
Notes
- Check `vite.config.ts` and `src/lib` for how the app reads `VITE_API_URL`.
- If you need to change the dev port, modify the Vite config or pass `--port` when running the dev script.

If you'd like, I can add a small example `.env.example` and a few sample curl commands that demonstrate the UI <> API interactions.
// Other configs...
