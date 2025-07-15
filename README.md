# NASA CodeBrew

A full-stack web application built using modern web technologies to interface with NASA APIs and present data in an interactive format.

✅ `.env` is automatically generated when you run the setup script.

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/your-repo.git
cd your-repo
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

> The `.env` file will be auto-created on first run via a setup script. You'll be prompted to enter API keys and other config values.

---
### 4. Project Information

- **React**
- **TypeScript**
- **Vite**
- **React Router**
- **Context API** (for state management)

---

## 📂 Project Structure

```bash
src/
├── .bin/               # Assets and binaries (e.g., screenshots, extra docs)
├── .scripts/           # Automatically generates a .env file by prompting the user for required environment variables. Skips creation if one already exists.
├── backend/            # Backend code (NodeJS + Express)
├── frontend/           # Frontend code (React + Vite)
├── react-router.config.ts
├── vite.config.ts
└── ...
```

---

## 🧪 Testing

No Testing implemented
<!-- ```bash
npm run test
``` -->

---

<!-- ## 🐳 Docker

Build and run using Docker:

```bash
docker build -t nasa-app .
docker run -p 3000:3000 nasa-app
```

--- -->

## 📜 License

MIT
