# NASA CodeBrew

A full-stack web application built with React and Express that connects users to real-time NASA data. Explore the universe through high-resolution images from the Astronomy Picture of the Day (APOD), browse Mars rover photos, and dive into space-related content—all powered by NASA's public APIs. Fast, responsive, and designed for space lovers.

<!-- ✅ `.env` is automatically generated when you run the setup script. -->

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/iestyn02/nasa.codebrew.cc.git
cd nasa.codebrew.cc
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Servers

```bash
npm run start
```

> This command starts both the frontend and backend servers in parallel, allowing them to run simultaneously during development.

> The `.env` file will be auto-created on first run via a setup script. You'll be prompted to enter API keys and other config values.

<!-- --- -->
<br></br>

## ⚙️ Environment Variables (`.env`)

The application uses a `.env` file to manage environment-specific settings like ports and API keys. This file is automatically created for you on first run via a setup script.

### 🔑 Required Variables

| Variable              | Description                                         | Default                                      |
|-----------------------|-----------------------------------------------------|----------------------------------------------|
| `PORT`                | Port on which the server will run                   | `3000`                                       |
| `NASA_API_KEY`        | Your NASA API key *(or use `DEMO_KEY`)*             | `DEMO_KEY`                                   |
| `VITE_GEO_APIFY_KEY`  | API key for GeoApify geolocation service            | `16b327cb8cd64ca19a688553da6a6630`           |
| `VITE_API_URL`        | Base URL for backend API                            | `http://localhost:3000/`              |

> If the `.env` file is missing, a setup script will prompt you to enter these values and generate it automatically.



<br></br>
## 🛠️ Tech Stack

- **React**
- **TypeScript**
- **Vite**
- **React Router**
- **NodeJS**
- **Express**

<!-- --- -->
<br></br>

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
<br></br>

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
<br></br>

## 📜 License

MIT
