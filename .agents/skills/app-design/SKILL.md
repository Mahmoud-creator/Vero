---
name: app-design
description: Design and build a polished mobile Service Marketplace MVP using React Native, Expo, and TypeScript. Focus on UI/UX quality, navigation flow, and visual presentation. Use local mock data for all content. No backend or real functionality required. The goal is to create a beautiful, realistic demo of the user experience.
---
# Service Marketplace Mobile App - Copilot Agent Instructions

## Project Overview

Build a mobile Service Marketplace MVP focused primarily on:

* UI Design
* UX Design
* Navigation Flow
* Visual Presentation

Use:

* React Native
* Expo SDK (latest stable)
* TypeScript
* Expo Router

This application is a PRESENTATION DEMO.

There is NO backend.

There is NO real business logic.

There is NO real authentication.

There is NO real API integration.

All content must come from local mock data files.

The main goal is to create a polished, realistic, and visually appealing mobile application that demonstrates the user experience and interface design.

The only functionality that must work is navigation between screens.

---

# Core Principle

Optimize for:

1. UI Quality
2. UX Quality
3. Simplicity
4. Consistency

This project is design-first.

Focus on how the app looks and feels.

Do NOT spend time implementing complex functionality.

Do NOT over-engineer.

Do NOT introduce unnecessary abstractions.

Prefer beautiful and realistic UI over technical complexity.

---

# MVP Screens

Implement only these screens:

## Public

* Splash
* Onboarding
* Login
* Register

## Authenticated

* Home
* Category Results
* Worker Profile
* Request Service
* Chat
* My Requests
* Notifications
* Profile

Every screen should feel complete and visually polished even if the underlying functionality is mocked.

---

# Folder Structure

Use feature-based organization.

src/

features/
auth/
home/
workers/
requests/
chat/
notifications/
profile/

components/
ui/

types/

constants/

utils/

mocks/

Each feature owns:

* screens
* components
* types

Example:

features/
workers/

components/
WorkerCard.tsx

screens/
WorkerProfileScreen.tsx

types/
worker.ts

Keep the structure simple and easy to navigate.

---

# Routing

Use Expo Router.

Example:

app/

(index).tsx
login.tsx
register.tsx

(tabs)/
home.tsx
requests.tsx
chat.tsx
profile.tsx

Use file-based routing.

Navigation between screens must work.

Focus on creating a smooth user journey.

---

# State Management

Keep state management minimal.

## Local State

Use useState when needed.

## Global State

Only use Zustand if absolutely necessary.

Examples:

* mock authenticated user
* onboarding completion

Avoid complex state management.

This project is primarily a UI showcase.

---

# Mock Data Strategy

All mock data must live in:

src/mocks/

Example:

workers.ts
categories.ts
requests.ts
messages.ts

Never hardcode large datasets inside components.

Example:

export const workers = [
{
id: "1",
name: "John Smith",
rating: 4.8
}
]

Mock data should be realistic enough to make the UI feel complete.

---

# Services

Keep services simple.

If data abstraction is needed, create lightweight service files.

Example:

services/workerService.ts

export async function getWorkers() {
return workers
}

No real API calls.

No backend simulation required.

No unnecessary loading delays unless needed for UI demonstrations.

---

# Styling Rules

Use StyleSheet.create.

Avoid inline styles except for very small cases.

Keep styles near the component.

Example:

const styles = StyleSheet.create({
container: {},
title: {}
})

No styled-components.

No Tailwind.

No NativeWind.

Use clean and maintainable React Native styling.

---

# Design System

Create reusable UI components.

Required:

* Button
* TextInput
* Card
* Avatar
* Badge
* Rating
* ScreenContainer
* LoadingState
* EmptyState

Additional reusable components are encouraged when they improve consistency.

All screens must reuse these components.

Avoid duplicated UI code.

---

# Theme

Create a centralized theme.

src/constants/theme.ts

Example:

colors
spacing
radius
typography
shadows

Never hardcode colors repeatedly.

Example:

theme.colors.primary

instead of:

"#2563EB"

The visual design should feel modern, clean, and professional.

---

# UI / UX Priorities

Prioritize:

* Clean layouts
* Consistent spacing
* Modern cards
* Attractive typography
* Clear hierarchy
* Smooth navigation
* Professional marketplace aesthetics

Design inspiration:

* Airbnb
* Uber
* Fiverr
* TaskRabbit
* Thumbtack

Focus on creating a premium mobile experience.

---

# TypeScript Rules

Never use any.

Always create proper types.

Example:

export interface Worker {
id: string
name: string
rating: number
}

Prefer interfaces for models.

Use type for unions.

---

# Component Rules

Keep components small.

If a component exceeds ~200 lines:

consider splitting it.

Avoid deeply nested JSX.

Extract repeated sections.

Favor reusable presentation components.

---

# Forms

Forms are presentation-focused.

Use:

* React Hook Form
* Zod

Validation can be basic.

No real submission logic is required.

Examples:

Login
Register
Request Service

Buttons may simply navigate to the next screen.

---

# Loading States

Loading states are optional and primarily visual.

Use them only when they improve the demo experience.

Examples:

* Skeleton cards
* Activity indicators
* Placeholder content

---

# Lists

Use FlatList.

Always provide keyExtractor.

Design list items to look polished and realistic.

---

# Performance

Do not prematurely optimize.

Use:

* memo
* useCallback
* useMemo

Only when clearly beneficial.

UI clarity is more important than optimization.

---

# Naming Conventions

Components:

WorkerCard.tsx

Hooks:

useWorkers.ts

Stores:

authStore.ts

Services:

workerService.ts

Types:

worker.ts

Constants:

theme.ts

Keep names explicit and easy to understand.

---

# Error Handling

Keep error handling simple.

Use friendly messages.

Example:

"Something went wrong."

Avoid exposing technical details.

---

# Chat Screen

Chat is entirely mock.

Messages come from local mock data.

No websockets.

No realtime implementation.

Focus on creating a realistic and attractive chat interface.

---

# Authentication

Authentication is fake.

No JWT.

No backend calls.

No real login logic.

Buttons should simply navigate through the intended user flow.

---

# Requests Flow

User:

Home
→ Worker Profile
→ Request Service
→ My Requests

This flow is the primary MVP journey.

Focus on making this experience visually appealing and intuitive.

---

# Notifications

Use local mock notifications.

No push notifications.

No Expo notification setup.

Focus on notification card design and presentation.

---

# Code Generation Rules

Whenever generating code:

1. Use TypeScript.
2. Follow feature-based architecture.
3. Prioritize UI and UX quality.
4. Reuse existing components.
5. Keep files focused and simple.
6. Avoid unnecessary dependencies.
7. Create realistic mock content.
8. Follow Expo best practices.
9. Build polished presentation-ready screens.
10. Prioritize visual consistency across the app.

---

# What Should Actually Work

The following should work:

* Screen navigation
* Tab navigation
* Buttons that move between screens
* Basic form interactions
* Mock data rendering

The following do NOT need real functionality:

* Authentication
* Messaging
* Service requests
* Notifications
* Search
* Filtering
* API calls
* Backend integration

Everything can be mocked for presentation purposes.

---

# When Unsure

Choose the solution that creates the best visual experience with the least complexity.

Always ask:

"Does this improve the UI, UX, or presentation quality?"

If not, keep it simple.

The goal is to showcase a beautiful mobile application, not to build a fully functional product.
