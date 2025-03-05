**QualityVeda Attendance Management System**

📌 Introduction

The QualityVeda Attendance Management System is a web-based platform designed for seamless attendance tracking for employees as well  medical training programs. It allows users to mark attendance, view attendance history, and manage training sessions, while administrators have full control over attendance records, user management, and data export.

🚀 Features

✅ User Features

Google Sign-In for authentication.

Mark Attendance (Once per training per day).

View Attendance History.

Lab Selection with warnings before changing.

Email Confirmation upon attendance submission.

✅ Admin Features

Admin Dashboard for managing users & attendance.

Export Attendance Records (Lab-wise, Date-wise, User-wise) to CSV.

Modify Trainings & Labs dynamically.

View Attendance Statistics.

🎯 Tech Stack

TECHNOLOGY                  PURPOSE

React.js                    Frontend Development
Tailwind CSS                UI Styling
Node.js + Express.js        Backend Development  
POstgreSQL (Neon)           Database Management
Vercel                      Deployment
Brevo SMTP                  Email Notifications

🛠️ Installation & Setup

1️⃣ Clone the Repository

git clone https://github.com/YOUR_GITHUB_USERNAME/qualityveda-attendance.git
cd qualityveda-attendance

2️⃣ Backend Setup

cd backend
npm install
cp .env.example .env  # Fill in environment variables
node server.js  # Start the backend

3️⃣ Frontend Setup

cd ../frontend
npm install
npm run dev  # Start the frontend

4️⃣ Environment Variables (.env)

Create a .env file in both backend/ and frontend/ directories with:

Backend .env

PORT=5000
DATABASE_URL=your_neon_postgres_url
VITE_BREVO_SMTP_HOST=smtp-relay.brevo.com
VITE_BREVO_SMTP_PORT=587
VITE_BREVO_SMTP_USER=your_smtp_user
VITE_BREVO_SMTP_PASS=your_smtp_password
VITE_BREVO_SENDER_EMAIL=your_verified_email

Frontend .env

VITE_API_BASE_URL=https://your-backend.vercel.app

🚀 Deployment

1️⃣ Deploy Backend on Vercel

cd backend
vercel --prod

2️⃣ Deploy Frontend on Vercel

cd ../frontend
vercel --prod

🔗 API Endpoints

Method

Endpoint

Description

POST

/api/mark-attendance

Mark attendance

GET

/api/attendance

Get attendance records

POST

/send-email

Send OTP verification email

👨‍💻 Contributing

Fork the repo & create a new branch (git checkout -b feature-branch).

Make your changes & commit (git commit -m "Added new feature").

Push to your fork (git push origin feature-branch).

Submit a Pull Request 🚀

📜 License

This project is open-source and available under the MIT License.

🤝 Contact

For any issues or feature requests, feel free to open an issue or contact Akutagawaaa.
