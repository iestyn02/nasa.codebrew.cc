# NASA CodeBrew

A full-stack web application built with React and Express that connects users to real-time NASA data. Explore the universe through high-resolution images from the Astronomy Picture of the Day (APOD), browse Mars rover photos, and dive into space-related content—all powered by NASA's public APIs. Fast, responsive, and designed for space lovers.

<!-- ✅ `.env` is automatically generated when you run the setup script. -->

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

<!-- --- -->
<br><br>

## 🛠️ Tech Stack

- **React**
- **TypeScript**
- **Vite**
- **React Router**
- **NodeJS**
- **Express**

<!-- --- -->
<br><br>

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

<!-- --- -->
<br><br>

## 🧪 Testing

No Testing implemented
<!-- ```bash
npm run test
``` -->

<!-- --- -->

<!-- ## 🐳 Docker

Build and run using Docker:

```bash
docker build -t nasa-app .
docker run -p 3000:3000 nasa-app
```

--- -->
<br><br>

## 📜 License

MIT
