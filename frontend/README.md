# Credit Risk Frontend

A professional Next.js frontend for credit risk assessment dashboard.

## Features

- Clean fintech UI inspired by Stripe dashboard
- Loan application form with validation
- Real-time credit score calculation
- Risk level visualization (Low/Medium/High)
- Probability display
- Key factors explanation
- Responsive design with Tailwind CSS
- Smooth animations and transitions

## Setup

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Backend Integration

Make sure the FastAPI backend is running at `http://127.0.0.1:8000`

## Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── LoanForm.tsx
│   │   └── ResultsDashboard.tsx
│   └── services/
│       └── api.ts
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── next.config.js
└── tsconfig.json
```

## Technologies Used

- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- React Hooks
- Fetch API for backend communication