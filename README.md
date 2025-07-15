# 🚀 NASA Data Explorer

Explore the wonders of space with NASA's Open APIs! This full-stack web application allows users to browse and interact with real NASA data, including the Astronomy Picture of the Day (APOD).

## 🛠️ Tech Stack

- **Frontend**: React (Create React App), Axios, React Router
- **Backend**: Node.js, Express, Axios
- **APIs**: [NASA Open APIs](https://api.nasa.gov/)

---

## 📁 Project Structure

```
nasa-data-explorer/
├── backend/
│   ├── routes/
│   │   └── apod.js
│   ├── .env
│   ├── app.js
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Apod.js
│   │   │   └── Home.js
│   │   ├── App.js
│   │   └── .env
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/nasa-data-explorer.git
cd nasa-data-explorer
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file inside `/backend` and add:
```
NASA_API_KEY=your_nasa_api_key
```

Run the backend:
```bash
node server.js
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

Create a `.env` file inside `/frontend` and add:
```
REACT_APP_API_URL=http://localhost:5000/api
```

Run the frontend:
```bash
npm start
```

---

## 🌌 Features

- View NASA's Astronomy Picture of the Day
- Simple routing and modular structure
- Backend proxy to hide NASA API key
- Loading state management and error handling

---

## 🚀 Deployment

You can deploy:

- Frontend to [Vercel](https://vercel.com/)
- Backend to [Render](https://render.com/) or [Railway](https://railway.app/)

Make sure to set the environment variables on your hosting platforms!

---

## 🙌 Contribution

Pull requests and ideas are welcome! Open an issue or submit a PR.

---

## 📜 License

MIT