---
name: project-plan
description: Build a service marketplace app with Expo Router and TypeScript. The app will connect service providers with customers, allowing users to browse services, view provider profiles, and request services. The project will be built incrementally, with a focus on modularity, reusability, and visual polish.
---
# Incremental Development Workflow - Copilot Agent Instructions

## Purpose

This project must be built incrementally.

The AI must NEVER attempt to build the entire application at once.

The AI must work in small, verifiable steps.

After each step:

1. Stop.
2. Explain what was completed.
3. Tell the user exactly how to verify it.
4. Wait for confirmation.
5. Only proceed when the user explicitly approves.

Examples of valid approvals:

* Continue
* Next
* Step completed
* Working
* Looks good
* Proceed

Never assume approval.

---

# Golden Rule

One step.

One goal.

One verification.

Then stop.

Do not combine multiple major tasks into a single step.

---

# Required Workflow

For every step:

## 1. Explain Goal

Example:

"Step 3: Create the application theme and design system."

---

## 2. Implement Only The Current Step

Generate only files relevant to the current step.

Do not generate future files.

Do not anticipate future requirements.

Do not create placeholder code for future steps.

---

## 3. Explain Verification

Tell the user exactly what should happen.

Example:

Verification:

* App launches successfully
* Theme file exists
* No TypeScript errors

---

## 4. Stop

Always stop after verification instructions.

Wait for user confirmation.

Never continue automatically.

---

# Development Phases

The project must be completed in the following order.

Do not skip phases.

---

# Phase 1

Project Initialization

Goal:

Create the foundation.

Tasks:

* Create Expo project structure
* Configure TypeScript
* Configure Expo Router
* Install required dependencies
* Verify project starts successfully

Stop and wait.

---

# Phase 2

Folder Structure

Goal:

Create project architecture.

Tasks:

* src directory
* features directory
* components directory
* constants directory
* mocks directory
* types directory

No screens yet.

Stop and wait.

---

# Phase 3

Theme System

Goal:

Create centralized design system.

Tasks:

* colors
* spacing
* typography
* radius
* shadows

Create:

src/constants/theme.ts

No screens yet.

Stop and wait.

---

# Phase 4

Core UI Components

Goal:

Create reusable UI building blocks.

Tasks:

* Button
* Card
* Avatar
* Badge
* Rating
* ScreenContainer

Verify components render correctly.

Stop and wait.

---

# Phase 5

Mock Data

Goal:

Create realistic demo content.

Tasks:

* workers
* categories
* requests
* messages
* notifications

No screens yet.

Stop and wait.

---

# Phase 6

Navigation Structure

Goal:

Create app navigation.

Tasks:

* public routes
* authenticated routes
* tab navigation

Use placeholder screens only.

Verify navigation works.

Stop and wait.

---

# Phase 7

Splash Screen

Goal:

Build splash screen.

Requirements:

* polished design
* responsive layout
* theme usage

Verify screen displays correctly.

Stop and wait.

---

# Phase 8

Onboarding Screens

Goal:

Build onboarding experience.

Requirements:

* swipeable pages
* modern visuals
* continue button

Verify navigation works.

Stop and wait.

---

# Phase 9

Login Screen

Goal:

Build login UI.

Requirements:

* realistic form
* validation
* navigation

No real authentication.

Stop and wait.

---

# Phase 10

Register Screen

Goal:

Build registration UI.

Requirements:

* realistic form
* validation
* navigation

No real registration.

Stop and wait.

---

# Phase 11

Home Screen

Goal:

Build marketplace home page.

Requirements:

* search bar
* categories
* featured workers
* polished cards

Use mock data.

Stop and wait.

---

# Phase 12

Category Results

Goal:

Build service listing page.

Requirements:

* worker cards
* category header
* realistic layout

Use mock data.

Stop and wait.

---

# Phase 13

Worker Profile

Goal:

Build provider profile.

Requirements:

* avatar
* rating
* services
* reviews
* request button

Use mock data.

Stop and wait.

---

# Phase 14

Request Service

Goal:

Build service request form.

Requirements:

* description field
* date field
* submit button

Submission is mocked.

Stop and wait.

---

# Phase 15

Chat Screen

Goal:

Build chat interface.

Requirements:

* message bubbles
* input field
* realistic layout

No realtime functionality.

Stop and wait.

---

# Phase 16

My Requests

Goal:

Build requests dashboard.

Requirements:

* pending
* accepted
* completed

Use mock data.

Stop and wait.

---

# Phase 17

Notifications

Goal:

Build notifications page.

Requirements:

* notification cards
* timestamps
* icons

Use mock data.

Stop and wait.

---

# Phase 18

Profile

Goal:

Build profile page.

Requirements:

* avatar
* settings
* account section

Use mock data.

Stop and wait.

---

# Phase 19

Visual Polish

Goal:

Improve overall presentation.

Tasks:

* spacing review
* typography review
* consistency review
* component review

No new features.

Stop and wait.

---

# Phase 20

Final Review

Goal:

Project-wide quality check.

Tasks:

* navigation verification
* theme verification
* component consistency
* TypeScript validation

Provide summary.

Stop.

---

# What The AI Must Never Do

Never:

* Generate the entire app in one response
* Create all screens at once
* Skip verification
* Continue without approval
* Refactor unrelated files
* Introduce new architecture without request
* Add backend functionality
* Add APIs
* Add authentication systems
* Add databases

---

# Response Format

Always use this structure:

## Current Step

Brief explanation.

## Files To Create Or Modify

List of files.

## Implementation

Code changes.

## Verification

Exact instructions for the user.

## Waiting For Approval

Ask the user to confirm before continuing.

Then stop.
