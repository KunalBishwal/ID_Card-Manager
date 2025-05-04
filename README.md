# IDForge

**IDForge** is a Next.js + Firebase web app for creating, managing, and downloading professional student ID cards in the standard Indian college format.

## Features

- **Create ID Cards**  
  Fill in student details, select a color scheme, upload a photo, and generate a preview.
- **Manage Cards**  
  View all generated cards in a searchable table, edit existing cards, or delete them.
- **Download**  
  Export any ID card as a high-resolution PNG image (with html2canvas).
- **Firebase Firestore**  
  All cards are stored in Firestore, allowing real–time reads/writes.

## Tech Stack

- **Next.js 14** (App Router, Server + Client components)  
- **TypeScript**  
- **Tailwind CSS** for styling  
- **Framer Motion** for subtle animations  
- **Firebase Firestore** for persistent storage  
- **html2canvas** for in-browser PNG export  

## Getting Started

### 1. Clone the repo

```bash
git clone <https://github.com/KunalBishwal/ID_Card-Manager>
2. Install dependencies

npm install
# or
yarn
3. Firebase Setup
Create a Firebase project at console.firebase.google.com.

Enable Firestore (in test / unlocked mode, or set rules to allow read, write: if true;).

In your project settings, grab the Firebase config and add to .env.local:

NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id

4. Run Locally

npm run dev
# or
yarn dev
Open http://localhost:3000 in your browser. You can now create, edit, delete, and download student ID cards.

Project Structure

.
├── app/                 # Next.js App Router pages
│   ├── create/          # Page to create new ID
│   ├── edit/[id]/       # Page to edit existing ID
│   └── manage/          # Page to list & manage IDs
├── components/          # Reusable React components (CardForm, IDCard, UI wrappers)
├── lib/
│   ├── storage.ts       # Firestore CRUD helpers
│   ├── download.ts      # html2canvas download logic
│   └── types.ts         # TypeScript types
├── public/
├── styles/              # Global CSS / Tailwind config
├── .env.local           # Firebase credentials
└── README.md            # This file
Scripts
npm run dev — start local dev server

npm run build — build for production

npm run start — run the production build


---

## Git Commands

1. **Initialize a new repository**  
   ```bash
   git init
Stage all files, make initial commit


git add .
git commit -m "Initial commit: IDForge Next.js + Firebase student ID generator"
(Optional) Rename default branch to main

git branch -M main
Add remote and push


git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
