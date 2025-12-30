# BeyondChats – Full Stack Assignment

This repository contains a **full-stack web application** developed as part of the **BeyondChats Full Stack Web Developer Intern assignment**.

The project demonstrates:
- Web scraping
- RESTful APIs
- Google search integration
- AI-based article rewriting
- Full-stack integration with a modern React frontend

---

## 🏗️ Project Structure

beyondchats/
├── beyondchats-backend/ # Spring Boot backend
├── beyondchats-frontend/ # React frontend
└── README.md



---

## ⚙️ Backend Setup (Spring Boot)

### 🔧 Prerequisites
- Java 17 or higher
- Maven
- MySQL
- Internet connection (for scraping & AI)

---

### 🗄️ Database Setup (MySQL)

1. Open MySQL Workbench or MySQL CLI
2. Create database:

```sql
CREATE DATABASE beyondchats;
🔐 Environment Configuration (IMPORTANT)
⚠️ API keys and passwords are NOT committed for security reasons.

Create environment variables on your system:

Required Environment Variables
Variable Name	Description
DB_PASSWORD	MySQL database password
SERPAPI_KEY	Google search API key (SerpAPI)
LLM_API_KEY	OpenAI / LLM API key

📄 application.properties
Location:


beyondchats-backend/src/main/resources/application.properties
properties
spring.datasource.url=jdbc:mysql://localhost:3306/beyondchats
spring.datasource.username=root
spring.datasource.password=${DB_PASSWORD}

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

serpapi.key=${SERPAPI_KEY}
llm.api.key=${LLM_API_KEY}
▶️ Run Backend

cd beyondchats-backend
mvn spring-boot:run
Backend will start at:

http://localhost:8080

🔗 Backend API Endpoints
Method	Endpoint	Description
GET	/api/articles	Fetch all articles
GET	/api/articles?version=original	Fetch original articles
GET	/api/articles?version=updated	Fetch AI-updated articles
GET	/api/articles/scrape	Scrape BeyondChats blogs
GET	/api/articles/phase2/start	Run Google search + AI rewrite

🎨 Frontend Setup (React + Vite)
🔧 Prerequisites
Node.js 18+

▶️ Install Dependencies

cd beyondchats-frontend
npm install
▶️ Run Frontend

npm run dev
Frontend will start at:


http://localhost:5173
🔄 Application Flow / Architecture

BeyondChats Blogs
   ↓ (Scraping)
Spring Boot Backend
   ↓ (Google Search via SerpAPI)
External Articles
   ↓ (Content Scraping)
LLM (AI Rewriting)
   ↓
MySQL Database
   ↓
React Frontend
🤖 AI Rewriting Logic
Original articles are fetched from the database

Google search finds top-ranking external articles

External content is scraped

AI rewrites the article using reference content

Updated articles are stored with:

version = "updated"

Reference links cited at the bottom

Blocked or low-quality sources are gracefully skipped.

🌐 Live Demo
Frontend: (to be added if deployed)

Backend: (to be added if deployed)

✅ Assignment Completion Status
✔ Phase 1: Web scraping + CRUD APIs
✔ Phase 2: Google search + AI rewriting + publishing
✔ Phase 3: React frontend integration

👤 Author
Dinesh
Full Stack Developer Intern Applicant – BeyondChats
