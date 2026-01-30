# Lendsqr Frontend Engineer Assessment

A comprehensive admin dashboard application built for Lendsqr's frontend engineering assessment. This project demonstrates proficiency in React, TypeScript, Next.js, and SCSS while implementing pixel-perfect designs and following best practices.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![React](https://img.shields.io/badge/React-19.2.3-61dafb)

## Project Overview

This application is a recreation of Lendsqr's admin console, featuring user management capabilities with data visualization, filtering, and detailed user profiles. The implementation focuses on visual fidelity, code quality, and responsive design.

### Live Demo

🔗 **[View Live Application](https://nwangwu-israel-ikechukwu-lendsqr-fe-test.vercel.app)**

### Design Reference

**[Figma Design](https://www.figma.com/file/ZKILoCoIoy1IESdBpq3GNC/Frontend-Testing)**

## Features

- **Authentication System**: login page with simple form validation
- **User Dashboard**: Overview with statistics and user metrics
- **User Management**: Comprehensive table with filtering, sorting, and pagination
- **User Details**: Detailed user profiles with tabbed navigation
- **Local Storage**: Persistent data storage using LocalStorage
- **Responsive Design**: Almost responsive across all device sizes
- **Mock API Integration**: 500+ user records from mock API
- **Status Management**: User status controls (Active, Inactive, Pending, Blacklisted)

## Tech Stack

### Core Technologies

- **Framework**: [Next.js 16.1.6](https://nextjs.org/) (App Router)
- **Language**: [TypeScript 5.x](https://www.typescriptlang.org/)
- **UI Library**: [React 19.2.3](https://react.dev/)
- **Styling**: [SCSS 1.97.3](https://sass-lang.com/)

### Additional Libraries

- **HTTP Client**: Axios 1.13.4
- **Icons**: Figma SVGs
- **Code Quality**: ESLint 9.x with Next.js config

### Development Tools

- **Package Manager**: npm
- **Linting**: ESLint with Next.js configuration
- **Type Checking**: TypeScript strict mode

## Project Structure

```
lendsqr-fe-test/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication routes
│   │   └── login/
│   │       ├── page.tsx          # Login page component
│   │       └── login.module.scss # Login styles
│   ├── dashboard/                # Dashboard routes
│   │   ├── layout.tsx            # Dashboard layout wrapper
│   │   ├── layout.module.scss    # Dashboard layout styles
│   │   └── users/                # User management
│   │       ├── page.tsx          # Users list page
│   │       ├── users.module.scss # Users table styles
│   │       └── [id]/             # Dynamic user detail route
│   │           ├── page.tsx      # User details page
│   │           └── UserDetails.module.scss
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page
│   └── globals.scss              # Global styles
│
├── components/                   # Reusable components
│   ├── dashboard/
│   │   ├── Sidebar.tsx           # Navigation sidebar
│   │   ├── Sidebar.module.scss
│   │   ├── Topbar.tsx            # Top navigation bar
│   │   ├── Topbar.module.scss
│   │   ├── StatCard.tsx          # Statistics card component
│   │   ├── StatCard.module.scss
│   │   └── EmptyState.tsx        # Empty state component
│   └── users/
│       ├── UserTable.tsx         # Users data table
│       └── UserTable.module.scss
│
├── lib/                          # Utility functions
│   ├── api.ts                    # API service layer
│   └── utils.ts                  # Helper functions
│
├── types/                        # TypeScript type definitions
│   └── user.ts                   # User interface definitions
│
├── styles/                       # Global SCSS
│   ├── _variables.scss           # SCSS variables (colors, fonts, etc.)
│   └── _mixins.scss              # SCSS mixins and functions
│
├── public/                       # Static assets
│   └── assets/                   # Images, icons, SVGs
│
├── .gitignore                    # Git ignore rules
├── eslint.config.mjs             # ESLint configuration
├── next.config.ts                # Next.js configuration
├── package.json                  # Project dependencies
├── tsconfig.json                 # TypeScript configuration
└── README.md                     # Project documentation
```

## Getting Started

### Prerequisites

- **Node.js**: 18.x or higher
- **npm**: 9.x or higher (or yarn/pnpm)
- **Git**: For version control

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/IsraelIyke/lendsqr-fe-test.git
   cd lendsqr-fe-test
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or all device testing
   npm run dev -- -H 0.0.0.0
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

### Linting

```bash
# Run ESLint
npm run lint
```

## Design Implementation

### Visual Fidelity

- Pixel-perfect implementation of Figma design
- Consistent spacing, typography, and color schemes
- Proper use of design tokens and SCSS variables

### Responsive Breakpoints

```scss
// Mobile
@media (max-width: 768px) {
}

// Tablet
@media (min-width: 769px) and (max-width: 1024px) {
}

// Desktop
@media (min-width: 1025px) {
}
```

### Color Palette

```scss
// Primary colors
$primary-color: #39cdcc;
$secondary-color: #213f7d;

// Status colors
$active: #39cd62;
$inactive: #545f7d;
$pending: #e9b200;
$blacklisted: #e4033b;

// Neutral colors
$text-primary: #213f7d;
$text-secondary: #545f7d;
$background: #fbfbfb;
$white: #ffffff;
```

## 📊 API Integration

### Mock API

The application uses a mock API to simulate backend interactions:

- **Endpoint**: [https://api.json-generator.com/templates/...](https://api.json-generator.com)
- **Records**: 500 user records
- **Format**: JSON

### Data Structure

```typescript
interface User {
  id: string;
  orgName: string;
  userName: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
  status: "Active" | "Inactive" | "Pending" | "Blacklisted";
  // ... additional fields
}
```

### Local Storage Strategy

- **User List Cache**: Stored for faster subsequent loads
- **User Details**: Cached individually with timestamp

## 🧪 Testing Strategy

### Integration Tests

- Local storage operations

## Security Considerations

- Environment variable management for sensitive data

## Performance Optimizations

- **Code Splitting**: Route-based automatic code splitting
- **Image Optimization**: Next.js Image component
- **Lazy Loading**: Components loaded on demand
- **Caching**: Strategic use of local storage

## Code Quality Standards

### Naming Conventions

- **Components**: PascalCase (e.g., `UserTable.tsx`)
- **Functions**: camelCase (e.g., `fetchUsers()`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`)
- **CSS Classes**: kebab-case (e.g., `user-table-row`)

## 🚢 Deployment

### Vercel Deployment (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=your_api_url
NEXT_PUBLIC_API_KEY=your_api_key
```

## 📝 Project Decisions & Rationale

### Why Next.js?

- Built-in routing and file-based structure
- Excellent TypeScript support
- Optimal performance with SSR/SSG capabilities
- Great developer experience

### Why SCSS?

- Required by assessment criteria

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Your Name**

- GitHub: [@IsraelIyke](https://github.com/IsraelIyke)
- Email: nwangwuisrael@gmail.com

## Acknowledgments

- Lendsqr for the assessment opportunity

---

**Note**: This is a technical assessment project for Lendsqr. The code is for evaluation purposes and is not used in production systems.

## 📋 Assessment Checklist

- [x] Login page implementation
- [x] Dashboard with statistics
- [x] Users list page with table
- [x] User details page
- [x] Mock API integration (500 records)
- [x] Local storage implementation
- [x] TypeScript strict mode
- [x] SCSS for all styling
- [x] Visual fidelity to Figma design
- [x] Clean Git history
- [x] Comprehensive README
- [x] Code quality and best practices
- [x] Deployment to cloud platform
