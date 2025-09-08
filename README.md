🚛 Volvo Trucks Management - Frontend
This is the frontend application for the Volvo Trucks Management project. It provides a clean, responsive, and dynamic interface to manage trucks through a corresponding .NET Web API.

🖼 Screenshot
Replace screenshot.png with your actual screenshot file in the repo.

🛠 Tech Stack
Framework: Next.js
Language: TypeScript
UI Library: React
Styling: Tailwind CSS
UI Components: shadcn/ui
Server State Management: TanStack Query
Data Tables: TanStack Table
Forms & Validation: React Hook Form & Zod

🚀 Getting Started
Prerequisites
Node.js (v20.x or later)

Backend API must be running.

1️⃣ Clone the Repository
git clone [volvo-trucks-ui](https://github.com/matheuscapraro-dev/volvo-trucks-ui.git)
cd volvo-trucks-ui

2️⃣ Install Dependencies
npm install

3️⃣ Set Up Environment Variables
Create a .env.local file in the project root:
NEXT_PUBLIC_API_URL=http://localhost:5014

4️⃣ Run the Development Server
npm run dev

The application will be available at http://localhost:3000.

⚡ Features
Full CRUD operations on trucks
Dynamic tables with sorting, filtering, and selection
Audit logs for tracking truck changes
Responsive sidebar navigation
Error handling with user-friendly Sonner toasts

📂 Project Structure
src/
├─ app/ # Pages and layout
├─ components/ # Reusable UI components
├─ hooks/ # Custom React hooks
├─ lib/ # Utilities
├─ services/ # API service functions
├─ types/ # TypeScript types

📌 Notes
Ensure the backend API is running before starting the frontend.
All API errors are displayed via Sonner toasts.
API Repo - [volvo-trucks-api](https://github.com/matheuscapraro-dev/volvo-trucks-api.git)
