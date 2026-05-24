# Database Setup Guide

## Initial Setup

This project uses Supabase for all backend services. Follow these steps to set up your database:

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and create an account
2. Create a new project
3. Wait for the project to be provisioned
4. Note your project's:
   - **Project URL** (`VITE_SUPABASE_URL`)
   - **Anon Key** (`VITE_SUPABASE_ANON_KEY`)

### 2. Run Schema Setup

1. Navigate to your Supabase project's SQL Editor
2. Create a new query
3. Copy the entire contents of `database/schema.sql`
4. Paste and run it in the SQL Editor
5. Wait for completion

### 3. Apply RLS Policy Fixes

1. Create a new query
2. Copy and run each file in this order:
   - `database/enable_public_access.sql`
   - `database/fix_rls_policies.sql` (if needed)
   - `database/update_queue_rls.sql`

### 4. Configure Environment Variables

1. Copy `.env.example` to `.env`
2. Fill in your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your-project-url
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

## Database Schema

The database includes:
- **profiles** - User account data
- **departments** - Hospital departments
- **doctors** - Doctor information
- **patients** - Patient registration data
- **queue_tokens** - Queue token allocation
- **appointments** - Appointment scheduling
- **audit_logs** - Action logging for compliance

For details, see `database/schema.sql`

## Row Level Security (RLS)

All tables have RLS enabled for security. Policies allow:
- Public users to view departments, doctors, and queue data
- Authenticated users to manage their own data
- Admins to access all data

See SQL files for detailed policy configurations.
