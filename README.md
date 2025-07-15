# Frontend

This is the React + Vite frontend for the NASA CodeBrew project.

---

## 🛠 Tech Stack

- **React**
- **TypeScript**
- **Vite**
- **React Router**
- **Context API** (for state management)

---

## 📁 Key Folders

```bash
app/
├── root.tsx           # Root layout and app container
├── routes.ts          # React Router route definitions
├── constants.ts       # App-wide constants
├── styles/            # CSS files (global, icons, overrides)
└── state/             
    ├── context.tsx    # React context for global state
    └── reducer.tsx    # Reducer logic
```

---

## 🧪 Running Locally

```bash
npm install
npm run dev
```

This runs the app on `localhost:5173` (default Vite port).

---

## ✨ Notes

- Uses modular CSS for styling
- Designed to be extended with additional NASA APIs easily
