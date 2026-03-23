# SkillSure

## Current State
App has dashboard with EMI tracking for Home Loan, Car Loan, Personal Loan. Points/streak system, payments, rewards, profile pages exist.

## Requested Changes (Diff)

### Add
- Education/Career Loans: Replace existing loans with Course Loan, Skill Development Loan, Study Abroad Loan
- Expense Tracker page: Log daily expenses by category (Food, Transport, Education, Misc), monthly summary
- Apply for Loan page: Form to apply for education/career loan with eligibility check
- Clear messaging: SkillSure ONLY provides education/career loans, NOT car/home/personal loans

### Modify
- initialData.ts: Replace Home/Car/Personal loans with education-focused loans
- Dashboard: education loan context, updated tips, updated hero copy
- Sidebar: Add Expenses and Apply Loan nav items
- Types: Add Expense and LoanApplication types, expand Page type

### Remove
- All references to Home Loan, Car Loan, Personal Loan

## Implementation Plan
1. Update types/index.ts - add Expense, LoanApplication, expand Page
2. Update data/initialData.ts - replace loans with education loans  
3. Update Sidebar.tsx - add new nav items
4. Update Dashboard.tsx - education context, updated tips/copy
5. Create pages/Expenses.tsx - expense logger with category breakdown
6. Create pages/ApplyLoan.tsx - loan application form with eligibility check
7. Update App.tsx - wire new pages
