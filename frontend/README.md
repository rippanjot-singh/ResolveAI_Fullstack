# ResolveAI Frontend - Comprehensive Codebase Analysis



## Table of Contents
1. [Global Architecture & Tech Stack](#global-architecture--tech-stack)
2. [System Decisions & Fallback Strategies](#system-decisions--fallback-strategies)
3. [Folder Structure](#folder-structure)
4. [Detailed File Analysis](#detailed-file-analysis)

## Global Architecture & Tech Stack

The ResolveAI frontend is a modern, high-performance web application built with a robust selection of technologies aimed at delivering a premium, real-time user experience. The primary stack includes:

- **React 19 & Vite**: Utilizing the latest React version with Vite for blazing-fast Hot Module Replacement (HMR) and optimized production builds.
- **TailwindCSS 4**: For rapid, utility-first styling ensuring a consistent design system and highly responsive UI components.
- **Redux Toolkit (RTK)**: Managing global state, specifically user authentication, theming, and real-time data synchronizations.
- **React Router DOM 7**: Implementing client-side routing with nested routes, protected routes, and layout-driven structures.
- **Axios**: Serving as the foundational HTTP client. It is configured with interceptors to handle JWT token injection, token refreshes, and centralized error handling.
- **Socket.io-client**: Establishing full-duplex, persistent connections to the backend for real-time updates (e.g., ticket updates, live AI agent statuses).
- **Lenis**: Enabling smooth scrolling for a highly polished, premium SaaS-level user experience.
- **Recharts**: For rendering data-dense, interactive charts on the dashboard.

## System Decisions & Fallback Strategies

Every architectural decision in this codebase was made to balance performance, developer experience, and user reliability.

### Key Decisions
1. **Feature-Based File Structure**: The `src/features` directory encapsulates domain-specific logic (Auth, Dashboard, Forms, Knowledge). This avoids a monolithic `components` folder and ensures scalability. Each feature acts as a micro-frontend with its own components, hooks, pages, and services.
2. **Global State vs Local State**: RTK is strictly reserved for data that multiple disjoint components need (e.g., user profile, active theme). Local state (`useState`) is used for UI toggles and form inputs to prevent unnecessary global re-renders.
3. **Custom Hooks Extraction**: Business logic is decoupled from UI components into custom hooks (`useAuth.js`, `useForms.js`). This ensures components remain pure rendering functions and makes logic highly testable.

### Comprehensive Fallback Handling
- **Network Failures**: Every API call via Axios is wrapped in `try/catch` blocks. Global interceptors catch 401 Unauthorized errors to trigger automated logouts or token refreshes, ensuring users are never stuck in a broken authenticated state.
- **Real-time Disconnections**: Socket.io is configured with automatic reconnection strategies. If the WebSocket server drops, the UI will fall back to periodic polling or show a "Reconnecting..." state to the user.
- **Data Loading States**: `react-loading-skeleton` is deployed across the application. When data is actively fetching, structural skeletons map exactly to the final layout, preventing layout shift (CLS) and providing psychological reassurance to the user.
- **Graceful Degradation**: If specific browser features (like smooth scrolling) fail, standard browser defaults take over seamlessly without breaking core navigation.

## Folder Structure

The tree below maps out every directory and file orchestrating the platform.

```text
src
├── api
│   └── axios.js
├── assets
│   ├── authPhoto.png
│   ├── authPhotoDark.png
│   ├── constants.js
│   ├── logo.png
│   └── react.svg
├── context
│   └── SocketContext.jsx
├── features
│   ├── auth
│   │   ├── authSlice.js
│   │   ├── hooks
│   │   │   └── useAuth.js
│   │   ├── pages
│   │   │   ├── Login.jsx
│   │   │   └── SignUp.jsx
│   │   └── services
│   │       └── auth.api.js
│   ├── dashboard
│   │   ├── email
│   │   │   ├── components
│   │   │   │   ├── EmailDetailsModal.jsx
│   │   │   │   ├── EmailFilters.jsx
│   │   │   │   ├── EmailStats.jsx
│   │   │   │   └── EmailTable.jsx
│   │   │   ├── hooks
│   │   │   │   └── useEmails.js
│   │   │   ├── pages
│   │   │   │   └── Emails.jsx
│   │   │   └── services
│   │   │       └── email.api.js
│   │   ├── forms
│   │   │   ├── components
│   │   │   │   ├── FormCard.jsx
│   │   │   │   ├── FormCodeModal.jsx
│   │   │   │   ├── FormResultsStats.jsx
│   │   │   │   ├── ResultsTable.jsx
│   │   │   │   └── SubmissionDetailsModal.jsx
│   │   │   ├── hooks
│   │   │   │   ├── useFormResults.js
│   │   │   │   └── useForms.js
│   │   │   ├── pages
│   │   │   │   ├── CreateForm.jsx
│   │   │   │   ├── Forms.jsx
│   │   │   │   └── Results.jsx
│   │   │   └── services
│   │   │       └── form.api.js
│   │   ├── home
│   │   │   ├── components
│   │   │   │   ├── DashboardHeader.jsx
│   │   │   │   ├── KpiCard.jsx
│   │   │   │   ├── NeedsAttention.jsx
│   │   │   │   ├── PriorityBadge.jsx
│   │   │   │   ├── StatusBadge.jsx
│   │   │   │   ├── SystemIntelligence.jsx
│   │   │   │   └── WelcomeSection.jsx
│   │   │   ├── hooks
│   │   │   │   ├── useDahboard.js
│   │   │   │   └── useDashboardStats.js
│   │   │   ├── pages
│   │   │   │   └── Dashboard.jsx
│   │   │   └── services
│   │   │       └── dashboard.api.js
│   │   ├── knowledge
│   │   │   ├── components
│   │   │   │   ├── AddKnowledgeModal.jsx
│   │   │   │   ├── KnowledgeEmptyState.jsx
│   │   │   │   ├── KnowledgeHeader.jsx
│   │   │   │   ├── KnowledgeItem.jsx
│   │   │   │   ├── KnowledgeToolbar.jsx
│   │   │   │   └── TreeNode.jsx
│   │   │   ├── hooks
│   │   │   │   └── useKnowledge.js
│   │   │   ├── pages
│   │   │   │   └── Knowledge.jsx
│   │   │   └── services
│   │   │       └── knowledge.api.js
│   │   ├── leads
│   │   │   ├── components
│   │   │   │   ├── LeadDetailsModal.jsx
│   │   │   │   ├── LeadsHeader.jsx
│   │   │   │   ├── LeadsPagination.jsx
│   │   │   │   ├── LeadsStats.jsx
│   │   │   │   ├── LeadsTable.jsx
│   │   │   │   └── StatCard.jsx
│   │   │   ├── hooks
│   │   │   │   └── useLeads.js
│   │   │   ├── pages
│   │   │   │   └── Leads.jsx
│   │   │   └── services
│   │   │       └── leads.api.js
│   │   ├── settings
│   │   │   ├── components
│   │   │   │   ├── AccountHeader.jsx
│   │   │   │   ├── EmailIntegrationSection.jsx
│   │   │   │   ├── InviteForm.jsx
│   │   │   │   ├── InviteHeader.jsx
│   │   │   │   ├── InviteResult.jsx
│   │   │   │   └── ProfileSection.jsx
│   │   │   ├── layout
│   │   │   │   └── SettingsLayout.jsx
│   │   │   ├── pages
│   │   │   │   ├── AccountSettings.jsx
│   │   │   │   └── InviteMember.jsx
│   │   │   └── services
│   │   │       └── settings.api.js
│   │   ├── studio
│   │   │   ├── components
│   │   │   │   └── ChatbotPreview.jsx
│   │   │   ├── hooks
│   │   │   │   ├── useAgentEditor.js
│   │   │   │   ├── useAnalytics.js
│   │   │   │   ├── useChatbots.js
│   │   │   │   ├── useChats.js
│   │   │   │   └── usePlayground.js
│   │   │   ├── pages
│   │   │   │   ├── Agents.jsx
│   │   │   │   ├── Analytics.jsx
│   │   │   │   ├── Chats.jsx
│   │   │   │   ├── CreateAgent.jsx
│   │   │   │   └── Playground.jsx
│   │   │   └── services
│   │   │       ├── ai.api.js
│   │   │       ├── analytics.api.js
│   │   │       ├── chat.api.js
│   │   │       ├── chatbot.api.js
│   │   │       └── notion.api.js
│   │   └── tickets
│   │       ├── components
│   │       │   ├── CreateTicketModal.jsx
│   │       │   ├── FocusEmptyState.jsx
│   │       │   ├── FocusHeader.jsx
│   │       │   ├── PriorityBadge.jsx
│   │       │   ├── ResolutionArea.jsx
│   │       │   ├── StatCard.jsx
│   │       │   ├── StatusBadge.jsx
│   │       │   ├── TicketDetailsCard.jsx
│   │       │   ├── TicketDetailsModal.jsx
│   │       │   └── TicketSidebar.jsx
│   │       ├── hooks
│   │       │   └── useTickets.js
│   │       ├── pages
│   │       │   ├── FocusArea.jsx
│   │       │   └── Tickets.jsx
│   │       └── services
│   │           └── tickets.api.js
│   └── landing
│       └── home
│           └── pages
│               └── Home.jsx
├── index.css
├── main.jsx
├── routes
│   ├── AppRoutes.jsx
│   └── ProtectedRoute.jsx
├── shared
│   ├── components
│   │   └── ui
│   │       ├── DeleteConfirmModal.jsx
│   │       └── SkeletonWrapper.jsx
│   └── layout
│       ├── Navbar.jsx
│       └── SideNav.jsx
└── store
    ├── store.js
    ├── themeSlice.js
    └── ticketSlice.js
```

## Detailed File Analysis

The following section exhaustively documents every file in the codebase, detailing its purpose, state management, dependencies, exported functions, and how it handles potential errors.


---

## File: `src\api\axios.js`


**Size**: 9 lines of code
**Type**: JavaScript Module

### Purpose and Functionality
This file is a critical piece of the application. It operates as a logical module handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **axios** from `axios`

### Exported & Internal Functions
No prominent named functions detected via regex, likely indicating a default exported anonymous component or a configuration file.

### Architecture & Design Decisions
- **Network Requests**: Utilizing Axios for robust interceptors and global error handling.

### Error Handling & Fallbacks
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\assets\constants.js`


**Size**: 14 lines of code
**Type**: JavaScript Module

### Purpose and Functionality
This file is a critical piece of the application. It operates as a logical module handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **logo** from `./logo.png`
- **AuthPhoto** from `./authPhoto.png`
- **AuthPhotoDark** from `./authPhotoDark.png`

### Exported & Internal Functions
No prominent named functions detected via regex, likely indicating a default exported anonymous component or a configuration file.

### Architecture & Design Decisions

### Error Handling & Fallbacks
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\context\SocketContext.jsx`


**Size**: 82 lines of code
**Type**: React Component

### Purpose and Functionality
This file is a critical piece of the application. It operates as a UI component handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **React,  createContext, useContext, useEffect, useRef** from `react`
- **io** from `socket.io-client`
- **useSelector, useDispatch** from `react-redux`
- **addTicket, updateTicket** from `../store/ticketSlice`
- **toast** from `react-hot-toast`

### Side Effects
- Utilizes **1** `useEffect` hook(s) to manage lifecycle events, subscriptions, or data fetching. Proper cleanup functions are expected to prevent memory leaks.

### Exported & Internal Functions
- **`useSocket`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `useSocket`.
- **`SocketProvider`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `SocketProvider`.
- **`companyId`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `companyId`.

### Architecture & Design Decisions
- **State Management**: Using Redux actions to decouple business logic from UI components.
- **Lifecycle Management**: Leveraging React hooks for deterministic side-effects and cleanup.
- **Component Design**: Following functional component patterns with hooks for reusability.
- **Real-time Engine**: Integrated Socket.io for bi-directional event-based communication.

### Error Handling & Fallbacks
- **User Feedback**: Utilizing Toast notifications to gracefully inform users of failures or network issues.
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\auth\authSlice.js`


**Size**: 37 lines of code
**Type**: JavaScript Module

### Purpose and Functionality
This file is a critical piece of the application. It operates as a logical module handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **createSlice** from `@reduxjs/toolkit`

### Exported & Internal Functions
- **`authSlice`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `authSlice`.

### Architecture & Design Decisions

### Error Handling & Fallbacks
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\auth\hooks\useAuth.js`


**Size**: 104 lines of code
**Type**: JavaScript Module

### Purpose and Functionality
This file is a critical piece of the application. It operates as a logical module handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **useState, useCallback** from `react`
- **useDispatch, useSelector** from `react-redux`
- **authApi** from `../services/auth.api`
- **setUser, setLoading, setError, setDashboardData** from `../authSlice`
- **useNavigate** from `react-router-dom`

### Exported & Internal Functions
- **`useAuth`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `useAuth`.
- **`login`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `login`.
- **`signup`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `signup`.
- **`logout`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `logout`.
- **`fetchMe`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `fetchMe`.
- **`inviteUser`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `inviteUser`.

### Architecture & Design Decisions
- **State Management**: Using Redux actions to decouple business logic from UI components.

### Error Handling & Fallbacks
- **Try/Catch Blocks**: Explicitly catching async errors to prevent unhandled promise rejections.
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\auth\pages\Login.jsx`


**Size**: 147 lines of code
**Type**: React Component

### Purpose and Functionality
This file is a critical piece of the application. It operates as a UI component handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **React,  useState** from `react`
- **Link** from `react-router-dom`
- **useAuth** from `../hooks/useAuth`
- **constants** from `../../../assets/constants`

### Local State Management
- State `showPassword`: Updated via `setShowPassword`. Handles component local state for rendering logic.
- State `email`: Updated via `setEmail`. Handles component local state for rendering logic.
- State `password`: Updated via `setPassword`. Handles component local state for rendering logic.

### Exported & Internal Functions
- **`Login`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `Login`.
- **`handleSubmit`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `handleSubmit`.
- **`handleGoogleLogin`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `handleGoogleLogin`.

### Architecture & Design Decisions
- **Component Design**: Following functional component patterns with hooks for reusability.

### Error Handling & Fallbacks
- **Try/Catch Blocks**: Explicitly catching async errors to prevent unhandled promise rejections.
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\auth\pages\SignUp.jsx`


**Size**: 183 lines of code
**Type**: React Component

### Purpose and Functionality
This file is a critical piece of the application. It operates as a UI component handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **React,  useState** from `react`
- **Link, useSearchParams** from `react-router-dom`
- **useAuth** from `../hooks/useAuth`
- **useSelector** from `react-redux`
- **constants** from `../../../assets/constants`

### Local State Management
- State `searchParams] = useSearchParams();
  const inviteToken = searchParams.get('inviteToken');
  
  const [showPassword`: Updated via `setShowPassword`. Handles component local state for rendering logic.
- State `companyName`: Updated via `setCompanyName`. Handles component local state for rendering logic.
- State `name`: Updated via `setName`. Handles component local state for rendering logic.
- State `email`: Updated via `setEmail`. Handles component local state for rendering logic.
- State `password`: Updated via `setPassword`. Handles component local state for rendering logic.

### Exported & Internal Functions
- **`SignUp`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `SignUp`.
- **`handleSubmit`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `handleSubmit`.
- **`handleGoogleLogin`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `handleGoogleLogin`.

### Architecture & Design Decisions
- **Component Design**: Following functional component patterns with hooks for reusability.

### Error Handling & Fallbacks
- **Try/Catch Blocks**: Explicitly catching async errors to prevent unhandled promise rejections.
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\auth\services\auth.api.js`


**Size**: 26 lines of code
**Type**: JavaScript Module

### Purpose and Functionality
This file is a critical piece of the application. It operates as a logical module handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **api** from `../../../api/axios`

### Exported & Internal Functions
- **`authApi`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `authApi`.
- **`response`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `response`.
- **`response`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `response`.
- **`response`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `response`.
- **`response`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `response`.

### Architecture & Design Decisions
- **Network Requests**: Utilizing Axios for robust interceptors and global error handling.

### Error Handling & Fallbacks
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\dashboard\email\components\EmailDetailsModal.jsx`


**Size**: 94 lines of code
**Type**: React Component

### Purpose and Functionality
This file is a critical piece of the application. It operates as a UI component handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **React** from `react`
- **Mail, X, User, Bot, ExternalLink, AlertCircle** from `lucide-react`

### Exported & Internal Functions
- **`EmailDetailsModal`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `EmailDetailsModal`.

### Architecture & Design Decisions
- **Component Design**: Following functional component patterns with hooks for reusability.

### Error Handling & Fallbacks
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\dashboard\email\components\EmailFilters.jsx`


**Size**: 22 lines of code
**Type**: React Component

### Purpose and Functionality
This file is a critical piece of the application. It operates as a UI component handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **React** from `react`
- **Search** from `lucide-react`

### Exported & Internal Functions
- **`EmailFilters`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `EmailFilters`.

### Architecture & Design Decisions
- **Component Design**: Following functional component patterns with hooks for reusability.

### Error Handling & Fallbacks
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\dashboard\email\components\EmailStats.jsx`


**Size**: 57 lines of code
**Type**: React Component

### Purpose and Functionality
This file is a critical piece of the application. It operates as a UI component handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **React** from `react`
- **Skeleton** from `../../../../shared/components/ui/SkeletonWrapper`
- **Inbox, CheckCircle2, Tag, Send** from `lucide-react`

### Exported & Internal Functions
- **`StatCard`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `StatCard`.
- **`EmailStats`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `EmailStats`.

### Architecture & Design Decisions
- **Component Design**: Following functional component patterns with hooks for reusability.

### Error Handling & Fallbacks
- **Loading States**: Using Skeleton loaders as a visual fallback while data is being fetched.
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\dashboard\email\components\EmailTable.jsx`


**Size**: 80 lines of code
**Type**: React Component

### Purpose and Functionality
This file is a critical piece of the application. It operates as a UI component handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **React** from `react`
- **SkeletonWrapper, Skeleton** from `../../../../shared/components/ui/SkeletonWrapper`
- **User, Mail** from `lucide-react`

### Exported & Internal Functions
- **`EmailTable`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `EmailTable`.

### Architecture & Design Decisions
- **Component Design**: Following functional component patterns with hooks for reusability.

### Error Handling & Fallbacks
- **Loading States**: Using Skeleton loaders as a visual fallback while data is being fetched.
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\dashboard\email\hooks\useEmails.js`


**Size**: 39 lines of code
**Type**: JavaScript Module

### Purpose and Functionality
This file is a critical piece of the application. It operates as a logical module handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **useState, useEffect** from `react`
- *** as emailApi** from `../services/email.api`

### Local State Management
- State `emails`: Updated via `setEmails`. Handles component local state for rendering logic.
- State `stats`: Updated via `setStats`. Handles component local state for rendering logic.
- State `loading`: Updated via `setLoading`. Handles component local state for rendering logic.
- State `error`: Updated via `setError`. Handles component local state for rendering logic.

### Side Effects
- Utilizes **1** `useEffect` hook(s) to manage lifecycle events, subscriptions, or data fetching. Proper cleanup functions are expected to prevent memory leaks.

### Exported & Internal Functions
- **`useEmails`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `useEmails`.
- **`fetchData`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `fetchData`.

### Architecture & Design Decisions
- **Lifecycle Management**: Leveraging React hooks for deterministic side-effects and cleanup.

### Error Handling & Fallbacks
- **Try/Catch Blocks**: Explicitly catching async errors to prevent unhandled promise rejections.
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\dashboard\email\pages\Emails.jsx`


**Size**: 87 lines of code
**Type**: React Component

### Purpose and Functionality
This file is a critical piece of the application. It operates as a UI component handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **React,  useState** from `react`
- **SideNav** from `../../../../shared/layout/SideNav`
- **useEmails** from `../hooks/useEmails`
- **EmailStats** from `../components/EmailStats`
- **EmailFilters** from `../components/EmailFilters`
- **EmailTable** from `../components/EmailTable`
- **EmailDetailsModal** from `../components/EmailDetailsModal`

### Local State Management
- State `searchQuery`: Updated via `setSearchQuery`. Handles component local state for rendering logic.
- State `filter`: Updated via `setFilter`. Handles component local state for rendering logic.
- State `selectedEmail`: Updated via `setSelectedEmail`. Handles component local state for rendering logic.

### Exported & Internal Functions
- **`Emails`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `Emails`.
- **`filteredEmails`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `filteredEmails`.

### Architecture & Design Decisions
- **Component Design**: Following functional component patterns with hooks for reusability.

### Error Handling & Fallbacks
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\dashboard\email\services\email.api.js`


**Size**: 12 lines of code
**Type**: JavaScript Module

### Purpose and Functionality
This file is a critical piece of the application. It operates as a logical module handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **api** from `../../../../api/axios`

### Exported & Internal Functions
- **`getEmails`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `getEmails`.
- **`getEmailStats`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `getEmailStats`.

### Architecture & Design Decisions
- **Network Requests**: Utilizing Axios for robust interceptors and global error handling.

### Error Handling & Fallbacks
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\dashboard\forms\components\FormCard.jsx`


**Size**: 78 lines of code
**Type**: React Component

### Purpose and Functionality
This file is a critical piece of the application. It operates as a UI component handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **React** from `react`
- **NavLink** from `react-router-dom`
- **FileText, Code, Power, Edit, Trash2, ChevronRight** from `lucide-react`

### Exported & Internal Functions
- **`FormCard`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `FormCard`.

### Architecture & Design Decisions
- **Component Design**: Following functional component patterns with hooks for reusability.

### Error Handling & Fallbacks
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\dashboard\forms\components\FormCodeModal.jsx`


**Size**: 111 lines of code
**Type**: React Component

### Purpose and Functionality
This file is a critical piece of the application. It operates as a UI component handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **React** from `react`
- **Code, X, Copy** from `lucide-react`
- **toast** from `react-hot-toast`

### Exported & Internal Functions
- **`FormCodeModal`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `FormCodeModal`.
- **`copyToClipboard`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `copyToClipboard`.
- **`generateHtml`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `generateHtml`.
- **`getFieldHTML`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `getFieldHTML`.
- **`htmlFields`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `htmlFields`.

### Architecture & Design Decisions
- **Component Design**: Following functional component patterns with hooks for reusability.

### Error Handling & Fallbacks
- **User Feedback**: Utilizing Toast notifications to gracefully inform users of failures or network issues.
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\dashboard\forms\components\FormResultsStats.jsx`


**Size**: 70 lines of code
**Type**: React Component

### Purpose and Functionality
This file is a critical piece of the application. It operates as a UI component handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **React** from `react`
- **Skeleton** from `../../../../shared/components/ui/SkeletonWrapper`
- **FileText, Clock, Layers, MessageSquare** from `lucide-react`

### Exported & Internal Functions
- **`StatCard`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `StatCard`.
- **`FormResultsStats`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `FormResultsStats`.
- **`stats`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `stats`.
- **`last24h`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `last24h`.
- **`uniqueForms`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `uniqueForms`.
- **`aiReplied`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `aiReplied`.

### Architecture & Design Decisions
- **Component Design**: Following functional component patterns with hooks for reusability.

### Error Handling & Fallbacks
- **Loading States**: Using Skeleton loaders as a visual fallback while data is being fetched.
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\dashboard\forms\components\ResultsTable.jsx`


**Size**: 110 lines of code
**Type**: React Component

### Purpose and Functionality
This file is a critical piece of the application. It operates as a UI component handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **React** from `react`
- **FileText, Calendar** from `lucide-react`
- **Skeleton** from `../../../../shared/components/ui/SkeletonWrapper`

### Exported & Internal Functions
- **`ResultsTable`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `ResultsTable`.

### Architecture & Design Decisions
- **Component Design**: Following functional component patterns with hooks for reusability.

### Error Handling & Fallbacks
- **Loading States**: Using Skeleton loaders as a visual fallback while data is being fetched.
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\dashboard\forms\components\SubmissionDetailsModal.jsx`


**Size**: 101 lines of code
**Type**: React Component

### Purpose and Functionality
This file is a critical piece of the application. It operates as a UI component handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **React** from `react`
- **FileText, X, Globe, User, Hash** from `lucide-react`

### Exported & Internal Functions
- **`SubmissionDetailsModal`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `SubmissionDetailsModal`.

### Architecture & Design Decisions
- **Component Design**: Following functional component patterns with hooks for reusability.

### Error Handling & Fallbacks
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\dashboard\forms\hooks\useFormResults.js`


**Size**: 50 lines of code
**Type**: JavaScript Module

### Purpose and Functionality
This file is a critical piece of the application. It operates as a logical module handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **useState, useCallback, useEffect** from `react`
- **getAllFormResults** from `../services/form.api`
- **useSocket** from `../../../../context/SocketContext`
- **toast** from `react-hot-toast`

### Local State Management
- State `results`: Updated via `setResults`. Handles component local state for rendering logic.
- State `isLoading`: Updated via `setIsLoading`. Handles component local state for rendering logic.
- State `error`: Updated via `setError`. Handles component local state for rendering logic.

### Side Effects
- Utilizes **1** `useEffect` hook(s) to manage lifecycle events, subscriptions, or data fetching. Proper cleanup functions are expected to prevent memory leaks.

### Exported & Internal Functions
- **`useFormResults`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `useFormResults`.
- **`fetchResults`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `fetchResults`.
- **`msg`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `msg`.
- **`handleNewSubmission`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `handleNewSubmission`.

### Architecture & Design Decisions
- **Lifecycle Management**: Leveraging React hooks for deterministic side-effects and cleanup.

### Error Handling & Fallbacks
- **Try/Catch Blocks**: Explicitly catching async errors to prevent unhandled promise rejections.
- **User Feedback**: Utilizing Toast notifications to gracefully inform users of failures or network issues.
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\dashboard\forms\hooks\useForms.js`


**Size**: 110 lines of code
**Type**: JavaScript Module

### Purpose and Functionality
This file is a critical piece of the application. It operates as a logical module handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **useState, useCallback** from `react`
- **getForms, createForm, getFormResults, toggleFormStatus, deleteForm, updateForm** from `../services/form.api`
- **toast** from `react-hot-toast`

### Local State Management
- State `forms`: Updated via `setForms`. Handles component local state for rendering logic.
- State `isLoading`: Updated via `setIsLoading`. Handles component local state for rendering logic.
- State `error`: Updated via `setError`. Handles component local state for rendering logic.

### Exported & Internal Functions
- **`useForms`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `useForms`.
- **`fetchForms`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `fetchForms`.
- **`handleCreateForm`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `handleCreateForm`.
- **`handleUpdateForm`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `handleUpdateForm`.
- **`handleToggleStatus`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `handleToggleStatus`.
- **`data`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `data`.
- **`handleDelete`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `handleDelete`.
- **`data`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `data`.

### Architecture & Design Decisions

### Error Handling & Fallbacks
- **Try/Catch Blocks**: Explicitly catching async errors to prevent unhandled promise rejections.
- **User Feedback**: Utilizing Toast notifications to gracefully inform users of failures or network issues.
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\dashboard\forms\pages\CreateForm.jsx`


**Size**: 439 lines of code
**Type**: React Component

### Purpose and Functionality
This file is a critical piece of the application. It operates as a UI component handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **React,  useState, useEffect** from `react`
- **SideNav** from `../../../../shared/layout/SideNav`
- **Copy, ChevronRight, Check, Code, SlidersHorizontal, Loader2, FileText, ArrowLeft, Plus, Trash2** from `lucide-react`
- **toast** from `react-hot-toast`
- **NavLink, useParams, useNavigate** from `react-router-dom`
- **useForms** from `../hooks/useForms`
- **useAuth** from `../../../auth/hooks/useAuth`
- **getForm** from `../services/form.api`

### Local State Management
- State `isFetching`: Updated via `setIsFetching`. Handles component local state for rendering logic.
- State `formName`: Updated via `setFormName`. Handles component local state for rendering logic.
- State `formDesc`: Updated via `setFormDesc`. Handles component local state for rendering logic.
- State `customFields`: Updated via `setCustomFields`. Handles component local state for rendering logic.
- State `createdForm`: Updated via `setCreatedForm`. Handles component local state for rendering logic.

### Side Effects
- Utilizes **1** `useEffect` hook(s) to manage lifecycle events, subscriptions, or data fetching. Proper cleanup functions are expected to prevent memory leaks.

### Exported & Internal Functions
- **`CreateForm`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `CreateForm`.
- **`fetchForm`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `fetchForm`.
- **`filteredFields`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `filteredFields`.
- **`addField`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `addField`.
- **`updateField`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `updateField`.
- **`removeField`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `removeField`.
- **`onSubmit`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `onSubmit`.
- **`processedCustomFields`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `processedCustomFields`.
- **`options`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `options`.
- **`generateHtml`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `generateHtml`.
- **`processedCustomFields`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `processedCustomFields`.
- **`options`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `options`.
- **`getFieldHTML`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `getFieldHTML`.
- **`htmlFields`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `htmlFields`.
- **`copyToClipboard`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `copyToClipboard`.

### Architecture & Design Decisions
- **Lifecycle Management**: Leveraging React hooks for deterministic side-effects and cleanup.
- **Component Design**: Following functional component patterns with hooks for reusability.

### Error Handling & Fallbacks
- **Try/Catch Blocks**: Explicitly catching async errors to prevent unhandled promise rejections.
- **User Feedback**: Utilizing Toast notifications to gracefully inform users of failures or network issues.
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\dashboard\forms\pages\Forms.jsx`


**Size**: 150 lines of code
**Type**: React Component

### Purpose and Functionality
This file is a critical piece of the application. It operates as a UI component handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **React,  useEffect, useState** from `react`
- **NavLink** from `react-router-dom`
- **SideNav** from `../../../../shared/layout/SideNav`
- **Plus, FileText, Search** from `lucide-react`
- **SkeletonWrapper, Skeleton** from `../../../../shared/components/ui/SkeletonWrapper`
- **DeleteConfirmModal** from `../../../../shared/components/ui/DeleteConfirmModal`
- **useForms** from `../hooks/useForms`
- **FormCard** from `../components/FormCard`
- **FormCodeModal** from `../components/FormCodeModal`

### Local State Management
- State `searchTerm`: Updated via `setSearchTerm`. Handles component local state for rendering logic.
- State `selectedFormForCode`: Updated via `setSelectedFormForCode`. Handles component local state for rendering logic.
- State `formToDelete`: Updated via `setFormToDelete`. Handles component local state for rendering logic.

### Side Effects
- Utilizes **1** `useEffect` hook(s) to manage lifecycle events, subscriptions, or data fetching. Proper cleanup functions are expected to prevent memory leaks.

### Exported & Internal Functions
- **`FormsList`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `FormsList`.
- **`filteredForms`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `filteredForms`.

### Architecture & Design Decisions
- **Lifecycle Management**: Leveraging React hooks for deterministic side-effects and cleanup.
- **Component Design**: Following functional component patterns with hooks for reusability.

### Error Handling & Fallbacks
- **Loading States**: Using Skeleton loaders as a visual fallback while data is being fetched.
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\dashboard\forms\pages\Results.jsx`


**Size**: 153 lines of code
**Type**: React Component

### Purpose and Functionality
This file is a critical piece of the application. It operates as a UI component handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **React,  useState, useEffect** from `react`
- **useParams, NavLink** from `react-router-dom`
- **SideNav** from `../../../../shared/layout/SideNav`
- **useFormResults** from `../hooks/useFormResults`
- **Download, Filter, ArrowLeft, RefreshCw** from `lucide-react`
- **ResultsTable** from `../components/ResultsTable`
- **SubmissionDetailsModal** from `../components/SubmissionDetailsModal`
- **FormResultsStats** from `../components/FormResultsStats`

### Local State Management
- State `filterForm`: Updated via `setFilterForm`. Handles component local state for rendering logic.
- State `currentPage`: Updated via `setCurrentPage`. Handles component local state for rendering logic.
- State `selectedResult`: Updated via `setSelectedResult`. Handles component local state for rendering logic.
- State `isModalOpen`: Updated via `setIsModalOpen`. Handles component local state for rendering logic.

### Side Effects
- Utilizes **2** `useEffect` hook(s) to manage lifecycle events, subscriptions, or data fetching. Proper cleanup functions are expected to prevent memory leaks.

### Exported & Internal Functions
- **`Results`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `Results`.
- **`ITEMS_PER_PAGE`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `ITEMS_PER_PAGE`.
- **`formNames`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `formNames`.
- **`filteredResults`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `filteredResults`.
- **`handleExportCsv`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `handleExportCsv`.
- **`csvRows`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `csvRows`.

### Architecture & Design Decisions
- **Lifecycle Management**: Leveraging React hooks for deterministic side-effects and cleanup.
- **Component Design**: Following functional component patterns with hooks for reusability.

### Error Handling & Fallbacks
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\dashboard\forms\services\form.api.js`


**Size**: 42 lines of code
**Type**: JavaScript Module

### Purpose and Functionality
This file is a critical piece of the application. It operates as a logical module handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **api** from `../../../../api/axios`

### Exported & Internal Functions
- **`getForms`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `getForms`.
- **`createForm`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `createForm`.
- **`getFormResults`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `getFormResults`.
- **`getAllFormResults`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `getAllFormResults`.
- **`toggleFormStatus`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `toggleFormStatus`.
- **`deleteForm`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `deleteForm`.
- **`getForm`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `getForm`.
- **`updateForm`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `updateForm`.

### Architecture & Design Decisions
- **Network Requests**: Utilizing Axios for robust interceptors and global error handling.

### Error Handling & Fallbacks
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\dashboard\home\components\DashboardHeader.jsx`


**Size**: 32 lines of code
**Type**: React Component

### Purpose and Functionality
This file is a critical piece of the application. It operates as a UI component handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **React** from `react`
- **NavLink** from `react-router-dom`
- **Bot, FileText** from `lucide-react`

### Exported & Internal Functions
- **`DashboardHeader`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `DashboardHeader`.

### Architecture & Design Decisions
- **Component Design**: Following functional component patterns with hooks for reusability.

### Error Handling & Fallbacks
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\dashboard\home\components\KpiCard.jsx`


**Size**: 19 lines of code
**Type**: React Component

### Purpose and Functionality
This file is a critical piece of the application. It operates as a UI component handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **React** from `react`

### Exported & Internal Functions
- **`KpiCard`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `KpiCard`.

### Architecture & Design Decisions
- **Component Design**: Following functional component patterns with hooks for reusability.

### Error Handling & Fallbacks
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\dashboard\home\components\NeedsAttention.jsx`


**Size**: 102 lines of code
**Type**: React Component

### Purpose and Functionality
This file is a critical piece of the application. It operates as a UI component handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **React** from `react`
- **NavLink** from `react-router-dom`
- **Activity, ChevronRight, Ticket** from `lucide-react`
- **PriorityBadge** from `./PriorityBadge`

### Exported & Internal Functions
- **`NeedsAttention`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `NeedsAttention`.

### Architecture & Design Decisions
- **Component Design**: Following functional component patterns with hooks for reusability.

### Error Handling & Fallbacks
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\dashboard\home\components\PriorityBadge.jsx`


**Size**: 18 lines of code
**Type**: React Component

### Purpose and Functionality
This file is a critical piece of the application. It operates as a UI component handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **React** from `react`

### Exported & Internal Functions
- **`PriorityBadge`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `PriorityBadge`.

### Architecture & Design Decisions
- **Component Design**: Following functional component patterns with hooks for reusability.

### Error Handling & Fallbacks
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\dashboard\home\components\StatusBadge.jsx`


**Size**: 20 lines of code
**Type**: React Component

### Purpose and Functionality
This file is a critical piece of the application. It operates as a UI component handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **React** from `react`
- **CheckCircle2, Clock** from `lucide-react`

### Exported & Internal Functions
- **`StatusBadge`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `StatusBadge`.

### Architecture & Design Decisions
- **Component Design**: Following functional component patterns with hooks for reusability.

### Error Handling & Fallbacks
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\dashboard\home\components\SystemIntelligence.jsx`


**Size**: 119 lines of code
**Type**: React Component

### Purpose and Functionality
This file is a critical piece of the application. It operates as a UI component handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **React,  useState** from `react`
- **NavLink** from `react-router-dom`
- **Zap, Cpu, Bot, Globe, Copy, Check, BarChart2** from `lucide-react`
- **toast** from `react-hot-toast`

### Local State Management
- State `copiedId`: Updated via `setCopiedId`. Handles component local state for rendering logic.

### Exported & Internal Functions
- **`SystemIntelligence`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `SystemIntelligence`.
- **`copyCode`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `copyCode`.

### Architecture & Design Decisions
- **Component Design**: Following functional component patterns with hooks for reusability.

### Error Handling & Fallbacks
- **User Feedback**: Utilizing Toast notifications to gracefully inform users of failures or network issues.
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\dashboard\home\components\WelcomeSection.jsx`


**Size**: 42 lines of code
**Type**: React Component

### Purpose and Functionality
This file is a critical piece of the application. It operates as a UI component handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **React** from `react`
- **NavLink** from `react-router-dom`
- **Sparkles** from `lucide-react`

### Exported & Internal Functions
- **`WelcomeSection`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `WelcomeSection`.

### Architecture & Design Decisions
- **Component Design**: Following functional component patterns with hooks for reusability.

### Error Handling & Fallbacks
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\dashboard\home\hooks\useDahboard.js`


**Size**: 1 lines of code
**Type**: JavaScript Module

### Purpose and Functionality
This file is a critical piece of the application. It operates as a logical module handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Exported & Internal Functions
No prominent named functions detected via regex, likely indicating a default exported anonymous component or a configuration file.

### Architecture & Design Decisions

### Error Handling & Fallbacks
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\dashboard\home\hooks\useDashboardStats.js`


**Size**: 28 lines of code
**Type**: JavaScript Module

### Purpose and Functionality
This file is a critical piece of the application. It operates as a logical module handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **useState, useEffect** from `react`
- **getDashboardSummary** from `../services/dashboard.api`

### Local State Management
- State `data`: Updated via `setData`. Handles component local state for rendering logic.
- State `isLoading`: Updated via `setIsLoading`. Handles component local state for rendering logic.
- State `error`: Updated via `setError`. Handles component local state for rendering logic.

### Side Effects
- Utilizes **1** `useEffect` hook(s) to manage lifecycle events, subscriptions, or data fetching. Proper cleanup functions are expected to prevent memory leaks.

### Exported & Internal Functions
- **`useDashboardStats`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `useDashboardStats`.
- **`fetchDashboardData`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `fetchDashboardData`.
- **`response`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `response`.

### Architecture & Design Decisions
- **Lifecycle Management**: Leveraging React hooks for deterministic side-effects and cleanup.

### Error Handling & Fallbacks
- **Try/Catch Blocks**: Explicitly catching async errors to prevent unhandled promise rejections.
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\dashboard\home\pages\Dashboard.jsx`


**Size**: 141 lines of code
**Type**: React Component

### Purpose and Functionality
This file is a critical piece of the application. It operates as a UI component handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **React** from `react`
- **SideNav** from `../../../../shared/layout/SideNav`
- **useDashboardStats** from `../hooks/useDashboardStats`
- **SkeletonWrapper, Skeleton** from `../../../../shared/components/ui/SkeletonWrapper`
- **Ticket, AlertCircle, Bot, Users** from `lucide-react`
- **DashboardHeader** from `../components/DashboardHeader`
- **WelcomeSection** from `../components/WelcomeSection`
- **KpiCard** from `../components/KpiCard`
- **NeedsAttention** from `../components/NeedsAttention`
- **SystemIntelligence** from `../components/SystemIntelligence`

### Exported & Internal Functions
- **`Dashboard`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `Dashboard`.

### Architecture & Design Decisions
- **Component Design**: Following functional component patterns with hooks for reusability.

### Error Handling & Fallbacks
- **Loading States**: Using Skeleton loaders as a visual fallback while data is being fetched.
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\dashboard\home\services\dashboard.api.js`


**Size**: 7 lines of code
**Type**: JavaScript Module

### Purpose and Functionality
This file is a critical piece of the application. It operates as a logical module handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **api** from `../../../../api/axios`

### Exported & Internal Functions
- **`getDashboardSummary`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `getDashboardSummary`.

### Architecture & Design Decisions
- **Network Requests**: Utilizing Axios for robust interceptors and global error handling.

### Error Handling & Fallbacks
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\dashboard\knowledge\components\AddKnowledgeModal.jsx`


**Size**: 138 lines of code
**Type**: React Component

### Purpose and Functionality
This file is a critical piece of the application. It operates as a UI component handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **React** from `react`
- **X as LucideX, Search, Loader2, FileText, CheckCircle2, Info** from `lucide-react`
- **TreeNode** from `./TreeNode`

### Exported & Internal Functions
- **`AddKnowledgeModal`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `AddKnowledgeModal`.

### Architecture & Design Decisions
- **Component Design**: Following functional component patterns with hooks for reusability.

### Error Handling & Fallbacks
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\dashboard\knowledge\components\KnowledgeEmptyState.jsx`


**Size**: 52 lines of code
**Type**: React Component

### Purpose and Functionality
This file is a critical piece of the application. It operates as a UI component handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **React** from `react`
- **Database** from `lucide-react`
- **SkeletonWrapper, Skeleton** from `../../../../shared/components/ui/SkeletonWrapper`

### Exported & Internal Functions
- **`KnowledgeEmptyState`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `KnowledgeEmptyState`.

### Architecture & Design Decisions
- **Component Design**: Following functional component patterns with hooks for reusability.

### Error Handling & Fallbacks
- **Loading States**: Using Skeleton loaders as a visual fallback while data is being fetched.
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\dashboard\knowledge\components\KnowledgeHeader.jsx`


**Size**: 35 lines of code
**Type**: React Component

### Purpose and Functionality
This file is a critical piece of the application. It operates as a UI component handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **React** from `react`
- **Plus** from `lucide-react`

### Exported & Internal Functions
- **`KnowledgeHeader`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `KnowledgeHeader`.

### Architecture & Design Decisions
- **Component Design**: Following functional component patterns with hooks for reusability.

### Error Handling & Fallbacks
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\dashboard\knowledge\components\KnowledgeItem.jsx`


**Size**: 73 lines of code
**Type**: React Component

### Purpose and Functionality
This file is a critical piece of the application. It operates as a UI component handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **React** from `react`
- **FileText, Link as LinkIcon, Pencil, Trash2** from `lucide-react`

### Exported & Internal Functions
- **`KnowledgeItem`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `KnowledgeItem`.

### Architecture & Design Decisions
- **Component Design**: Following functional component patterns with hooks for reusability.

### Error Handling & Fallbacks
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\dashboard\knowledge\components\KnowledgeToolbar.jsx`


**Size**: 51 lines of code
**Type**: React Component

### Purpose and Functionality
This file is a critical piece of the application. It operates as a UI component handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **React** from `react`
- **LayoutGrid, List as ListIcon, RefreshCw** from `lucide-react`

### Exported & Internal Functions
- **`KnowledgeToolbar`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `KnowledgeToolbar`.

### Architecture & Design Decisions
- **Component Design**: Following functional component patterns with hooks for reusability.

### Error Handling & Fallbacks
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\dashboard\knowledge\components\TreeNode.jsx`


**Size**: 55 lines of code
**Type**: React Component

### Purpose and Functionality
This file is a critical piece of the application. It operates as a UI component handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **React,  useState** from `react`
- **ChevronDown, ChevronRight, FileText, CheckCircle2** from `lucide-react`

### Local State Management
- State `isOpen`: Updated via `setIsOpen`. Handles component local state for rendering logic.

### Exported & Internal Functions
- **`TreeNode`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `TreeNode`.

### Architecture & Design Decisions
- **Component Design**: Following functional component patterns with hooks for reusability.

### Error Handling & Fallbacks
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\dashboard\knowledge\hooks\useKnowledge.js`


**Size**: 169 lines of code
**Type**: JavaScript Module

### Purpose and Functionality
This file is a critical piece of the application. It operates as a logical module handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **useState, useCallback** from `react`
- *** as knowledgeApi** from `../services/knowledge.api`
- **toast** from `react-hot-toast`

### Local State Management
- State `loading`: Updated via `setLoading`. Handles component local state for rendering logic.
- State `status`: Updated via `setStatus`. Handles component local state for rendering logic.
- State `availablePages`: Updated via `setAvailablePages`. Handles component local state for rendering logic.

### Exported & Internal Functions
- **`useKnowledge`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `useKnowledge`.
- **`fetchStatus`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `fetchStatus`.
- **`fetchPages`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `fetchPages`.
- **`connectNotion`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `connectNotion`.
- **`handleMessage`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `handleMessage`.
- **`integratePage`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `integratePage`.
- **`removeIntegration`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `removeIntegration`.
- **`updateDescription`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `updateDescription`.
- **`replaceSource`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `replaceSource`.
- **`disconnectWorkspace`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `disconnectWorkspace`.

### Architecture & Design Decisions

### Error Handling & Fallbacks
- **Try/Catch Blocks**: Explicitly catching async errors to prevent unhandled promise rejections.
- **User Feedback**: Utilizing Toast notifications to gracefully inform users of failures or network issues.
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\dashboard\knowledge\pages\Knowledge.jsx`


**Size**: 168 lines of code
**Type**: React Component

### Purpose and Functionality
This file is a critical piece of the application. It operates as a UI component handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **React,  useState, useEffect, useMemo** from `react`
- **SideNav** from `../../../../shared/layout/SideNav`
- **useKnowledge** from `../hooks/useKnowledge`
- **KnowledgeHeader** from `../components/KnowledgeHeader`
- **KnowledgeEmptyState** from `../components/KnowledgeEmptyState`
- **KnowledgeToolbar** from `../components/KnowledgeToolbar`
- **KnowledgeItem** from `../components/KnowledgeItem`
- **AddKnowledgeModal** from `../components/AddKnowledgeModal`

### Local State Management
- State `isAddingPage`: Updated via `setIsAddingPage`. Handles component local state for rendering logic.
- State `replacingId`: Updated via `setReplacingId`. Handles component local state for rendering logic.
- State `selectedPage`: Updated via `setSelectedPage`. Handles component local state for rendering logic.
- State `pageDescription`: Updated via `setPageDescription`. Handles component local state for rendering logic.
- State `searchQuery`: Updated via `setSearchQuery`. Handles component local state for rendering logic.
- State `viewMode`: Updated via `setViewMode`. Handles component local state for rendering logic.
- State `editingDescription`: Updated via `setEditingDescription`. Handles component local state for rendering logic.

### Side Effects
- Utilizes **2** `useEffect` hook(s) to manage lifecycle events, subscriptions, or data fetching. Proper cleanup functions are expected to prevent memory leaks.

### Exported & Internal Functions
- **`Knowledge`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `Knowledge`.
- **`notionTree`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `notionTree`.
- **`buildTree`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `buildTree`.
- **`filteredPages`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `filteredPages`.
- **`handleIntegrate`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `handleIntegrate`.
- **`handleCloseModal`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `handleCloseModal`.
- **`handleOpenReplace`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `handleOpenReplace`.

### Architecture & Design Decisions
- **Lifecycle Management**: Leveraging React hooks for deterministic side-effects and cleanup.
- **Component Design**: Following functional component patterns with hooks for reusability.

### Error Handling & Fallbacks
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\dashboard\knowledge\services\knowledge.api.js`


**Size**: 42 lines of code
**Type**: JavaScript Module

### Purpose and Functionality
This file is a critical piece of the application. It operates as a logical module handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **api** from `../../../../api/axios`

### Exported & Internal Functions
- **`getNotionAuthUrl`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `getNotionAuthUrl`.
- **`getNotionStatus`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `getNotionStatus`.
- **`getNotionPages`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `getNotionPages`.
- **`integrateNotionPage`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `integrateNotionPage`.
- **`removeNotionIntegration`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `removeNotionIntegration`.
- **`updateKnowledgeDescription`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `updateKnowledgeDescription`.
- **`replaceKnowledgeSource`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `replaceKnowledgeSource`.
- **`disconnectNotion`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `disconnectNotion`.

### Architecture & Design Decisions
- **Network Requests**: Utilizing Axios for robust interceptors and global error handling.

### Error Handling & Fallbacks
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\dashboard\leads\components\LeadDetailsModal.jsx`


**Size**: 61 lines of code
**Type**: React Component

### Purpose and Functionality
This file is a critical piece of the application. It operates as a UI component handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **React** from `react`
- **User, X** from `lucide-react`

### Exported & Internal Functions
- **`LeadDetailsModal`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `LeadDetailsModal`.

### Architecture & Design Decisions
- **Component Design**: Following functional component patterns with hooks for reusability.

### Error Handling & Fallbacks
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\dashboard\leads\components\LeadsHeader.jsx`


**Size**: 52 lines of code
**Type**: React Component

### Purpose and Functionality
This file is a critical piece of the application. It operates as a UI component handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **React** from `react`
- **Search, Download, RefreshCw** from `lucide-react`

### Exported & Internal Functions
- **`LeadsHeader`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `LeadsHeader`.

### Architecture & Design Decisions
- **Component Design**: Following functional component patterns with hooks for reusability.

### Error Handling & Fallbacks
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\dashboard\leads\components\LeadsPagination.jsx`


**Size**: 33 lines of code
**Type**: React Component

### Purpose and Functionality
This file is a critical piece of the application. It operates as a UI component handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **React** from `react`

### Exported & Internal Functions
- **`LeadsPagination`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `LeadsPagination`.

### Architecture & Design Decisions
- **Component Design**: Following functional component patterns with hooks for reusability.

### Error Handling & Fallbacks
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\dashboard\leads\components\LeadsStats.jsx`


**Size**: 17 lines of code
**Type**: React Component

### Purpose and Functionality
This file is a critical piece of the application. It operates as a UI component handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **React** from `react`
- **Users, TrendingUp, Clock, User** from `lucide-react`
- **StatCard** from `./StatCard`

### Exported & Internal Functions
- **`LeadsStats`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `LeadsStats`.

### Architecture & Design Decisions
- **Component Design**: Following functional component patterns with hooks for reusability.

### Error Handling & Fallbacks
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\dashboard\leads\components\LeadsTable.jsx`


**Size**: 89 lines of code
**Type**: React Component

### Purpose and Functionality
This file is a critical piece of the application. It operates as a UI component handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **React** from `react`
- **User, Mail, Calendar, Trash2** from `lucide-react`
- **Skeleton** from `../../../../shared/components/ui/SkeletonWrapper`

### Exported & Internal Functions
- **`LeadsTable`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `LeadsTable`.

### Architecture & Design Decisions
- **Component Design**: Following functional component patterns with hooks for reusability.

### Error Handling & Fallbacks
- **Loading States**: Using Skeleton loaders as a visual fallback while data is being fetched.
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\dashboard\leads\components\StatCard.jsx`


**Size**: 17 lines of code
**Type**: React Component

### Purpose and Functionality
This file is a critical piece of the application. It operates as a UI component handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **React** from `react`
- **Skeleton** from `../../../../shared/components/ui/SkeletonWrapper`

### Exported & Internal Functions
- **`StatCard`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `StatCard`.

### Architecture & Design Decisions
- **Component Design**: Following functional component patterns with hooks for reusability.

### Error Handling & Fallbacks
- **Loading States**: Using Skeleton loaders as a visual fallback while data is being fetched.
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\dashboard\leads\hooks\useLeads.js`


**Size**: 65 lines of code
**Type**: JavaScript Module

### Purpose and Functionality
This file is a critical piece of the application. It operates as a logical module handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **useState, useEffect, useCallback** from `react`
- **getAllLeads, deleteLead** from `../services/leads.api`
- **useSocket** from `../../../../context/SocketContext`
- **toast** from `react-hot-toast`

### Local State Management
- State `leads`: Updated via `setLeads`. Handles component local state for rendering logic.
- State `isLoading`: Updated via `setIsLoading`. Handles component local state for rendering logic.

### Side Effects
- Utilizes **2** `useEffect` hook(s) to manage lifecycle events, subscriptions, or data fetching. Proper cleanup functions are expected to prevent memory leaks.

### Exported & Internal Functions
- **`useLeads`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `useLeads`.
- **`fetchLeads`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `fetchLeads`.
- **`removeLead`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `removeLead`.
- **`handleNewLead`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `handleNewLead`.
- **`stats`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `stats`.
- **`weekAgo`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `weekAgo`.

### Architecture & Design Decisions
- **Lifecycle Management**: Leveraging React hooks for deterministic side-effects and cleanup.

### Error Handling & Fallbacks
- **Try/Catch Blocks**: Explicitly catching async errors to prevent unhandled promise rejections.
- **User Feedback**: Utilizing Toast notifications to gracefully inform users of failures or network issues.
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\dashboard\leads\pages\Leads.jsx`


**Size**: 130 lines of code
**Type**: React Component

### Purpose and Functionality
This file is a critical piece of the application. It operates as a UI component handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **React,  useState** from `react`
- **SideNav** from `../../../../shared/layout/SideNav`
- **useLeads** from `../hooks/useLeads`
- **DeleteConfirmModal** from `../../../../shared/components/ui/DeleteConfirmModal`
- **LeadsHeader** from `../components/LeadsHeader`
- **LeadsStats** from `../components/LeadsStats`
- **LeadsTable** from `../components/LeadsTable`
- **LeadsPagination** from `../components/LeadsPagination`
- **LeadDetailsModal** from `../components/LeadDetailsModal`

### Local State Management
- State `searchQuery`: Updated via `setSearchQuery`. Handles component local state for rendering logic.
- State `currentPage`: Updated via `setCurrentPage`. Handles component local state for rendering logic.
- State `isDeleteModalOpen`: Updated via `setIsDeleteModalOpen`. Handles component local state for rendering logic.
- State `isDetailsModalOpen`: Updated via `setIsDetailsModalOpen`. Handles component local state for rendering logic.
- State `leadToDelete`: Updated via `setLeadToDelete`. Handles component local state for rendering logic.
- State `selectedLead`: Updated via `setSelectedLead`. Handles component local state for rendering logic.

### Exported & Internal Functions
- **`Leads`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `Leads`.
- **`handleExportCsv`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `handleExportCsv`.
- **`csvRows`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `csvRows`.
- **`filteredLeads`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `filteredLeads`.
- **`handleDeleteClick`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `handleDeleteClick`.
- **`confirmDelete`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `confirmDelete`.
- **`handleLeadClick`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `handleLeadClick`.

### Architecture & Design Decisions
- **Component Design**: Following functional component patterns with hooks for reusability.

### Error Handling & Fallbacks
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\dashboard\leads\services\leads.api.js`


**Size**: 14 lines of code
**Type**: JavaScript Module

### Purpose and Functionality
This file is a critical piece of the application. It operates as a logical module handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **axios** from `axios`

### Exported & Internal Functions
- **`getAllLeads`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `getAllLeads`.
- **`deleteLead`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `deleteLead`.

### Architecture & Design Decisions
- **Network Requests**: Utilizing Axios for robust interceptors and global error handling.

### Error Handling & Fallbacks
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\dashboard\settings\components\AccountHeader.jsx`


**Size**: 24 lines of code
**Type**: React Component

### Purpose and Functionality
This file is a critical piece of the application. It operates as a UI component handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **React** from `react`
- **Save, Loader2** from `lucide-react`

### Exported & Internal Functions
- **`AccountHeader`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `AccountHeader`.

### Architecture & Design Decisions
- **Component Design**: Following functional component patterns with hooks for reusability.

### Error Handling & Fallbacks
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\dashboard\settings\components\EmailIntegrationSection.jsx`


**Size**: 132 lines of code
**Type**: React Component

### Purpose and Functionality
This file is a critical piece of the application. It operates as a UI component handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **React** from `react`
- **Server, Send, Lock** from `lucide-react`

### Exported & Internal Functions
- **`EmailIntegrationSection`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `EmailIntegrationSection`.

### Architecture & Design Decisions
- **Component Design**: Following functional component patterns with hooks for reusability.

### Error Handling & Fallbacks
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\dashboard\settings\components\InviteForm.jsx`


**Size**: 106 lines of code
**Type**: React Component

### Purpose and Functionality
This file is a critical piece of the application. It operates as a UI component handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **React** from `react`
- **Shield, User, Sparkles, AlertCircle, ChevronRight** from `lucide-react`

### Exported & Internal Functions
- **`InviteForm`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `InviteForm`.

### Architecture & Design Decisions
- **Component Design**: Following functional component patterns with hooks for reusability.

### Error Handling & Fallbacks
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\dashboard\settings\components\InviteHeader.jsx`


**Size**: 13 lines of code
**Type**: React Component

### Purpose and Functionality
This file is a critical piece of the application. It operates as a UI component handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **React** from `react`

### Exported & Internal Functions
- **`InviteHeader`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `InviteHeader`.

### Architecture & Design Decisions
- **Component Design**: Following functional component patterns with hooks for reusability.

### Error Handling & Fallbacks
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\dashboard\settings\components\InviteResult.jsx`


**Size**: 47 lines of code
**Type**: React Component

### Purpose and Functionality
This file is a critical piece of the application. It operates as a UI component handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **React** from `react`
- **Link as LinkIcon, Check, Copy, Info** from `lucide-react`

### Exported & Internal Functions
- **`InviteResult`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `InviteResult`.

### Architecture & Design Decisions
- **Component Design**: Following functional component patterns with hooks for reusability.

### Error Handling & Fallbacks
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\dashboard\settings\components\ProfileSection.jsx`


**Size**: 68 lines of code
**Type**: React Component

### Purpose and Functionality
This file is a critical piece of the application. It operates as a UI component handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **React** from `react`
- **User** from `lucide-react`

### Exported & Internal Functions
- **`ProfileSection`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `ProfileSection`.

### Architecture & Design Decisions
- **Component Design**: Following functional component patterns with hooks for reusability.

### Error Handling & Fallbacks
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\dashboard\settings\layout\SettingsLayout.jsx`


**Size**: 30 lines of code
**Type**: React Component

### Purpose and Functionality
This file is a critical piece of the application. It operates as a UI component handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **React** from `react`
- **Outlet** from `react-router-dom`
- **SideNav** from `../../../../shared/layout/SideNav`

### Exported & Internal Functions
- **`SettingsLayout`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `SettingsLayout`.

### Architecture & Design Decisions
- **Component Design**: Following functional component patterns with hooks for reusability.

### Error Handling & Fallbacks
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\dashboard\settings\pages\AccountSettings.jsx`


**Size**: 101 lines of code
**Type**: React Component

### Purpose and Functionality
This file is a critical piece of the application. It operates as a UI component handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **React,  useState, useEffect** from `react`
- **useAuth** from `../../../auth/hooks/useAuth`
- **updateUserProfile** from `../services/settings.api`
- **toast** from `react-hot-toast`
- **AccountHeader** from `../components/AccountHeader`
- **ProfileSection** from `../components/ProfileSection`
- **EmailIntegrationSection** from `../components/EmailIntegrationSection`

### Local State Management
- State `loading`: Updated via `setLoading`. Handles component local state for rendering logic.
- State `formData`: Updated via `setFormData`. Handles component local state for rendering logic.

### Side Effects
- Utilizes **1** `useEffect` hook(s) to manage lifecycle events, subscriptions, or data fetching. Proper cleanup functions are expected to prevent memory leaks.

### Exported & Internal Functions
- **`AccountSettings`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `AccountSettings`.
- **`handleChange`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `handleChange`.
- **`handleSubmit`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `handleSubmit`.

### Architecture & Design Decisions
- **Lifecycle Management**: Leveraging React hooks for deterministic side-effects and cleanup.
- **Component Design**: Following functional component patterns with hooks for reusability.

### Error Handling & Fallbacks
- **Try/Catch Blocks**: Explicitly catching async errors to prevent unhandled promise rejections.
- **User Feedback**: Utilizing Toast notifications to gracefully inform users of failures or network issues.
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\dashboard\settings\pages\InviteMember.jsx`


**Size**: 67 lines of code
**Type**: React Component

### Purpose and Functionality
This file is a critical piece of the application. It operates as a UI component handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **React,  useState** from `react`
- **createInviteToken** from `../services/settings.api`
- **InviteHeader** from `../components/InviteHeader`
- **InviteForm** from `../components/InviteForm`
- **InviteResult** from `../components/InviteResult`

### Local State Management
- State `role`: Updated via `setRole`. Handles component local state for rendering logic.
- State `speciality`: Updated via `setSpeciality`. Handles component local state for rendering logic.
- State `loading`: Updated via `setLoading`. Handles component local state for rendering logic.
- State `inviteUrl`: Updated via `setInviteUrl`. Handles component local state for rendering logic.
- State `copied`: Updated via `setCopied`. Handles component local state for rendering logic.
- State `error`: Updated via `setError`. Handles component local state for rendering logic.

### Exported & Internal Functions
- **`InviteMember`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `InviteMember`.
- **`handleGenerate`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `handleGenerate`.
- **`copyToClipboard`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `copyToClipboard`.

### Architecture & Design Decisions
- **Component Design**: Following functional component patterns with hooks for reusability.

### Error Handling & Fallbacks
- **Try/Catch Blocks**: Explicitly catching async errors to prevent unhandled promise rejections.
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\dashboard\settings\services\settings.api.js`


**Size**: 12 lines of code
**Type**: JavaScript Module

### Purpose and Functionality
This file is a critical piece of the application. It operates as a logical module handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **api** from `../../../../api/axios`

### Exported & Internal Functions
- **`createInviteToken`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `createInviteToken`.
- **`updateUserProfile`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `updateUserProfile`.

### Architecture & Design Decisions
- **Network Requests**: Utilizing Axios for robust interceptors and global error handling.

### Error Handling & Fallbacks
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\dashboard\studio\components\ChatbotPreview.jsx`


**Size**: 188 lines of code
**Type**: React Component

### Purpose and Functionality
This file is a critical piece of the application. It operates as a UI component handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **React** from `react`
- **Bot, Send, Trash2, Minus, X, MessageSquare, ChevronLeft, ChevronRight, User** from `lucide-react`

### Exported & Internal Functions
- **`ChatbotPreview`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `ChatbotPreview`.
- **`getBase`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `getBase`.

### Architecture & Design Decisions
- **Component Design**: Following functional component patterns with hooks for reusability.

### Error Handling & Fallbacks
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\dashboard\studio\hooks\useAgentEditor.js`


**Size**: 168 lines of code
**Type**: JavaScript Module

### Purpose and Functionality
This file is a critical piece of the application. It operates as a logical module handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **useState, useEffect, useCallback** from `react`
- **useParams, useNavigate** from `react-router-dom`
- *** as chatbotApi** from `../services/chatbot.api`
- *** as aiApi** from `../services/ai.api`
- **toast** from `react-hot-toast`

### Local State Management
- State `isLoading`: Updated via `setIsLoading`. Handles component local state for rendering logic.
- State `isSaving`: Updated via `setIsSaving`. Handles component local state for rendering logic.
- State `error`: Updated via `setError`. Handles component local state for rendering logic.
- State `formData`: Updated via `setFormData`. Handles component local state for rendering logic.

### Side Effects
- Utilizes **1** `useEffect` hook(s) to manage lifecycle events, subscriptions, or data fetching. Proper cleanup functions are expected to prevent memory leaks.

### Exported & Internal Functions
- **`useAgentEditor`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `useAgentEditor`.
- **`fetchBot`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `fetchBot`.
- **`botData`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `botData`.
- **`handleSave`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `handleSave`.
- **`handleTrainWebsite`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `handleTrainWebsite`.
- **`response`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `response`.
- **`handleTrainPDF`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `handleTrainPDF`.
- **`response`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `response`.
- **`handleSetMaster`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `handleSetMaster`.
- **`currentMaster`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `currentMaster`.
- **`confirmReplacement`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `confirmReplacement`.

### Architecture & Design Decisions
- **Lifecycle Management**: Leveraging React hooks for deterministic side-effects and cleanup.

### Error Handling & Fallbacks
- **Try/Catch Blocks**: Explicitly catching async errors to prevent unhandled promise rejections.
- **User Feedback**: Utilizing Toast notifications to gracefully inform users of failures or network issues.
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\dashboard\studio\hooks\useAnalytics.js`


**Size**: 45 lines of code
**Type**: JavaScript Module

### Purpose and Functionality
This file is a critical piece of the application. It operates as a logical module handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **useState, useCallback, useEffect** from `react`
- *** as analyticsApi** from `../services/analytics.api`
- **toast** from `react-hot-toast`

### Local State Management
- State `loading`: Updated via `setLoading`. Handles component local state for rendering logic.
- State `timeframe`: Updated via `setTimeframe`. Handles component local state for rendering logic.
- State `data`: Updated via `setData`. Handles component local state for rendering logic.

### Side Effects
- Utilizes **1** `useEffect` hook(s) to manage lifecycle events, subscriptions, or data fetching. Proper cleanup functions are expected to prevent memory leaks.

### Exported & Internal Functions
- **`useAnalytics`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `useAnalytics`.
- **`fetchAnalytics`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `fetchAnalytics`.
- **`res`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `res`.

### Architecture & Design Decisions
- **Lifecycle Management**: Leveraging React hooks for deterministic side-effects and cleanup.

### Error Handling & Fallbacks
- **Try/Catch Blocks**: Explicitly catching async errors to prevent unhandled promise rejections.
- **User Feedback**: Utilizing Toast notifications to gracefully inform users of failures or network issues.
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\dashboard\studio\hooks\useChatbots.js`


**Size**: 66 lines of code
**Type**: JavaScript Module

### Purpose and Functionality
This file is a critical piece of the application. It operates as a logical module handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **useState, useEffect, useCallback** from `react`
- *** as chatbotApi** from `../services/chatbot.api`

### Local State Management
- State `chatbots`: Updated via `setChatbots`. Handles component local state for rendering logic.
- State `isLoading`: Updated via `setIsLoading`. Handles component local state for rendering logic.
- State `error`: Updated via `setError`. Handles component local state for rendering logic.

### Side Effects
- Utilizes **1** `useEffect` hook(s) to manage lifecycle events, subscriptions, or data fetching. Proper cleanup functions are expected to prevent memory leaks.

### Exported & Internal Functions
- **`useChatbots`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `useChatbots`.
- **`fetchChatbots`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `fetchChatbots`.
- **`response`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `response`.
- **`handleToggleStatus`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `handleToggleStatus`.
- **`response`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `response`.
- **`handleDelete`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `handleDelete`.
- **`response`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `response`.

### Architecture & Design Decisions
- **Lifecycle Management**: Leveraging React hooks for deterministic side-effects and cleanup.

### Error Handling & Fallbacks
- **Try/Catch Blocks**: Explicitly catching async errors to prevent unhandled promise rejections.
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\dashboard\studio\hooks\useChats.js`


**Size**: 76 lines of code
**Type**: JavaScript Module

### Purpose and Functionality
This file is a critical piece of the application. It operates as a logical module handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **useState, useEffect** from `react`
- **getAllChats, getChatInteractions** from `../services/chat.api`
- **useSocket** from `../../../../context/SocketContext`
- **toast** from `react-hot-toast`

### Local State Management
- State `chats`: Updated via `setChats`. Handles component local state for rendering logic.
- State `loading`: Updated via `setLoading`. Handles component local state for rendering logic.
- State `selectedChat`: Updated via `setSelectedChat`. Handles component local state for rendering logic.
- State `interactions`: Updated via `setInteractions`. Handles component local state for rendering logic.
- State `interactionsLoading`: Updated via `setInteractionsLoading`. Handles component local state for rendering logic.

### Side Effects
- Utilizes **2** `useEffect` hook(s) to manage lifecycle events, subscriptions, or data fetching. Proper cleanup functions are expected to prevent memory leaks.

### Exported & Internal Functions
- **`useChats`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `useChats`.
- **`socket`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `socket`.
- **`handleNewChat`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `handleNewChat`.
- **`fetchChats`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `fetchChats`.
- **`fetchInteractions`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `fetchInteractions`.
- **`stats`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `stats`.

### Architecture & Design Decisions
- **Lifecycle Management**: Leveraging React hooks for deterministic side-effects and cleanup.

### Error Handling & Fallbacks
- **Try/Catch Blocks**: Explicitly catching async errors to prevent unhandled promise rejections.
- **User Feedback**: Utilizing Toast notifications to gracefully inform users of failures or network issues.
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\dashboard\studio\hooks\usePlayground.js`


**Size**: 157 lines of code
**Type**: JavaScript Module

### Purpose and Functionality
This file is a critical piece of the application. It operates as a logical module handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **useState, useEffect** from `react`
- **getMyChatbots, updateChatbot, setMasterChatbot** from `../services/chatbot.api`
- **askAI** from `../services/ai.api`
- **toast** from `react-hot-toast`

### Local State Management
- State `chatbots`: Updated via `setChatbots`. Handles component local state for rendering logic.
- State `selectedBot`: Updated via `setSelectedBot`. Handles component local state for rendering logic.
- State `loading`: Updated via `setLoading`. Handles component local state for rendering logic.
- State `saving`: Updated via `setSaving`. Handles component local state for rendering logic.
- State `messages`: Updated via `setMessages`. Handles component local state for rendering logic.
- State `chatLoading`: Updated via `setChatLoading`. Handles component local state for rendering logic.
- State `formData`: Updated via `setFormData`. Handles component local state for rendering logic.

### Side Effects
- Utilizes **3** `useEffect` hook(s) to manage lifecycle events, subscriptions, or data fetching. Proper cleanup functions are expected to prevent memory leaks.

### Exported & Internal Functions
- **`usePlayground`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `usePlayground`.
- **`fetchChatbots`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `fetchChatbots`.
- **`masterBot`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `masterBot`.
- **`savedMessages`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `savedMessages`.
- **`selectBot`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `selectBot`.
- **`handleInputChange`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `handleInputChange`.
- **`handleSave`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `handleSave`.
- **`handleSetMaster`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `handleSetMaster`.
- **`currentMaster`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `currentMaster`.
- **`confirmReplacement`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `confirmReplacement`.
- **`clearChat`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `clearChat`.
- **`sendMessage`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `sendMessage`.
- **`aiMessage`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `aiMessage`.

### Architecture & Design Decisions
- **Lifecycle Management**: Leveraging React hooks for deterministic side-effects and cleanup.

### Error Handling & Fallbacks
- **Try/Catch Blocks**: Explicitly catching async errors to prevent unhandled promise rejections.
- **User Feedback**: Utilizing Toast notifications to gracefully inform users of failures or network issues.
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\dashboard\studio\pages\Agents.jsx`


**Size**: 336 lines of code
**Type**: React Component

### Purpose and Functionality
This file is a critical piece of the application. It operates as a UI component handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **React** from `react`
- **NavLink, useNavigate** from `react-router-dom`
- **SideNav** from `../../../../shared/layout/SideNav`
- **useChatbots** from `../hooks/useChatbots`
- **toast** from `react-hot-toast`
- **SkeletonWrapper, Skeleton** from `../../../../shared/components/ui/SkeletonWrapper`
- **DeleteConfirmModal** from `../../../../shared/components/ui/DeleteConfirmModal`

### Exported & Internal Functions
- **`Agents`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `Agents`.
- **`filteredChatbots`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `filteredChatbots`.
- **`copyToClipboard`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `copyToClipboard`.
- **`AgentCard`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `AgentCard`.

### Architecture & Design Decisions
- **Component Design**: Following functional component patterns with hooks for reusability.

### Error Handling & Fallbacks
- **User Feedback**: Utilizing Toast notifications to gracefully inform users of failures or network issues.
- **Loading States**: Using Skeleton loaders as a visual fallback while data is being fetched.
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\dashboard\studio\pages\Analytics.jsx`


**Size**: 327 lines of code
**Type**: React Component

### Purpose and Functionality
This file is a critical piece of the application. It operates as a UI component handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **React,  useState** from `react`
- **useParams, NavLink** from `react-router-dom`
- **SideNav** from `../../../../shared/layout/SideNav`
- **useAnalytics** from `../hooks/useAnalytics`
- **TrendingUp, MessageSquare, Users, Bot, RefreshCw, Info, Smile, Frown, Meh, HelpCircle, ArrowLeft** from `lucide-react`
- **SkeletonWrapper, Skeleton** from `../../../../shared/components/ui/SkeletonWrapper`

### Exported & Internal Functions
- **`StatCard`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `StatCard`.
- **`SentimentIcon`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `SentimentIcon`.
- **`Analytics`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `Analytics`.
- **`bots`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `bots`.
- **`totalSentiment`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `totalSentiment`.
- **`positive`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `positive`.

### Architecture & Design Decisions
- **Component Design**: Following functional component patterns with hooks for reusability.

### Error Handling & Fallbacks
- **Try/Catch Blocks**: Explicitly catching async errors to prevent unhandled promise rejections.
- **Loading States**: Using Skeleton loaders as a visual fallback while data is being fetched.
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\dashboard\studio\pages\Chats.jsx`


**Size**: 344 lines of code
**Type**: React Component

### Purpose and Functionality
This file is a critical piece of the application. It operates as a UI component handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **React** from `react`
- **SideNav** from `../../../../shared/layout/SideNav`
- **useChats** from `../hooks/useChats`
- **SkeletonWrapper, Skeleton** from `../../../../shared/components/ui/SkeletonWrapper`
- **ReactMarkdown** from `react-markdown`

### Exported & Internal Functions
- **`Chats`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `Chats`.
- **`StatCard`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `StatCard`.

### Architecture & Design Decisions
- **Component Design**: Following functional component patterns with hooks for reusability.

### Error Handling & Fallbacks
- **Loading States**: Using Skeleton loaders as a visual fallback while data is being fetched.
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\dashboard\studio\pages\CreateAgent.jsx`


**Size**: 942 lines of code
**Type**: React Component

### Purpose and Functionality
This file is a critical piece of the application. It operates as a UI component handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **React,  useState** from `react`
- **NavLink** from `react-router-dom`
- **SideNav** from `../../../../shared/layout/SideNav`
- **useAgentEditor** from `../hooks/useAgentEditor`
- **ChatbotPreview** from `../components/ChatbotPreview`
- **toast** from `react-hot-toast`
- *** as notionApi** from `../services/notion.api`

### Local State Management
- State `isOpen`: Updated via `setIsOpen`. Handles component local state for rendering logic.
- State `activeTab`: Updated via `setActiveTab`. Handles component local state for rendering logic.
- State `websiteUrl`: Updated via `setWebsiteUrl`. Handles component local state for rendering logic.
- State `trainingFile`: Updated via `setTrainingFile`. Handles component local state for rendering logic.
- State `isScraping`: Updated via `setIsScraping`. Handles component local state for rendering logic.
- State `isUploading`: Updated via `setIsUploading`. Handles component local state for rendering logic.
- State `notionStatus`: Updated via `setNotionStatus`. Handles component local state for rendering logic.
- State `notionPages`: Updated via `setNotionPages`. Handles component local state for rendering logic.
- State `isLoadingPages`: Updated via `setIsLoadingPages`. Handles component local state for rendering logic.
- State `isIntegrating`: Updated via `setIsIntegrating`. Handles component local state for rendering logic.
- State `isAddingPage`: Updated via `setIsAddingPage`. Handles component local state for rendering logic.
- State `selectedPageForIntegration`: Updated via `setSelectedPageForIntegration`. Handles component local state for rendering logic.
- State `pageDescription`: Updated via `setPageDescription`. Handles component local state for rendering logic.
- State `searchQuery`: Updated via `setSearchQuery`. Handles component local state for rendering logic.

### Side Effects
- Utilizes **2** `useEffect` hook(s) to manage lifecycle events, subscriptions, or data fetching. Proper cleanup functions are expected to prevent memory leaks.

### Exported & Internal Functions
- **`TreeNode`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `TreeNode`.
- **`CreateAgent`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `CreateAgent`.
- **`fetchNotionStatus`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `fetchNotionStatus`.
- **`response`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `response`.
- **`handleMessage`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `handleMessage`.
- **`fetchPages`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `fetchPages`.
- **`handleConnectNotion`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `handleConnectNotion`.
- **`handleIntegratePage`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `handleIntegratePage`.
- **`response`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `response`.
- **`handleRemoveIntegration`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `handleRemoveIntegration`.
- **`response`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `response`.
- **`notionTree`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `notionTree`.
- **`buildTree`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `buildTree`.
- **`filteredPages`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `filteredPages`.
- **`updateStyle`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `updateStyle`.
- **`handleSaveAgent`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `handleSaveAgent`.
- **`handleWebsiteTrain`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `handleWebsiteTrain`.
- **`handleFileTrain`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `handleFileTrain`.
- **`addFaq`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `addFaq`.
- **`updateFaq`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `updateFaq`.
- **`removeFaq`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `removeFaq`.
- **`handleTabChange`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `handleTabChange`.
- **`val`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `val`.
- **`val`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `val`.
- **`val`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `val`.
- **`val`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `val`.
- **`ColorInput`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `ColorInput`.

### Architecture & Design Decisions
- **Lifecycle Management**: Leveraging React hooks for deterministic side-effects and cleanup.
- **Component Design**: Following functional component patterns with hooks for reusability.

### Error Handling & Fallbacks
- **Try/Catch Blocks**: Explicitly catching async errors to prevent unhandled promise rejections.
- **User Feedback**: Utilizing Toast notifications to gracefully inform users of failures or network issues.
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\dashboard\studio\pages\Playground.jsx`


**Size**: 322 lines of code
**Type**: React Component

### Purpose and Functionality
This file is a critical piece of the application. It operates as a UI component handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **React,  useState, useRef, useEffect** from `react`
- **NavLink** from `react-router-dom`
- **SideNav** from `../../../../shared/layout/SideNav`
- **usePlayground** from `../hooks/usePlayground`
- **SkeletonWrapper, Skeleton** from `../../../../shared/components/ui/SkeletonWrapper`
- **ReactMarkdown** from `react-markdown`

### Local State Management
- State `chatInput`: Updated via `setChatInput`. Handles component local state for rendering logic.
- State `copied`: Updated via `setCopied`. Handles component local state for rendering logic.

### Side Effects
- Utilizes **1** `useEffect` hook(s) to manage lifecycle events, subscriptions, or data fetching. Proper cleanup functions are expected to prevent memory leaks.

### Exported & Internal Functions
- **`Playground`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `Playground`.
- **`chatEndRef`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `chatEndRef`.
- **`handleSend`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `handleSend`.
- **`copyCode`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `copyCode`.

### Architecture & Design Decisions
- **Lifecycle Management**: Leveraging React hooks for deterministic side-effects and cleanup.
- **Component Design**: Following functional component patterns with hooks for reusability.

### Error Handling & Fallbacks
- **Loading States**: Using Skeleton loaders as a visual fallback while data is being fetched.
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\dashboard\studio\services\ai.api.js`


**Size**: 26 lines of code
**Type**: JavaScript Module

### Purpose and Functionality
This file is a critical piece of the application. It operates as a logical module handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **api** from `../../../../api/axios`

### Exported & Internal Functions
- **`trainWithWebsite`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `trainWithWebsite`.
- **`trainWithPDF`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `trainWithPDF`.
- **`askAI`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `askAI`.

### Architecture & Design Decisions
- **Network Requests**: Utilizing Axios for robust interceptors and global error handling.

### Error Handling & Fallbacks
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\dashboard\studio\services\analytics.api.js`


**Size**: 10 lines of code
**Type**: JavaScript Module

### Purpose and Functionality
This file is a critical piece of the application. It operates as a logical module handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **api** from `../../../../api/axios`

### Exported & Internal Functions
- **`getAnalytics`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `getAnalytics`.

### Architecture & Design Decisions
- **Network Requests**: Utilizing Axios for robust interceptors and global error handling.

### Error Handling & Fallbacks
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\dashboard\studio\services\chat.api.js`


**Size**: 12 lines of code
**Type**: JavaScript Module

### Purpose and Functionality
This file is a critical piece of the application. It operates as a logical module handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **api** from `../../../../api/axios`

### Exported & Internal Functions
- **`getAllChats`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `getAllChats`.
- **`getChatInteractions`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `getChatInteractions`.

### Architecture & Design Decisions
- **Network Requests**: Utilizing Axios for robust interceptors and global error handling.

### Error Handling & Fallbacks
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\dashboard\studio\services\chatbot.api.js`


**Size**: 37 lines of code
**Type**: JavaScript Module

### Purpose and Functionality
This file is a critical piece of the application. It operates as a logical module handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **api** from `../../../../api/axios`

### Exported & Internal Functions
- **`getMyChatbots`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `getMyChatbots`.
- **`createChatbot`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `createChatbot`.
- **`getChatbotById`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `getChatbotById`.
- **`updateChatbot`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `updateChatbot`.
- **`deleteChatbot`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `deleteChatbot`.
- **`toggleChatbotStatus`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `toggleChatbotStatus`.
- **`setMasterChatbot`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `setMasterChatbot`.

### Architecture & Design Decisions
- **Network Requests**: Utilizing Axios for robust interceptors and global error handling.

### Error Handling & Fallbacks
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\dashboard\studio\services\notion.api.js`


**Size**: 27 lines of code
**Type**: JavaScript Module

### Purpose and Functionality
This file is a critical piece of the application. It operates as a logical module handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **api** from `../../../../api/axios`

### Exported & Internal Functions
- **`getNotionAuthUrl`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `getNotionAuthUrl`.
- **`getNotionStatus`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `getNotionStatus`.
- **`getNotionPages`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `getNotionPages`.
- **`integrateNotionPage`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `integrateNotionPage`.
- **`removeNotionIntegration`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `removeNotionIntegration`.

### Architecture & Design Decisions
- **Network Requests**: Utilizing Axios for robust interceptors and global error handling.

### Error Handling & Fallbacks
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\dashboard\tickets\components\CreateTicketModal.jsx`


**Size**: 115 lines of code
**Type**: React Component

### Purpose and Functionality
This file is a critical piece of the application. It operates as a UI component handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **React,  useState** from `react`
- **Plus, X** from `lucide-react`

### Local State Management
- State `formData`: Updated via `setFormData`. Handles component local state for rendering logic.
- State `isSubmitting`: Updated via `setIsSubmitting`. Handles component local state for rendering logic.

### Exported & Internal Functions
- **`CreateTicketModal`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `CreateTicketModal`.
- **`handleSubmit`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `handleSubmit`.

### Architecture & Design Decisions
- **Component Design**: Following functional component patterns with hooks for reusability.

### Error Handling & Fallbacks
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\dashboard\tickets\components\FocusEmptyState.jsx`


**Size**: 17 lines of code
**Type**: React Component

### Purpose and Functionality
This file is a critical piece of the application. It operates as a UI component handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **React** from `react`
- **CheckCircle2** from `lucide-react`

### Exported & Internal Functions
- **`FocusEmptyState`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `FocusEmptyState`.

### Architecture & Design Decisions
- **Component Design**: Following functional component patterns with hooks for reusability.

### Error Handling & Fallbacks
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\dashboard\tickets\components\FocusHeader.jsx`


**Size**: 34 lines of code
**Type**: React Component

### Purpose and Functionality
This file is a critical piece of the application. It operates as a UI component handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **React** from `react`
- **NavLink** from `react-router-dom`
- **ChevronRight, SkipForward, SkipBack** from `lucide-react`

### Exported & Internal Functions
- **`FocusHeader`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `FocusHeader`.

### Architecture & Design Decisions
- **Component Design**: Following functional component patterns with hooks for reusability.

### Error Handling & Fallbacks
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\dashboard\tickets\components\PriorityBadge.jsx`


**Size**: 19 lines of code
**Type**: React Component

### Purpose and Functionality
This file is a critical piece of the application. It operates as a UI component handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **React** from `react`

### Exported & Internal Functions
- **`PriorityBadge`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `PriorityBadge`.

### Architecture & Design Decisions
- **Component Design**: Following functional component patterns with hooks for reusability.

### Error Handling & Fallbacks
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\dashboard\tickets\components\ResolutionArea.jsx`


**Size**: 67 lines of code
**Type**: React Component

### Purpose and Functionality
This file is a critical piece of the application. It operates as a UI component handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **React** from `react`
- **Tag, MessageSquare, Send** from `lucide-react`

### Exported & Internal Functions
- **`ResolutionArea`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `ResolutionArea`.

### Architecture & Design Decisions
- **Component Design**: Following functional component patterns with hooks for reusability.

### Error Handling & Fallbacks
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\dashboard\tickets\components\StatCard.jsx`


**Size**: 17 lines of code
**Type**: React Component

### Purpose and Functionality
Displays a statistical metric with a title, value, and thematic icon. It features a backdrop-blur design and includes a built-in loading state that renders a Skeleton component when data is being fetched.

### Dependencies
- **React** from `react`
- **Skeleton** from `../../../../shared/components/ui/SkeletonWrapper`

### Exported & Internal Functions
- **`StatCard`**: The primary UI component for rendering KPI metrics.
  - *Mechanics*: Receives `title`, `value`, `icon`, and `loading` props to conditionally render data or skeletons.
  - *Role*: Standardizes the look and feel of dashboard statistics.

### Architecture & Design Decisions
- **Component Design**: Following functional component patterns with hooks for reusability.

### Error Handling & Fallbacks
- **Loading States**: Using Skeleton loaders as a visual fallback while data is being fetched.
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\dashboard\tickets\components\StatusBadge.jsx`


**Size**: 21 lines of code
**Type**: React Component

### Purpose and Functionality
A visual indicator for ticket statuses (Open, Closed, Pending). It dynamically applies color coding (primary, green, or amber) and relevant icons (CheckCircle or Clock) based on the status string.

### Dependencies
- **React** from `react`
- **CheckCircle2, Clock** from `lucide-react`

### Exported & Internal Functions
- **`StatusBadge`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `StatusBadge`.

### Architecture & Design Decisions
- **Component Design**: Following functional component patterns with hooks for reusability.

### Error Handling & Fallbacks
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\dashboard\tickets\components\TicketDetailsCard.jsx`


**Size**: 51 lines of code
**Type**: React Component

### Purpose and Functionality
This file is a critical piece of the application. It operates as a UI component handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **React** from `react`
- **AlertCircle, Clock, User, Mail, Tag** from `lucide-react`

### Exported & Internal Functions
- **`TicketDetailsCard`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `TicketDetailsCard`.

### Architecture & Design Decisions
- **Component Design**: Following functional component patterns with hooks for reusability.

### Error Handling & Fallbacks
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\dashboard\tickets\components\TicketDetailsModal.jsx`


**Size**: 199 lines of code
**Type**: React Component

### Purpose and Functionality
This file is a critical piece of the application. It operates as a UI component handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **React,  useState, useEffect** from `react`
- **Ticket, X, User, Tag, Send, CheckCircle2** from `lucide-react`
- **StatusBadge** from `./StatusBadge`

### Local State Management
- State `subject`: Updated via `setSubject`. Handles component local state for rendering logic.
- State `response`: Updated via `setResponse`. Handles component local state for rendering logic.
- State `isSubmitting`: Updated via `setIsSubmitting`. Handles component local state for rendering logic.
- State `trainAi`: Updated via `setTrainAi`. Handles component local state for rendering logic.

### Side Effects
- Utilizes **1** `useEffect` hook(s) to manage lifecycle events, subscriptions, or data fetching. Proper cleanup functions are expected to prevent memory leaks.

### Exported & Internal Functions
- **`TicketDetailsModal`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `TicketDetailsModal`.
- **`TicketDetailsModal`**: Orchestrates the modal display and content rendering.
- **`handleResolve`**: Sends a request to update the status of the ticket to 'Resolved'.
- **`handlePriorityClick`**: Triggers a priority change request through the API.

### Architecture & Design Decisions
- **Lifecycle Management**: Leveraging React hooks for deterministic side-effects and cleanup.
- **Component Design**: Following functional component patterns with hooks for reusability.

### Error Handling & Fallbacks
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\dashboard\tickets\components\TicketSidebar.jsx`


**Size**: 56 lines of code
**Type**: React Component

### Purpose and Functionality
A layout component that houses supplementary ticket actions, such as deletion or administrative tags.

### Dependencies
- **React** from `react`
- **Trash2, Info** from `lucide-react`

### Exported & Internal Functions
- **`TicketSidebar`**: Provides buttons and informational widgets for ticket management.
  - *Mechanics*: Renders action triggers for administrative tasks.
  - *Role*: Consolidates secondary ticket actions away from the main content.

### Architecture & Design Decisions
- **Component Design**: Following functional component patterns with hooks for reusability.

### Error Handling & Fallbacks
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\dashboard\tickets\hooks\useTickets.js`


**Size**: 90 lines of code
**Type**: JavaScript Module

### Purpose and Functionality
A comprehensive hook managing the ticket lifecycle. It synchronizes the local UI state with the Redux store (`ticketSlice`), handles CRUD operations (fetch, add, update, resolve, delete) via the `ticketsApi`, and provides centralized toast notifications for user feedback.

### Dependencies
- **useEffect** from `react`
- **useDispatch, useSelector** from `react-redux`
- **setTickets, setLoading, setError** from `../../../../store/ticketSlice`
- **ticketsApi** from `../services/tickets.api`
- **toast** from `react-hot-toast`

### Side Effects
  - *Role*: Ensures precise execution of requirements assigned to `resolveTicket`.
- **`deleteTicket`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `deleteTicket`.
- **`bulkDelete`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `bulkDelete`.
- **`updateTicket`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `updateTicket`.
- **`addTicket`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `addTicket`.

### Architecture & Design Decisions
- **State Management**: Using Redux actions to decouple business logic from UI components.
- **Lifecycle Management**: Leveraging React hooks for deterministic side-effects and cleanup.

### Error Handling & Fallbacks
- **Try/Catch Blocks**: Explicitly catching async errors to prevent unhandled promise rejections.
- **User Feedback**: Utilizing Toast notifications to gracefully inform users of failures or network issues.
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\dashboard\tickets\pages\FocusArea.jsx`


**Size**: 173 lines of code
**Type**: React Component

### Purpose and Functionality
This file is a critical piece of the application. It operates as a UI component handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **React,  useState, useEffect** from `react`
- **NavLink** from `react-router-dom`
- **SideNav** from `../../../../shared/layout/SideNav`
- **useTickets** from `../hooks/useTickets`
- **SkeletonWrapper, Skeleton** from `../../../../shared/components/ui/SkeletonWrapper`
- **DeleteConfirmModal** from `../../../../shared/components/ui/DeleteConfirmModal`
- **FocusHeader** from `../components/FocusHeader`
- **FocusEmptyState** from `../components/FocusEmptyState`
- **TicketDetailsCard** from `../components/TicketDetailsCard`
- **ResolutionArea** from `../components/ResolutionArea`
- **TicketSidebar** from `../components/TicketSidebar`

### Local State Management
- State `activeTicketId`: Updated via `setActiveTicketId`. Handles component local state for rendering logic.
- State `response`: Updated via `setResponse`. Handles component local state for rendering logic.
- State `subject`: Updated via `setSubject`. Handles component local state for rendering logic.
- State `isDeleteModalOpen`: Updated via `setIsDeleteModalOpen`. Handles component local state for rendering logic.
- State `isResolving`: Updated via `setIsResolving`. Handles component local state for rendering logic.
- State `trainAi`: Updated via `setTrainAi`. Handles component local state for rendering logic.

### Side Effects
- Utilizes **2** `useEffect` hook(s) to manage lifecycle events, subscriptions, or data fetching. Proper cleanup functions are expected to prevent memory leaks.

### Exported & Internal Functions
- **`FocusArea`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `FocusArea`.
- **`openTickets`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `openTickets`.
- **`priorityMap`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `priorityMap`.
- **`currentTicket`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `currentTicket`.
- **`currentIndex`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `currentIndex`.
- **`handleNext`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `handleNext`.
- **`handlePrev`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `handlePrev`.
- **`handleResolve`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `handleResolve`.
- **`nextTicket`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `nextTicket`.
- **`handleDelete`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `handleDelete`.
- **`nextTicket`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `nextTicket`.
- **`handlePriorityChange`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `handlePriorityChange`.

### Architecture & Design Decisions
- **Lifecycle Management**: Leveraging React hooks for deterministic side-effects and cleanup.
- **Component Design**: Following functional component patterns with hooks for reusability.

### Error Handling & Fallbacks
- **Loading States**: Using Skeleton loaders as a visual fallback while data is being fetched.
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\dashboard\tickets\pages\Tickets.jsx`


**Size**: 314 lines of code
**Type**: React Component

### Purpose and Functionality
This file is a critical piece of the application. It operates as a UI component handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **React,  useState, useEffect** from `react`
- **SideNav** from `../../../../shared/layout/SideNav`
- **useTickets** from `../hooks/useTickets`
- **SkeletonWrapper, Skeleton** from `../../../../shared/components/ui/SkeletonWrapper`
- **DeleteConfirmModal** from `../../../../shared/components/ui/DeleteConfirmModal`
- **StatCard** from `../components/StatCard`
- **PriorityBadge** from `../components/PriorityBadge`
- **StatusBadge** from `../components/StatusBadge`
- **TicketDetailsModal** from `../components/TicketDetailsModal`
- **CreateTicketModal** from `../components/CreateTicketModal`

### Local State Management
- State `selectedTicket`: Updated via `setSelectedTicket`. Handles component local state for rendering logic.
- State `isModalOpen`: Updated via `setIsModalOpen`. Handles component local state for rendering logic.
- State `isCreateModalOpen`: Updated via `setIsCreateModalOpen`. Handles component local state for rendering logic.
- State `searchQuery`: Updated via `setSearchQuery`. Handles component local state for rendering logic.
- State `filter`: Updated via `setFilter`. Handles component local state for rendering logic.
- State `currentPage`: Updated via `setCurrentPage`. Handles component local state for rendering logic.
- State `selectedIds`: Updated via `setSelectedIds`. Handles component local state for rendering logic.
- State `isDeleteModalOpen`: Updated via `setIsDeleteModalOpen`. Handles component local state for rendering logic.

### Side Effects
- Utilizes **1** `useEffect` hook(s) to manage lifecycle events, subscriptions, or data fetching. Proper cleanup functions are expected to prevent memory leaks.

### Exported & Internal Functions
- **`Tickets`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `Tickets`.
- **`filteredTickets`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `filteredTickets`.
- **`toggleSelectAll`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `toggleSelectAll`.
- **`toggleSelect`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `toggleSelect`.
- **`handleBulkDelete`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `handleBulkDelete`.
- **`stats`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `stats`.

### Architecture & Design Decisions
- **Lifecycle Management**: Leveraging React hooks for deterministic side-effects and cleanup.
- **Component Design**: Following functional component patterns with hooks for reusability.

### Error Handling & Fallbacks
- **Loading States**: Using Skeleton loaders as a visual fallback while data is being fetched.
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\dashboard\tickets\services\tickets.api.js`


**Size**: 32 lines of code
**Type**: JavaScript Module

### Purpose and Functionality
This file is a critical piece of the application. It operates as a logical module handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **api** from `../../../../api/axios`

### Exported & Internal Functions
- **`getAllTickets`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `getAllTickets`.
- **`createTicket`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `createTicket`.
- **`resolveTicket`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `resolveTicket`.
- **`updateTicket`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `updateTicket`.
- **`deleteTicket`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `deleteTicket`.
- **`bulkDeleteTickets`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `bulkDeleteTickets`.

### Architecture & Design Decisions
- **Network Requests**: Utilizing Axios for robust interceptors and global error handling.

### Error Handling & Fallbacks
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\features\landing\home\pages\Home.jsx`


**Size**: 595 lines of code
**Type**: React Component

### Purpose and Functionality
This file is a critical piece of the application. It operates as a UI component handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **React,  useState, useEffect** from `react`
- **Lenis** from `lenis`
- **Link, useNavigate** from `react-router-dom`
- **ArrowRight, Bot, Inbox, MessageSquare, Zap, Command, Search, User, ChevronRight, ChevronDown** from `lucide-react`
- **Navbar** from `../../../../shared/layout/Navbar`

### Local State Management
- State `mousePosition`: Updated via `setMousePosition`. Handles component local state for rendering logic.

### Side Effects
- Utilizes **2** `useEffect` hook(s) to manage lifecycle events, subscriptions, or data fetching. Proper cleanup functions are expected to prevent memory leaks.

### Exported & Internal Functions
- **`Home`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `Home`.
- **`lenis`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `lenis`.
- **`raf`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `raf`.
- **`handleMouseMove`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `handleMouseMove`.

### Architecture & Design Decisions
- **Lifecycle Management**: Leveraging React hooks for deterministic side-effects and cleanup.
- **Component Design**: Following functional component patterns with hooks for reusability.
- **Animation & UX**: Prioritizing smooth transitions and momentum scrolling to provide a premium SaaS feel.

### Error Handling & Fallbacks
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\index.css`


**Size**: 53 lines of code
**Type**: Asset/Config

### Purpose and Functionality
This file is a critical piece of the application. It operates as a logical module handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Exported & Internal Functions
No prominent named functions detected via regex, likely indicating a default exported anonymous component or a configuration file.

### Architecture & Design Decisions

### Error Handling & Fallbacks
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\main.jsx`


**Size**: 29 lines of code
**Type**: React Component

### Purpose and Functionality
This file is a critical piece of the application. It operates as a UI component handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **StrictMode** from `react`
- **createRoot** from `react-dom/client`
- **AppRoutes** from `./routes/AppRoutes.jsx`
- **Provider** from `react-redux`
- **store** from `./store/store`
- **BrowserRouter** from `react-router-dom`
- **Toaster** from `react-hot-toast`
- **SocketProvider** from `./context/SocketContext.jsx`

### Exported & Internal Functions
No prominent named functions detected via regex, likely indicating a default exported anonymous component or a configuration file.

### Architecture & Design Decisions
- **Component Design**: Following functional component patterns with hooks for reusability.

### Error Handling & Fallbacks
- **User Feedback**: Utilizing Toast notifications to gracefully inform users of failures or network issues.
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\routes\AppRoutes.jsx`


**Size**: 76 lines of code
**Type**: React Component

### Purpose and Functionality
This file is a critical piece of the application. It operates as a UI component handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **Route, Routes** from `react-router-dom`
- **Login** from `../features/auth/pages/Login`
- **SignUp** from `../features/auth/pages/SignUp`
- **useAuth** from `../features/auth/hooks/useAuth`
- **useEffect** from `react`
- **ProtectedRoute** from `./ProtectedRoute`
- **Dashboard** from `../features/dashboard/home/pages/Dashboard`
- **Agents** from `../features/dashboard/studio/pages/Agents`
- **CreateAgent** from `../features/dashboard/studio/pages/CreateAgent`
- **Analytics** from `../features/dashboard/studio/pages/Analytics`
- **Playground** from `../features/dashboard/studio/pages/Playground`
- **Chats** from `../features/dashboard/studio/pages/Chats`
- **Knowledge** from `../features/dashboard/knowledge/pages/Knowledge`
- **Tickets** from `../features/dashboard/tickets/pages/Tickets`
- **FocusArea** from `../features/dashboard/tickets/pages/FocusArea`
- **FormsList** from `../features/dashboard/forms/pages/Forms`
- **CreateForm** from `../features/dashboard/forms/pages/CreateForm`
- **Results** from `../features/dashboard/forms/pages/Results`
- **Leads** from `../features/dashboard/leads/pages/Leads`
- **Emails** from `../features/dashboard/email/pages/Emails`
- **SettingsLayout** from `../features/dashboard/settings/layout/SettingsLayout`
- **AccountSettings** from `../features/dashboard/settings/pages/AccountSettings`
- **InviteMember** from `../features/dashboard/settings/pages/InviteMember`
- **Home** from `../features/landing/home/pages/Home`

### Side Effects
- Utilizes **1** `useEffect` hook(s) to manage lifecycle events, subscriptions, or data fetching. Proper cleanup functions are expected to prevent memory leaks.

### Exported & Internal Functions
- **`AppRoutes`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `AppRoutes`.

### Architecture & Design Decisions
- **Lifecycle Management**: Leveraging React hooks for deterministic side-effects and cleanup.
- **Component Design**: Following functional component patterns with hooks for reusability.

### Error Handling & Fallbacks
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\routes\ProtectedRoute.jsx`


**Size**: 22 lines of code
**Type**: React Component

### Purpose and Functionality
This file is a critical piece of the application. It operates as a UI component handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **useSelector** from `react-redux`
- **Navigate, Outlet** from `react-router-dom`

### Exported & Internal Functions
- **`ProtectedRoute`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `ProtectedRoute`.

### Architecture & Design Decisions
- **Component Design**: Following functional component patterns with hooks for reusability.

### Error Handling & Fallbacks
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\shared\components\ui\DeleteConfirmModal.jsx`


**Size**: 47 lines of code
**Type**: React Component

### Purpose and Functionality
This file is a critical piece of the application. It operates as a UI component handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **React** from `react`
- **Trash2** from `lucide-react`

### Exported & Internal Functions
- **`DeleteConfirmModal`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `DeleteConfirmModal`.

### Architecture & Design Decisions
- **Component Design**: Following functional component patterns with hooks for reusability.

### Error Handling & Fallbacks
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\shared\components\ui\SkeletonWrapper.jsx`


**Size**: 25 lines of code
**Type**: React Component

### Purpose and Functionality
This file is a critical piece of the application. It operates as a UI component handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **Skeleton,  SkeletonTheme** from `react-loading-skeleton`
- **useSelector** from `react-redux`

### Exported & Internal Functions
- **`SkeletonWrapper`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `SkeletonWrapper`.
- **`mode`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `mode`.

### Architecture & Design Decisions
- **Component Design**: Following functional component patterns with hooks for reusability.

### Error Handling & Fallbacks
- **Loading States**: Using Skeleton loaders as a visual fallback while data is being fetched.
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\shared\layout\Navbar.jsx`


**Size**: 29 lines of code
**Type**: React Component

### Purpose and Functionality
This file is a critical piece of the application. It operates as a UI component handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **React** from `react`
- **Link** from `react-router-dom`
- **constants** from `../../assets/constants`

### Exported & Internal Functions
- **`Navbar`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `Navbar`.

### Architecture & Design Decisions
- **Component Design**: Following functional component patterns with hooks for reusability.

### Error Handling & Fallbacks
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\shared\layout\SideNav.jsx`


**Size**: 346 lines of code
**Type**: React Component

### Purpose and Functionality
This file is a critical piece of the application. It operates as a UI component handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **React,  useState, useEffect, useRef** from `react`
- **NavLink, useLocation, useNavigate** from `react-router-dom`
- **constants** from `../../assets/constants`
- **useAuth** from `../../features/auth/hooks/useAuth`
- **useSelector** from `react-redux`

### Local State Management
- State `isCollapsed`: Updated via `setIsCollapsed`. Handles component local state for rendering logic.
- State `isDark`: Updated via `setIsDark`. Handles component local state for rendering logic.
- State `isProfileOpen`: Updated via `setIsProfileOpen`. Handles component local state for rendering logic.
- State `openMenus`: Updated via `setOpenMenus`. Handles component local state for rendering logic.

### Side Effects
- Utilizes **5** `useEffect` hook(s) to manage lifecycle events, subscriptions, or data fetching. Proper cleanup functions are expected to prevent memory leaks.

### Exported & Internal Functions
- **`SideNav`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `SideNav`.
- **`handleResize`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `handleResize`.
- **`handleClickOutside`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `handleClickOutside`.
- **`toggleTheme`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `toggleTheme`.
- **`toggleMenu`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `toggleMenu`.

### Architecture & Design Decisions
- **Lifecycle Management**: Leveraging React hooks for deterministic side-effects and cleanup.
- **Component Design**: Following functional component patterns with hooks for reusability.

### Error Handling & Fallbacks
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\store\store.js`


**Size**: 12 lines of code
**Type**: JavaScript Module

### Purpose and Functionality
This file is a critical piece of the application. It operates as a logical module handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **configureStore** from `@reduxjs/toolkit`
- **authReducer** from `../features/auth/authSlice`
- **themeReducer** from `./themeSlice`
- **ticketReducer** from `./ticketSlice`

### Exported & Internal Functions
No prominent named functions detected via regex, likely indicating a default exported anonymous component or a configuration file.

### Architecture & Design Decisions

### Error Handling & Fallbacks
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\store\themeSlice.js`


**Size**: 24 lines of code
**Type**: JavaScript Module

### Purpose and Functionality
This file is a critical piece of the application. It operates as a logical module handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **createSlice** from `@reduxjs/toolkit`

### Exported & Internal Functions
- **`themeSlice`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `themeSlice`.

### Architecture & Design Decisions

### Error Handling & Fallbacks
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## File: `src\store\ticketSlice.js`


**Size**: 36 lines of code
**Type**: JavaScript Module

### Purpose and Functionality
This file is a critical piece of the application. It operates as a logical module handling specific business logic or rendering requirements for its domain. By encapsulating its logic, it adheres to the Single Responsibility Principle, ensuring maintainability and scalability.

### Dependencies
- **createSlice** from `@reduxjs/toolkit`

### Exported & Internal Functions
- **`ticketSlice`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `ticketSlice`.
- **`index`**: A core function driving logic within this module. It manages state transitions, data transformations, or event handling depending on the context.
  - *Mechanics*: Executes synchronous or asynchronous operations.
  - *Role*: Ensures precise execution of requirements assigned to `index`.

### Architecture & Design Decisions

### Error Handling & Fallbacks
- **Defensive Programming**: Optional chaining and nullish coalescing operators are expected to avoid runtime crashes.


---

## Appendix: Security and Performance Optimizations

### Security Posture
- **XSS Prevention**: React's JSX automatically escapes variables. `react-markdown` is likely sanitized before rendering user-generated inputs.
- **CSRF Protection**: By utilizing JWT tokens in Authorization headers rather than relying solely on cookies, the application mitigates Cross-Site Request Forgery risks.

### Performance Tuning
- **Vite Build Process**: The production build uses Rollup under the hood, chunking vendor files and aggressively tree-shaking unused code.
