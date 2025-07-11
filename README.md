
# 📸 SnapSpot

SnapSpot is a modern photographer discovery platform built with **Next.js** and **Tailwind CSS**, allowing users to search, filter, and view professional photographer profiles with ease.

---

## 🚀 Features

- 🔍 **Search by name, city, or tags**
- 🧠 **Smart Suggestions** for top-rated photographers
- 🧰 **Filter by price, rating, style, and city**
- 📦 **Sort options** (by rating, price, or recent)
- 🖼️ Individual **photographer portfolio** pages
- 📨 Inquiry form with submission feedback
- 💬 **Responsive UI** optimized for mobile & desktop

---
## 🛠️ Technologies Used

| Tech          | Description                  |
|---------------|------------------------------|
| **Next.js**   | React framework for SSR & SSG |
| **Tailwind CSS** | Utility-first CSS framework |
| **Axios**     | For API requests              |
| **JSON Server** | Mock REST API for data       |

---

## 🗂️ Project Structure

```bash
📁 SnapSpot/
├── public/
├── src/
│ ├── components/
│ ├── hooks/
│ ├── pages/
│ ├── styles/
├── server.js
└── package.json
```

## 🧑‍💻 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/rajashreedebnath/SnapSpot.git
cd SnapSpot
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start JSON Server:

```bash
npx json-server --watch db.json --port 3001
```
### 4. Set Environment Variable:
Create a .env.local file:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 5. Start the Next.js App:

```bash
npm run dev
```
Open your browser 👉 http://localhost:3000 , http://localhost:3001/photographers 
--- 