# BooklyPro — Implementation Checklist

## 1. Project Initialization & Infrastructure
- [x] Git repository initialized (`main` branch) and remote origin configured
- [x] Root `.gitignore` and `IMPLEMENTATION_CHECKLIST.md` created
- [x] Docker Compose (`docker-compose.yml`) for PostgreSQL, Backend, and Frontend (EC2 ready)
- [x] Backend & Frontend Dockerfiles with production configuration

## 2. Backend Implementation (`server/`)
- [x] Spring Boot 3.3.5 Maven structure configured with Java 17 LTS
- [x] Dependencies configured (`spring-boot-starter-web`, `security`, `data-jpa`, `validation`, `flyway`, `postgresql`, `h2`, `google-api-client`, `jjwt`)
- [x] Application configuration for both `dev` (H2 standalone) and `prod` (PostgreSQL) profiles
- [x] Flyway Migrations:
  - [x] `V1__init_schema.sql` (users, businesses, branding, services, staff, working_hours, time_off, customers, appointments, notifications)
  - [x] `V2__seed_demo_data.sql` (Salon Amina in Fès, services, staff, schedule, appointments)
- [x] Security & Authentication:
  - [x] JWT token generation and validation filter (`JwtAuthenticationFilter`)
  - [x] `POST /api/v1/auth/google` Google Token Exchange via `GoogleIdTokenVerifier`
  - [x] `POST /api/v1/auth/dev-login` 1-Click login for instant local development
  - [x] `POST /api/v1/auth/register` & `POST /api/v1/auth/login`
  - [x] `GET /api/v1/auth/me`
- [x] Storage Service (`LocalStorageService`) with MIME validation and safe UUID filenames
- [x] Business, Branding & Settings APIs:
  - [x] `GET/PUT /api/v1/owner/business` & publish/unpublish toggles
  - [x] `GET/PUT /api/v1/owner/business/branding` & file uploads (logo/cover)
- [x] Services & Staff Management APIs:
  - [x] Services CRUD & active toggles
  - [x] Staff CRUD & service assignments
- [x] Scheduling & Working Hours APIs:
  - [x] Working hours CRUD (Mon-Sun, start/end times, closed days)
  - [x] Time off CRUD
  - [x] Booking settings (advance notice, buffer, horizon)
- [x] Booking & Availability Engine:
  - [x] Slot calculation respecting staff schedule, buffer, past time, horizon, and time off
  - [x] Conflict detection & transactional lock (`409 Conflict` on overlap)
  - [x] Service snapshot (price in MAD, duration) on appointment
  - [x] Unique booking reference generation (`BK-XXXXXX`)
- [x] Owner Appointment Management:
  - [x] List/filter appointments by date range & status
  - [x] Status updates (`CONFIRMED`, `COMPLETED`, `CANCELLED`)
  - [x] Dashboard summary metrics
- [x] Public Booking APIs:
  - [x] `GET /api/v1/public/businesses/{slug}`
  - [x] `GET /api/v1/public/businesses/{slug}/availability`
  - [x] `POST /api/v1/public/businesses/{slug}/appointments`
  - [x] `GET /api/v1/public/appointments/{reference}`
- [x] Automated Tests:
  - [x] Slot availability test (`AvailabilityServiceTest`)
  - [x] Concurrency / double-booking overlap rejection test (`BookingConcurrencyTest`)
  - [x] Tenant boundary isolation test (`TenantSecurityTest`)

## 3. Frontend Implementation (`client/`)
- [x] React 18 + TypeScript + Vite + Tailwind CSS project scaffolding
- [x] Lucide icons, clsx, tailwind-merge, react-router-dom, axios setup
- [x] Axios client with `/api/v1` base URL and `localStorage` Bearer token interceptor
- [x] Auth context & components:
  - [x] Google OAuth provider & popup login (`@react-oauth/google`)
  - [x] 1-Click Dev Login button ("Salon Amina, Fès")
  - [x] Email/Password login & registration
- [x] Owner Onboarding Wizard (4-step guided setup with preview & publish)
- [x] Owner Dashboard:
  - [x] Overview (metrics, today's appointments, setup checklist)
  - [x] Appointments agenda & status management
  - [x] Services management modal & cards
  - [x] Staff management & service assignment modal
  - [x] Schedule & time-off configuration
  - [x] Booking page & branding live customizer with smartphone simulator
  - [x] Business settings & booking policies
- [x] Public Customer Booking Experience (`/book/:slug`):
  - [x] Branded banner, logo, business details in MAD currency
  - [x] Service selection
  - [x] Staff selection ("Any available" or specific staff)
  - [x] Interactive date picker and real-time slot selection
  - [x] Customer contact details form (name, phone, email, notes)
  - [x] Instant booking submission with collision conflict guard
- [x] Booking Confirmation Screen (`/booking/confirmed/:reference`):
  - [x] Confirmation card with booking reference, details, and instructions

## 4. Verification, Documentation & Git Commits
- [x] Backend test verification (`mvn test` passed: 5/5 tests green)
- [x] Frontend build verification (`npm run build` passed: 0 errors)
- [x] README.md with architecture, local run, EC2 Docker Compose guide, and demo credentials
- [ ] Git commit and push to remote
