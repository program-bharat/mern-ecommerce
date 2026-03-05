# MERN E-Commerce Project

---

# Tech Stack

* **MongoDB** – Database
* **Express.js** – Backend Framework
* **React.js** – Frontend Library
* **Node.js** – Runtime Environment

---

# Project Setup

Follow these steps to run the project locally.

# 1. Clone the Repository

```bash
git clone <repository_url>
cd <project_folder>
```

# 2. Install Backend Dependencies

```bash
cd backend
npm install
```

# 3. Create Environment Variables

The `.env` file is **not included in GitHub for security reasons**.
Inside the **backend folder**, create a new file:

```
.env
```

Copy the contents from `.env.example` and replace with your values.

Example:

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/mern-ecommerce
JWT_SECRET=your_secret_key
```

# 4. Uploads Folder (Images)

Product images are stored inside an **uploads folder**.
This folder is **not pushed to GitHub** because it may contain large files.
However, the server **automatically creates the folder if it does not exist**, so no manual setup is required.

When images are uploaded:

* Image files are stored in `/backend/uploads`
* Image path reference is stored in **MongoDB**

# 5. Run Backend Server

```bash
npm start
```

# 6. Install Frontend Dependencies

Open a new terminal.

```bash
cd frontend
npm install
```

# 7. Run Frontend

```bash
npm run dev
```

---

# Future Improvements

* Stripe payment integration
* Product reviews
* Order tracking