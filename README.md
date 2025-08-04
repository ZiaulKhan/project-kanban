# Kanban Project \& Task Management Tool 🧩

A full-stack Kanban-style tool that allows users to manage projects, and organize tasks using drag-and-drop functionality.

## 🚀 Features

* ✅ User authentication (register/login/logout)
* 🧑‍🤝‍🧑 Team and Project management
* 🗂️ Create, edit, delete tasks with `TODO`, `IN PROGRESS`, and `DONE` statuses
* 🪄 Drag-and-drop task reordering (Kanban)
* 📊 Dashboard with project summaries
* 🔐 Protected routes and user-specific data

---

## 🛠️ Tech Stack

### Frontend

* **React**
* **Context API** for state management
* **React Router DOM** for routing
* **React Hook Form + Zod** for form validation
* **Tailwind CSS** for styling
* **hello-pangea/dnd** for Kanban drag and drop
* **Lucide React** for icons
* **React Hot Toast** for notifications

### Backend

* **Node.js + Express**
* **MongoDB + Mongoose**
* **Zod** for request validation
* **JWT** for user auth
* **CORS**, **dotenv** for backend config

---

## 📦 Installation

### 1\. Clone the Repository

```bash
git clone https://github.com/ZiaulKhan/project-kanban.git
cd project-kanban

2. Setup Backend
cd server
npm install
cp .env.example .env
# Update .env with your MongoDB URI and JWT\_SECRET
npm run dev


3. Setup Frontend
cd ../client
npm install
npm run dev





