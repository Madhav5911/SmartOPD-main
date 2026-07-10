   # SmartOPD — Digital OPD Queue Management

   SmartOPD is a modern, browser-based system to manage outpatient department (OPD) queues. Patients can register remotely, receive a token, and track their queue position in real time. Hospital staff and doctors get an admin interface to monitor queues, call the next patient, manage statuses, and view audit logs.

   This README documents everything we built, how it’s structured, and how to run and deploy it so anyone can understand and operate the project confidently.

   ## What We Built
   - Public experience where patients:
      - Register with name/phone and choose department/doctor
      - Receive a token number and (optionally) book an appointment time slot
      - Track queue status (current token, waiting count, estimated wait time)
   - Admin experience where staff/doctors:
      - Monitor queues per doctor and call the next patient
      - View and filter patient lists; update statuses (`waiting` → `in-progress` → `completed`)
      - Review audit logs of important actions
      - Manage via role-based access using Supabase Auth (`SUPER_ADMIN`, `DOCTOR`, `RECEPTIONIST`) 

   ## Tech Stack
   - Frontend: Vite + React + TypeScript
   - Styling: Tailwind CSS + shadcn/ui + Radix UI
   - State/async: TanStack Query
   - Backend-as-a-Service: Supabase (Auth, Postgres, Row Level Security)
   - Deployment: Vercel (SPA rewrite via `vercel.json`)

   ## Key Features
   - Patient registration with walk-in or appointment flow
   - Real-time queue monitoring (auto-refresh every 5 seconds)
   - Doctor’s view to call next patient and see queue details
   - Admin dashboards for patients, doctors, and audit logs
   - Robust database schema with RLS policies for security

   ## Project Structure
   Top-level folders and notable files:

   - [database/](database/): Supabase schema and setup scripts
     - [schema.sql](database/schema.sql): Full schema (tables, triggers, RLS, seed data)
     - [enable_public_access.sql](database/enable_public_access.sql): Public read policies
     - [README.md](database/README.md): Database setup instructions
   - [vercel.json](vercel.json): SPA rewrite rules for Vercel
   - [src/App.tsx](src/App.tsx): Router and app providers (QueryClient, tooltips, toasts)
   - [src/lib/supabase.ts](src/lib/supabase.ts): Supabase client using Vite env vars
   - [src/services/*](src/services): All data access and business logic
   - [src/pages/*](src/pages): Public and admin routes/views
   - [src/components/*](src/components): Layouts, guards, and UI primitives
   - [tailwind.config.ts](tailwind.config.ts): Tailwind configuration
   - [package.json](package.json): Scripts and dependencies

   ## Routes Overview
   - Public
      - `/` — Landing page with product overview
      - `/register` — Patient registration (walk-in or appointment)
      - `/queue` — Live queue status per department/doctor
   - Admin (behind `AuthGuard`)
      - `/admin/login` — Supabase auth login
      - `/admin/dashboard` — Overview and queue actions
      - `/admin/patients` — List/filter patients and change statuses
      - `/admin/doctors` — View doctors and availability
      - `/admin/audit-logs` — View system audit trail
      - `/admin/my-queue` — Doctor-specific queue view
      - `/admin/queue-monitor` — Admin monitor for any queue
      - `/admin/register` — Admin registration flow
      - `/admin/user-register` — Staff user registration

   ## Data Model (Supabase)
   We use Supabase Postgres with Row Level Security (RLS). Core tables:
   - `profiles`: links to `auth.users`, stores `name` and `role` (`SUPER_ADMIN`, `DOCTOR`, `RECEPTIONIST`)
   - `departments`: department catalog
   - `doctors`: doctor profiles mapped to departments with `available` flag
   - `patients`: registered patients (walk-in or appointment), token, status, notification preferences
   - `queue_tokens`: queue entries with `status` and `token_number`
   - `appointments`: appointment bookings with slot/time and status
   - `audit_logs`: simple append-only audit trail

   Schema, triggers, and policies are defined in [database/schema.sql](database/schema.sql). Setup instructions are in [database/README.md](database/README.md).

   ## Environment Variables
   All configuration is provided via Vite env variables (must be prefixed with `VITE_`):
   - `VITE_SUPABASE_URL` — Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY` — Supabase public anon key

   Create a `.env` file at the project root. Copy `.env.example` as a template.

   ## Setup & Run (Local)
   Prerequisites:
   - Node.js 18+ (required by Vite 5)
   - A Supabase project with the schema installed

   1) Install dependencies

   ```bash
   npm install
   ```

   2) Configure Supabase
      - Create a new Supabase project at [supabase.com](https://supabase.com)
      - Copy your Project `URL` and anon `key`
      - Follow setup steps in [database/README.md](database/README.md)

   3) Add environment variables
      - Copy `.env.example` to `.env`
      - Fill in `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`

   4) Start the dev server

   ```bash
   npm run dev
   ```

   The app will start on http://localhost:8080. The SPA router is handled client-side.

   ## Linting
   - Lint code: `npm run lint`
   - Configuration: [eslint.config.js](eslint.config.js)

   ## Deployment (Vercel)
   This is a static SPA. On Vercel:
   - Import the repo and set environment variables (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) in the Project Settings → Environment Variables
   - Ensure the rewrite config from [vercel.json](vercel.json) is present to route all paths to `/index.html`
   - Build command: `npm run build`, Output: `dist`
   - Preview/Production deployments will serve the SPA with client-side routing

   ## Implementation Notes
   - Supabase client is created in [src/lib/supabase.ts](src/lib/supabase.ts) using Vite env variables
   - Data access & business logic are isolated in [src/services](src/services)
   - RLS allows public patient registration while keeping admin reads/writes authenticated
   - `AuthGuard` in [src/components/AuthGuard.tsx](src/components/AuthGuard.tsx) redirects unauthenticated users to `/admin/login`
   - Path aliases (`@/*`) are configured in [tsconfig.json](tsconfig.json)
   - UI uses shadcn/ui components under [src/components/ui](src/components/ui)

   ## Troubleshooting
   - 401/permission errors from Supabase:
      - Ensure you’ve run [database_schema.sql](database_schema.sql) and then [fix_rls_policies.sql](fix_rls_policies.sql)
      - Confirm your `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are correct
      - Authenticated routes require a logged-in Supabase user; use `/admin/login`
   - Missing departments/doctors:
      - Schema seeds insert sample data; re-run the seed statements or insert via Supabase Table Editor
   - Build issues:
      - Ensure Node.js 18+; clear `node_modules` and reinstall if needed

   ## Roadmap Ideas
   - Notifications integration (SMS/WhatsApp) for token updates
   - Doctor availability scheduling and shifts
   - Appointment reminders and cancellation flows
   - Role management UI for admins

   ## License
   No license specified. If you plan to distribute, please add an appropriate license. 
   new idea to implement

