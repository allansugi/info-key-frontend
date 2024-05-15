# info-key-frontend
frontend of password manager

checkout the backend server [here](https://github.com/allansugi/info-key)

## Instructions
to change port, edit `vite-project/vite.config.ts`
```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // change here for port that you want
  },
})
```

to run the frontend, change directory to `vite-project` then run
```bash
npm run dev
```


