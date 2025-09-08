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

Prints:

<img width="892" height="766" alt="table" src="https://github.com/user-attachments/assets/8629d6ef-4979-4008-aca0-2ed5f8ed8472" />
<img width="1017" height="529" alt="filters" src="https://github.com/user-attachments/assets/5c499228-31f9-461e-b8e2-f72dd3fc5a6b" />
<img width="924" height="787" alt="add truck" src="https://github.com/user-attachments/assets/e3ef5d9f-7015-4b27-9f79-ae7eeda9e34e" />
<img width="911" height="761" alt="edit truck" src="https://github.com/user-attachments/assets/bd513c5f-2e09-4f71-a33d-b7e11a964737" />
<img width="1552" height="695" alt="audit" src="https://github.com/user-attachments/assets/1ecfd4ca-a6c2-4c32-8d74-cb6ead964a74" />
<img width="967" height="609" alt="delete truck" src="https://github.com/user-attachments/assets/8b184920-7100-4f84-b3fa-b0e8a66eb94c" />
