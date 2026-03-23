# SkillSure

## Current State
SkillSure is a React + Motoko education-loan app with:
- Dashboard (EMI progress, streak/points system, rewards redemption)
- Payments, Rewards, Expenses Tracker, Apply Loan, Profile pages
- Sidebar navigation with 6 items
- Teal-based color scheme

## Requested Changes (Diff)

### Add
- **Savings Account Tracker page** (`savings`): Track savings goals and loans taken from SkillSure. Private by default — show a blurred/locked overlay with a "Your savings are private" message and a toggle/PIN to reveal. Add sample savings data.
- **Contact Us section** (on a new `contact` page or embedded in a landing section): Contact form (name, email, message) + contact info (email, phone, social)
- **Reviews / Testimonials section**: 4–6 user testimonials with stars, names, and quotes
- **Quotes section** on Dashboard: Rotating/static inspirational quotes: "Learn now. Pay when you grow.", "Data privacy matters more than money.", plus 2-3 more
- **Mission & Vision section** on Dashboard or a dedicated About section:
  - Mission: "Democratizing skill education through income-linked financing and gamified financial discipline."
  - Vision: "To build India's most trusted pay-as-you-grow education ecosystem."
- **Credit Card Features page** (`creditcard`): Virtual credit card display, credit limit, outstanding balance, transactions, rewards earned on card spends. Show a stylish card UI.
- New sidebar items: Savings, Credit Card, Contact

### Modify
- **Expense Tracker privacy**: The summary banner (total spent) remains visible. But the individual expense list and category breakdown are hidden by default behind a "Private — tap to reveal" lock with a toggle button. Only the person can see details.
- **Savings briefing privacy**: Similar lock — savings details hidden behind a privacy toggle, showing only a blurred/masked view until unlocked.
- **UI improvements**: More visually appealing design — richer gradients, card hover effects, better typography hierarchy, glass-morphism accents, improved spacing, quote cards with accent styling.

### Remove
- Nothing removed

## Implementation Plan
1. Update `types/index.ts` to add `Page` union values for `savings`, `creditcard`, `contact`; add `SavingsAccount` and `CreditCardData` types to `AppState`
2. Update `data/initialData.ts` with sample savings and credit card data
3. Create `pages/Savings.tsx` — savings tracker with privacy lock toggle
4. Create `pages/CreditCard.tsx` — virtual card UI, transactions, credit limit
5. Create `pages/Contact.tsx` — contact form + reviews/testimonials section
6. Update `pages/Expenses.tsx` — add privacy lock/toggle over expense details
7. Update `pages/Dashboard.tsx` — add quotes carousel/section, mission & vision cards
8. Update `components/Sidebar.tsx` — add new nav items (Savings, CreditCard, Contact)
9. Update `App.tsx` — wire new pages into router
