# Kanban Project \& Task Collaboration Tool 🧩

A full-stack Kanban-style real-time collaboration tool that allows users to create teams, manage projects, and organize tasks using drag-and-drop functionality.

## 🚀 Features

* ✅ User authentication (register/login/logout)
* 🧑‍🤝‍🧑 Team and Project management
* 🗂️ Create, edit, delete tasks with `TODO`, `IN PROGRESS`, and `DONE` statuses
* 🪄 Drag-and-drop task reordering (Kanban)
* 🔎 Search and filter tasks by status or project
* 📅 Calendar view with Event and Reminder support
* 📊 Dashboard with project summaries
* 🔐 Protected routes and user-specific data
* 💬 Real-time UI using internal state (optional Socket.IO support in roadmap)

---

## 🛠️ Tech Stack

### Frontend

* **React** (w/ Vite)
* **Redux Toolkit** for state management
* **React Router DOM** for routing
* **React Hook Form + Zod** for form validation
* **Tailwind CSS** for styling
* **React Beautiful DnD** for Kanban drag and drop
* **Lucide React** for icons
* **React Hot Toast** for notifications

### Backend

* **Node.js + Express**
* **MongoDB + Mongoose**
* **Zod** for request validation
* **JWT** for user auth
* **CORS**, **dotenv**, and **Morgan** for backend config and logging

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





