# 📒 Note Taking App

A simple **note-taking web application** built with **Next.js 15, Tailwind CSS 4, PostgreSQL, and Prisma ORM**.  
Users can create personal notes, share them with other users, publish notes publicly, and comment on notes.


## 🚀 Tech Stack
- **Frontend & Backend**: [Next.js 15](https://nextjs.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) (via Docker)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Auth**: NextAuth.js / JWT (TBD)
- **Linting & Formatting**: ESLint + Prettier


## 📂 Project Structure
```bash
note-taking-app/
├── src/
│   ├── app/           # Next.js App Router pages & API routes
│   ├── components/    # Reusable UI components
│   ├── lib/           # Utility & helpers (db, auth, etc.)
│   └── styles/        # Global styles
├── prisma/
│   └── schema.prisma  # Prisma schema for DB
├── docker-compose.yml # Docker config for PostgreSQL
├── .env               # Environment variables
├── eslint.config.mjs  # ESLint config
├── tailwind.config.js # Tailwind config
├── package.json
└── README.md
```

## 🛠️ Setup & Installation
### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/note-taking-app.git
cd note-taking-app
```
### 2. Install dependencies
```bash
npm install
```
### 3. Run PostgreSQL with Docker
```bash
docker compose up -d
```
### 4. Setup Environment Variables
#### Create file .env:
```.env
DATABASE_URL="postgresql://noteuser:notepass@localhost:5432/notedb"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```
### 5. Setup Prisma
```bash
npx prisma generate
npx prisma migrate dev --name init
```
### 6. Run Development Server
```bash
npm run dev
```

App would be run in http://localhost:3000.