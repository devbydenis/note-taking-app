# 📒 Note Taking App

A simple **note-taking web application** built with **Next.js 15, Tailwind CSS 4, PostgreSQL, and Prisma ORM**.  
Users can create personal notes, share them with other users, publish notes publicly, and comment on notes.


## 🚀 Tech Stack
- **Frontend & Backend**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) (via Docker)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Auth**: JWT
- **State Management**: [TanStack Query](https://tanstack.com/query/latest) (data fetching + caching)  
- **Linting & Formatting**: ESLint + Prettier
- **Containerization (opsional)**: Docker (untuk database & service dev)


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
git clone https://github.com/devbydenis/note-taking-app.git
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


## ✅ Features
- User Authentication (Register, Login, Logout)
- Create personal notes
- Share notes with other users
- Publish notes to public
- Comment on notes


## 🔗 Entity Relationship Diagram (ERD)

```mermaid
erDiagram
    users {
        INT id PK
        STRING username
        STRING email
        TEXT password_hash
        DATETIME created_at
        DATETIME updated_at
    }

    notes {
        INT id PK
        INT user_id FK
        STRING title
        TEXT content
        BOOLEAN is_public
        DATETIME created_at
        DATETIME updated_at
    }

    note_shares {
        INT id PK
        INT note_id FK
        INT shared_with_user_id FK
        DATETIME created_at
    }

    comments {
        INT id PK
        INT note_id FK
        INT user_id FK
        TEXT content
        DATETIME created_at
    }

    %% Relations
    users ||--o{ notes : "has"
    users ||--o{ note_shares : "can_receive"
    notes ||--o{ note_shares : "shared_with"
    users ||--o{ comments : "writes"
    notes ||--o{ comments : "has"
    
```

## ⛓️ FLOWCHART
```mermaid
flowchart TD
    START([Mulai]) --> A[Login/Register]
    A --> B{Punya akun?}
    B -- No --> C[Form Register] --> D[POST /register -> simpan ke tabel users] --> A
    B -- Yes --> E[Form Login] --> F[POST /login -> validasi + buat session] --> G[Dashboard]

    G --> H[GET /notes?owner=me -> list notes]
    G --> I[Create Note]
    I --> J[Isi title, content, is_public]
    J --> K[POST /notes -> simpan ke notes] --> G

    H --> L[Click Note Detail]
    L --> M[GET /notes/:id]
    M --> N{Punya akses?}
    N -- is_public = true --> O[Tampilkan note + komentar]
    N -- Owner --> O
    N -- Ada di note_shares --> O
    N -- Else --> P[No Access]

    O --> Q[Form Tambah Komentar]
    Q --> R[POST /notes/:id/comments -> simpan ke comments] --> O

    O --> S[Share Note]
    S --> T[Masukkan email user]
    T --> U[POST /notes/:id/share -> insert ke note_shares] --> O

    G --> V[Logout]
    V --> W[Hapus session -> redirect ke Login]
    W --> END([Selesai])

```
