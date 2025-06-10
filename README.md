### 🧩 Repository: `frontend`

#### 📦 Description
React + TypeScript frontend app using Vite.

#### 🛠️ Run with Docker
```bash
git clone https://github.com/nirmalskandan/frontend.git
cd frontend
docker build -t frontend-app .
docker run -p 3000:3000 frontend-app
```

#### 🚀 Run Locally (Without Docker)
```bash
git clone https://github.com/nirmalskandan/frontend.git
cd frontend
npm install
npm run dev
```
Visit: http://localhost:3000


#Local Setup COmplete Guide 
## 🎨 Frontend Setup (React + Vite)

### ✅ Check Node.js Compatibility

Node.js v16.13.1 is confirmed to be compatible with Vite. Verify with:

```bash
node -v
```

### ✅ Install Frontend Dependencies

```bash
cd frontend
npm install
```

### ✅ Update Vite Configuration (`vite.config.ts`)

Ensure your `vite.config.ts` includes:

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
  },
  define: {
    global: 'globalThis',
  },
  resolve: {
    alias: {
      crypto: 'crypto-browserify',
    },
  },
});
```

Install the required polyfill:

```bash
npm install crypto-browserify --save
```

### ✅ Confirm Backend Fetch Path

In your `App.tsx` or related component:

```tsx
useEffect(() => {
  fetch("http://localhost:8000/mongo-test")
    .then((res) => res.json())
    .then((data) => setMessage(JSON.stringify(data, null, 2)))
    .catch((err) => setMessage("Error connecting to backend"));
}, []);
```

### ✅ Run Frontend Locally

```bash
npm run dev
```

Visit: [http://localhost:3000/mongo-test](http://localhost:3000/mongo-test)

> Ensure CORS is allowed in FastAPI if you're calling from a different port.
