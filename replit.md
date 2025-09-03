# Overview

This is a full-stack educational management application called "Lumina Assistant" built with React, Express, TypeScript, and PostgreSQL. The platform serves three user types: students, teachers, and managers (administrators). It automates assignment correction, generates reports, and provides educational insights to streamline the teaching and learning process.

The application features a modern UI built with shadcn/ui components, implements role-based dashboards, and uses Drizzle ORM for database management. It's designed to reduce time spent on grading while providing valuable analytics for educational institutions.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The client-side is built with React 18 and TypeScript, using Vite as the build tool. The UI framework leverages shadcn/ui components built on top of Radix UI primitives, providing a consistent and accessible design system. The application uses Wouter for client-side routing and TanStack Query for server state management.

The frontend follows a component-based architecture with:
- **Pages**: Route-level components for different user dashboards (student, teacher, manager)
- **Components**: Reusable UI components organized by feature (student, teacher, manager, layout)
- **Hooks**: Custom React hooks for common functionality
- **Types**: TypeScript interfaces for type safety

Styling is handled through Tailwind CSS with CSS custom properties for theming, supporting both light and dark modes.

## Backend Architecture
The server uses Express.js with TypeScript, implementing a RESTful API architecture. The application follows a modular structure with:
- **Routes**: API endpoint definitions for authentication, users, classes, activities, and submissions
- **Storage**: Data access layer with both in-memory implementation (for development) and database integration
- **Middleware**: Request logging, error handling, and development tooling

The server integrates with Vite's development server in development mode for hot module replacement and serves static assets in production.

## Data Storage
The application uses PostgreSQL as the primary database with Drizzle ORM for type-safe database interactions. The schema includes:
- **Users**: Students, teachers, and managers with role-based access
- **Classes**: Course management with teacher assignments
- **Activities**: Assignments and assessments with grading criteria
- **Submissions**: Student work with AI analysis and feedback
- **Enrollments**: Student-class relationships

Database migrations are managed through Drizzle Kit, and the application supports both local PostgreSQL and cloud providers like Neon Database.

## Authentication and Authorization
The application implements a simple authentication system with email/password login. User sessions are managed through the backend, and role-based access control determines which features are available to each user type. The frontend conditionally renders components based on user roles.

# External Dependencies

- **Database**: PostgreSQL (local or Neon Database cloud hosting)
- **UI Framework**: Radix UI primitives for accessible components
- **Styling**: Tailwind CSS for utility-first styling
- **Build Tools**: Vite for frontend bundling and development server
- **ORM**: Drizzle ORM for type-safe database operations
- **State Management**: TanStack Query for server state caching
- **Form Handling**: React Hook Form with Zod validation
- **Date Utilities**: date-fns for date manipulation
- **Development**: ESBuild for production server bundling
- **Replit Integration**: Custom Vite plugins for Replit environment support

The application is designed to run in Replit's environment with specific configurations for development and deployment.