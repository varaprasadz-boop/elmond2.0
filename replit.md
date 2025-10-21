# Elmond.org LMS Clone

## Overview

Elmond is a comprehensive Learning Management System (LMS) and e-commerce education platform built with React, Express, and PostgreSQL. The platform enables students to browse, purchase, and complete online courses while instructors can manage their content. It features a dual user experience for students and instructors, with course discovery, shopping cart functionality, payment processing, progress tracking, and certificate generation.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- **Framework:** React 18 with TypeScript
- **Routing:** Wouter (lightweight React router)
- **State Management:** React Context API for global state (Cart, Authentication)
- **Data Fetching:** TanStack React Query for server state management
- **UI Framework:** Shadcn/ui components built on Radix UI primitives
- **Styling:** Tailwind CSS with custom design system
- **Form Handling:** React Hook Form with Zod validation

**Design System:**
- Hybrid approach combining reference-based design (Udemy/Coursera) with Material Design principles
- Custom color palette with light/dark mode support
- Typography: Inter (primary) and Space Grotesk (display headings)
- Consistent component patterns for cards, buttons, and forms

**Key Features:**
- Responsive layout with mobile-first approach
- Dark mode support via CSS variables
- Component-based architecture with reusable UI elements
- Client-side routing with route-based code splitting

### Backend Architecture

**Technology Stack:**
- **Runtime:** Node.js with Express.js
- **Language:** TypeScript with ES modules
- **Database ORM:** Drizzle ORM
- **Build Tool:** esbuild for production builds
- **Development:** tsx for TypeScript execution

**Current State:**
- Basic Express server setup with route registration structure
- In-memory storage implementation (MemStorage) for development
- Session-based architecture placeholder
- API routes prefixed with `/api`

**Storage Layer Design:**
- Interface-based storage abstraction (IStorage)
- Currently using in-memory implementation for rapid development
- Designed to swap to PostgreSQL/Drizzle implementation
- CRUD operations for users, courses, enrollments, and orders

### Data Architecture

**Database Schema (PostgreSQL via Drizzle):**

1. **Users Table:**
   - Core authentication and profile data
   - Fields: id, email, name, password, avatar, bio, phone, createdAt

2. **Enrollments Table:**
   - Tracks student course registrations
   - Progress tracking (percentage completion)
   - Status management (in_progress, completed)
   - Timestamps for enrollment, completion, last access

3. **Lesson Progress Table:**
   - Granular tracking of individual lesson completion
   - Time spent per lesson
   - Links to enrollments

4. **Certificates Table:**
   - Generated upon course completion
   - Unique certificate numbers
   - Issued timestamps

5. **Orders Table:**
   - E-commerce transaction records
   - Payment method tracking
   - Total amounts and status

**Data Flow:**
- Client makes requests via React Query
- Express routes handle business logic
- Storage interface abstracts data operations
- Drizzle ORM manages database interactions
- Schema validation using Drizzle-Zod

### Authentication & Authorization

**Current Implementation:**
- Mock authentication in AuthContext
- Client-side state management via localStorage
- Credential validation: varaprasadz@gmail.com / asdfghjkl

**Planned Architecture:**
- Session-based authentication
- Connect-pg-simple for PostgreSQL session storage
- Role-based access control (student vs instructor)
- Protected routes for dashboard and learning features

### E-Commerce Flow

**Shopping Cart:**
- Context-based state management
- Add/remove items functionality
- Total calculation
- Persists across page navigation

**Checkout Process:**
1. Cart review
2. Billing information collection
3. Payment method selection (Credit Card, UPI)
4. Order creation
5. Enrollment generation
6. Email confirmation (planned)

## External Dependencies

### UI Component Libraries
- **Radix UI Primitives:** Unstyled, accessible component primitives for building the UI
- **Shadcn/ui:** Pre-built component library using Radix UI
- **Lucide React:** Icon library for UI elements

### Database & ORM
- **@neondatabase/serverless:** Neon serverless PostgreSQL driver
- **Drizzle ORM:** Type-safe SQL ORM for database operations
- **drizzle-zod:** Schema validation integration

### Development Tools
- **Vite:** Frontend build tool and dev server
- **esbuild:** Backend bundling for production
- **tsx:** TypeScript execution for development

### Data Management
- **TanStack React Query:** Server state management and caching
- **React Hook Form:** Form state management
- **Zod:** Schema validation

### Styling
- **Tailwind CSS:** Utility-first CSS framework
- **class-variance-authority:** Variant-based component styling
- **tailwind-merge & clsx:** Class name utilities

### Session & Storage
- **connect-pg-simple:** PostgreSQL session store for Express (installed but not yet implemented)
- WebSocket support via ws for Neon database connections

### Third-Party Integrations
- **WhatsApp Business API:** Customer support integration (phone: 918519847774)
- **Google Fonts:** Inter and Space Grotesk font families
- Cookie consent management for GDPR compliance

### Payment Processing
- Currently mock implementation
- Designed to integrate with payment gateways (Razorpay, Stripe, etc.)

### Email Services
- Placeholder for transactional emails (enrollment confirmations, certificates)
- No current implementation

### Analytics & Monitoring
- Placeholder for user behavior tracking
- Course completion analytics structure in database schema