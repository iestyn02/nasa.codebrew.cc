# BACKEND

This directory contains configuration and backend support (Backend For Frontend) for the NASA project.

---

## 🗂 Directory Structure

    backend/
    ├── app.js                   # Main app logic
    ├── server.js                # Server entry point
    ├── constants/               # Static config and constants
    │   └── index.js
    ├── middleware/              # Express middleware (e.g., caching)
    │   ├── cache.js
    │   └── index.js
    ├── routes/                  # Route handlers
    │   ├── index.js
    │   ├── apod.js              # Astronomy Picture of the Day
    │   ├── snapshot.js          # Earth & Sky imagery snapshot based on date & coordinates
    │   └── archive.js           # Archive endpoint for image and video retrieval
    └── README.md                # This file

## 🛠 Tech Stack

- **Node.js**
- **Express.js**

## 🚀 Setup

The project is likely configured to serve both frontend and backend from a single server or a Vite dev server.

To run:

```bash
npm install
npm run gen:env
npm run dev:be
```

## ✨ Notes

- No dedicated Express.js or REST API logic is currently present.
- Backend functionality may be embedded in the frontend or powered by an external API (e.g. NASA APIs).
